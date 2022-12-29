/* ! 禁用normal类型的loader */
/* !! 禁用其他类型的loader 只要内联的loader */
/* -! 禁用pre和normal类型的loader */

import clickMe from "!!c-loader!./src/click.js"
clickMe()
console.log(1111)
