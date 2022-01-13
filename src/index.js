// import _ from 'lodash'
// import $ from 'jquery'
// console.log(_.join(['a', 'b', 'c'], '**'))

// console.log($)

// function getComponent() {
//   return import(/* webpackChunkName: "lodash" */ "lodash").then(
//     ({ default: _ }) => {
//       const element = document.createElement("div");
//       element.innerHTML = _.join(["H", "C", "H"], "-");
//       return element;
//     }
//   );
// }

async function getComponent() {
  const { default: _ } = await import(
    /* webpackChunkName: "lodash" */ "lodash"
  );
  const element = document.createElement("div");
  element.innerHTML = _.join(["H", "C", "H"], "-");
  return element;
}

document.addEventListener("click", () => {
  getComponent().then((element) => {
    document.body.appendChild(element);
  });
});
