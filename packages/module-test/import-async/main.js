(() => {
  // webpack 加载的模块列表 
  var __webpack_modules__ = {};
  // webpack 加载的模块的缓存
  var __webpack_module_cache__ = {};

  // require 函数
  function require(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    var module = __webpack_module_cache__[moduleId] = {
      exports: {}
    };
    __webpack_modules__[moduleId](module, module.exports, require);
    return module.exports;
  }

  require.modules = __webpack_modules__;

  require.definition = (exports, definition) => {
    for (var key in definition) {
      if (require.ownProperty(definition, key) && !require.ownProperty(exports, key)) {
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
      }
    }
  };

  // 导入import()函数要引入的模块
  require.import = (chunkId) => {
    const promises = []
    require.jsonp(chunkId, promises)
    return Promise.all(promises);
  };

  require.uuid = (chunkId) => {
    return "" + chunkId + ".main.js";
  };

  require.global = (function () {
    if (typeof globalThis === 'object') return globalThis;
    try {
      return this || new Function('return this')();
    } catch (e) {
      if (typeof window === 'object') return window;
    }
  })();

  require.ownProperty = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))

  var inProgress = {};
  var dataWebpackPrefix = "module-test:";
  require.load = (url, done, key, chunkId) => {
    if (inProgress[url]) {
      inProgress[url].push(done);
      return;
    }
    var script, needAttach;
    if (key !== undefined) {
      // 扫描当前模块是否已经存在 
      var scripts = document.getElementsByTagName("script");
      for (var i = 0; i < scripts.length; i++) {
        var s = scripts[i];
        if (s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) {
          script = s;
          break;
        }
      }
    }
    if (!script) {
      // 创建script标签
      needAttach = true;
      script = document.createElement('script');

      script.charset = 'utf-8';
      script.timeout = 120;
      if (require.nc) {
        script.setAttribute("nonce", require.nc);
      }
      script.setAttribute("data-webpack", dataWebpackPrefix + key);
      // 指定当前script的url为要加载的url
      script.src = url;
    }
    inProgress[url] = [done];
    var onScriptComplete = (prev, event) => {
      // avoid mem leaks in IE.
      script.onerror = script.onload = null;
      clearTimeout(timeout);
      var doneFns = inProgress[url];
      delete inProgress[url];
      script.parentNode && script.parentNode.removeChild(script);
      doneFns && doneFns.forEach((fn) => (fn(event)));
      if (prev) return prev(event);
    };
    var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
    script.onerror = onScriptComplete.bind(null, script.onerror);
    script.onload = onScriptComplete.bind(null, script.onload);
    // 讲当前script添加到页面，这个时候，开启script默认的加载流程, 当加载完后 
    // 加载完的模块直接调用push方法 此push方法是被重写过的 chunkLoadingGlobal.push方法
    needAttach && document.head.appendChild(script);
  };

  require.setModuleTag = (exports) => {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };
  
  require.prefix = (() => {
    var scriptUrl;
    if (require.global.importScripts) scriptUrl = require.global.location + "";
    var document = require.global.document;
    if (!scriptUrl && document) {
      if (document.currentScript)
        scriptUrl = document.currentScript.src
      if (!scriptUrl) {
        var scripts = document.getElementsByTagName("script");
        if (scripts.length) scriptUrl = scripts[scripts.length - 1].src
      }
    }
    if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
    scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
    return scriptUrl
  })();

  // 用来记录已经加载的模块 如果值是0 代表加载过了
  var installedChunks = {
    "main": 0
  };

  require.jsonp = (chunkId, promises) => {
    var installedChunkData = require.ownProperty(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
    if (installedChunkData !== 0) {
      if (installedChunkData) {
        promises.push(installedChunkData[2]);
      } else {
        if (true) {
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
        } else {
          installedChunks[chunkId] = 0;
        }
      }
    }
  };
  
  // self["webpackChunkmodule_test"].push方法的重写的实现
  // parentChunkLoadingFunction为数组默认的push方法
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
  chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
  chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));

  var __webpack_exports__ = {};
  const button = document.createElement('button')
  button.innerText = '点击'
  button.onclick = () => {
    require.import("src_click_js").then(require.bind(require, "./src/click.js")).then(module => {
      module.default()
    })
  }
  document.body.append(button)
})();