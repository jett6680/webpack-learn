(() => {
  var __webpack_modules__ = {
    "./src/name.js": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      __webpack_require__.setModuleTag(__webpack_exports__)
      __webpack_require__.definition(__webpack_exports__, {
        "default": () => __WEBPACK_DEFAULT_EXPORT__
      })
      const __WEBPACK_DEFAULT_EXPORT__ = 'powerjett'
    }
  }

  var __webpack_module_cache__ = {}
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId]
    if (cachedModule !== undefined) {
      return cachedModule.exports
    }
    var module = __webpack_module_cache__[moduleId] = {
      exports: {}
    }
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__)
    return module.exports
  }
  __webpack_require__.definition = (exports, definition) => {
    for (var key in definition) {
      if (__webpack_require__.ownProperty(definition, key) && !__webpack_require__.ownProperty(exports, key)) {
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] })
      }
    }
  }
  __webpack_require__.ownProperty = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))

  __webpack_require__.setModuleTag = (exports) => {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
    }
    Object.defineProperty(exports, '__esModule', { value: true })
  }

  var __webpack_exports__ = {}
    (() => {
      __webpack_require__.setModuleTag(__webpack_exports__)
      var _name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./name */ "./src/name.js")
      console.log('name', _name__WEBPACK_IMPORTED_MODULE_0__["default"])
    })()
})()