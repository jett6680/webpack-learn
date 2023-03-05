"use strict";
// 直接调用挂在全局的变量的经过重写的push方法
(self["webpackChunkmodule_test"] = self["webpackChunkmodule_test"] || []).push(
  [
    ["src_click_js"],
    {
      "./src/click.js": ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.setModuleTag(__webpack_exports__);
        __webpack_require__.definition(__webpack_exports__, {
          "default": () => (__WEBPACK_DEFAULT_EXPORT__)
        });
        const __WEBPACK_DEFAULT_EXPORT__ = (() => {
          console.log('按钮点击了')
        });
      })
    }
  ]
);