console.log("hello");

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("registed", registration);
      })
      .catch((err) => {
        console.log("err", err);
      });
  });
}

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("/service-worker.js") //调用打包生成的 sw.js
//       .then((registration) => {
//         console.log("service-worker registed", registration);
//       })
//       .catch((error) => {
//         console.log("service-worker register error", error);
//       });
//   });
// }
