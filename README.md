# webpack-learn


# Commonjs 和 ESModule的区别

- 两者的模块导入导出语法不同，commonjs是module.exports，exports导出，require导入；ES6则是export导出，import导入。
- commonjs是运行时加载模块，ES6是在静态编译期间就确定模块的依赖。
- ES6在编译期间会将所有import提升到顶部，commonjs不会提升require
- Comminjs针对基本数据类型（String, Boolean. Number 等非对象类型）导出的值，当改变是不会同步到外部，ESModule导出的值会同步到外部
Commonjs 导出基础数据类型其实是
```javascript
  const a = 111
  const exports = {
    a
  }
```
相当于
```javascript
  const a = 111
  const exports = {
    a: 111
  }
```
所以内部在修改a， 不会同步到外面

ESModule 导出基础数据类型是
```javascript
  const a = 111
  const exports = {}
  Object.definedProtopy(exports, a , {
    get: () => a
  })
```
在访问的时候相当于啊调用get函数，所以访问的是原值，所以内部修改了，会同步到外面
对于对象类型，也是跟基础类型处理方式一样，只不过导出遵循对象引用原理， 所以对象没这种现象

- commonjs中顶层的this指向这个模块本身，而ES6中顶层this指向undefined。
