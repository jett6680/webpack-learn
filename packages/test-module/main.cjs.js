(() => {
  var __webpack_modules__ = ({
    "./src/a.js": ((__unused_webpack_module, exports, __webpack_require__) => {
      const getMes = __webpack_require__(/*! ./b */ "./src/b.js")
      console.log('我是 a 文件')
      exports.say = function () {
        const message = getMes()
        console.log(message)
      }
    }),
    "./src/b.js": ((module, __unused_webpack_exports, __webpack_require__) => {
      const say = __webpack_require__(/*! ./a */ "./src/a.js")
      const object = {
        name: '从构建产物洞悉模块化原理',
        author: '不要秃头啊'
      }
      console.log('我是 b 文件')
      module.exports = function () {
        return object
      }
    })
  });
  var __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    var module = __webpack_module_cache__[moduleId] = {
      exports: {}
    };
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    return module.exports;
  }
  var __webpack_exports__ = {};
  (() => {
    const a = __webpack_require__(/*! ./src/a */ "./src/a.js")
    const b = __webpack_require__(/*! ./src/b */ "./src/b.js")
    console.log('node 入口文件')
  })();
})()
