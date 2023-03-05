# 异步加载import()的实现原理

在Webpack中常用的代码分离方法有三种：
- 入口起点：使用 entry 配置手动地分离代码。
- 防止重复：使用 Entry dependencies 或者 SplitChunksPlugin 去重和分离 chunk。
- 动态导入：通过模块的内联函数调用来分离代码。

动态导入也就是import()的形式；主要实现思路为使用script标签src的形式(jsonp)将js chunk脚本加载到，
然后挂载在全局的__webpack_modules__上，接着执行跟正常模块一样的require逻辑

## 引入模块
在正常情况下，使用import函数加载一个模块的代码如下:
```javascript
    import("./src_click_js").then(module => {
      module.default()
    })
```
经过webpack编译后，可以看到其实分为了2步
1. 加载模块
2. require模块
动态导入主要做的事情其实是第一步，正常模块的加载都是第2步
```javascript
    require.import("src_click_js").then(require.bind(require, "./src/click.js")).then(module => {
      module.default()
    })
```

## import函数的具体实现

```javascript
  // 这里的import返回的promises就是编译后代码的链式调用的promise 
  require.import = (chunkId) => {
    const promises = []
    require.jsonp(chunkId, promises)
    return Promise.all(promises);
  };
```
## jsonp函数的实现
jsonp 方法为当前异步加载的模块构造了一个[resolve, reject, promise]的结构，保存在全剧
当前文件加载的失败或者成功，都会取出来执行相应的resolve reject函数
伪代码:
```javascript
  require.jsonp = (chunkId, promises) => {
    var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
    // 为当前chunkId对应的模块实力恶化一个promise对象, 值是 [resolve, reject, promise]
    promises.push(installedChunkData[2] = promise);
    var url = require.prefix + require.uuid(chunkId);
    var error = new Error();
    var loadingEnded = (event) => {
      if (require.ownProperty(installedChunks, chunkId)) {
        installedChunkData = installedChunks[chunkId];
        if (installedChunkData !== 0) installedChunks[chunkId] = undefined;
        if (installedChunkData) {
          var errorType = event && (event.type === 'load' ? 'missing' : event.type);
          var realSrc = event && event.target && event.target.src;
          error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
          error.name = 'ChunkLoadError';
          error.type = errorType;
          error.request = realSrc;
          // 加载失败的话 调用 reject 函数
          installedChunkData[1](error);
        }
      }
    };
    // 执行加载
    require.load(url, loadingEnded, "chunk-" + chunkId, chunkId);
  };
```

## require.load函数的实现
伪代码:
```javascript
  require.jsonp = (url, done) => {
    // 创建script标签=
    script = document.createElement('script');
    script.src = url;
    var onScriptComplete = (prev, event) => {};
    // 讲当前script添加到页面，这个时候，开启script默认的加载流程, 当加载完后 
    // 加载完的模块直接调用push方法 此push方法是被重写过的 self["webpackChunkmodule_test"].push方法
    document.head.appendChild(script);
  }
```
至此，文件加载完，调用chunkLoadingGlobal.push方法，如下

## 定义全局共享变量self["webpackChunkmodule_test"]

self["webpackChunkmodule_test"] 其实就是一个数组，当加载异步模块的时候，记录着加载的模块的信息,格式如下:

```javascript
  [
    ["文件的id"],
    {
      "文件的id": ((module, export, require) => {
        require.setModuleTag(__webpack_exports__);
        require.definition(__webpack_exports__, {
          "default": () => (__WEBPACK_DEFAULT_EXPORT__)
        });
        const __WEBPACK_DEFAULT_EXPORT__ = (() => {
          console.log('按钮点击了')
        });
      })
    }
  ]
```

## 重写变量self["webpackChunkmodule_test"]的push方法
这一步非常关键,当异步加载模块后，立马执行的push方法就是这个被重写的push方法, 伪代码如下:
```javascript
  var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
    var [chunkIds, moreModules, runtime] = data;
    var moduleId, chunkId, i = 0;
    if (chunkIds.some((id) => (installedChunks[id] !== 0))) {
      for (moduleId in moreModules) {
        if (require.ownProperty(moreModules, moduleId)) {
          // 安装到全局的modules对象上 
          require.modules[moduleId] = moreModules[moduleId];
        }
      }
      if (runtime) var result = runtime(require);
    }
    // 执行数组的默认的push方法
    if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
    for (; i < chunkIds.length; i++) {
      chunkId = chunkIds[i];
      if (require.ownProperty(installedChunks, chunkId) && installedChunks[chunkId]) {
        // 执行resolve方法 代表此时加载结束 结束加载后 在执行require过程 
        installedChunks[chunkId][0]();
      }
      // 更新模块加载状态标记
      installedChunks[chunkId] = 0;
    }
  }
  var chunkLoadingGlobal = self["webpackChunkmodule_test"] = self["webpackChunkmodule_test"] || [];
  chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
```

执行完重写的push方法后，执行了resolve函数, 返回到编译代码的第二个then，继续require的过程，这个过程就跟普通的模块的require过程是一样的

