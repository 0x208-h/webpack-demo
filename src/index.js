import _ from 'lodash'
import $ from 'jquery'
console.log(_.join(['a', 'b', 'c'], '**'))

console.log($)

// import { name } from "./test";
// console.log(name);

// function getComponent() {
//   return import(/* webpackChunkName: "lodash" */"lodash").then(({ default: _ }) => {
//     const element = document.createElement("div");
//     element.innerHTML = _.join(["H", "C", "H"], "-");
//     return element;
//   });
// }

// getComponent().then((element) => {
//   document.body.appendChild(element);
// });
