(() => {
  var __webpack_modules__ = {
    "./src/a.js": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      __webpack_require__.r(__webpack_exports__);
      __webpack_require__.d(__webpack_exports__, {
        "say": () => say
      });
      var _b__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./b */ "./src/b.js");
      console.log('我是 a 文件')
      const say = function () {
        const message = (0, _b__WEBPACK_IMPORTED_MODULE_0__["default"])()
        console.log(message)
      }
    },
    "./src/b.js": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      __webpack_require__.r(__webpack_exports__);
      __webpack_require__.d(__webpack_exports__, {
        "default": () => __WEBPACK_DEFAULT_EXPORT__
      });
      var _a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./a */ "./src/a.js");
      const object = {
        name: '从构建产物洞悉模块化原理',
        author: '不要秃头啊'
      }
      console.log('我是 b 文件')
      function __WEBPACK_DEFAULT_EXPORT__() {
        return object
      }
    }
  }

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
  (() => {
    __webpack_require__.d = (exports, definition) => {
      for (var key in definition) {
        if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
      }
    };
  })();

  (() => {
    /* 判断对象自身是否有某个属性 而不是在原型链上 */
    __webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
  })();

  (() => {
    /* 将模块的toString值写成[object Module] 并定义__esModule属性 */
    __webpack_require__.r = (exports) => {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      }
      Object.defineProperty(exports, '__esModule', { value: true });
    };
  })();
  var __webpack_exports__ = {};
  (() => {
    __webpack_require__.r(__webpack_exports__);
    var _src_a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/a */ "./src/a.js");
    var _src_b__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/b */ "./src/b.js");
    console.log('node 入口文件')
    console.log(Object.prototype.toString.call(_src_a__WEBPACK_IMPORTED_MODULE_0__))
    console.log(Object.prototype.toString.call(_src_b__WEBPACK_IMPORTED_MODULE_1__))
  })();
})()