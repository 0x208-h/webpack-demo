// import Header from "./header.js";
// import avatar from "./avatar.jpg";
// import createAvatar from "./createAvatar.js";
// import styles from "./index.scss";
// import './index.scss'
// import styles from "./index.module.scss"

// new Header();
// console.log(avatar);

// createAvatar()

// const img = new Image();
// img.src = "../dist/" + avatar;
// img.classList.add(styles.avatar);
// // img.src = avatar
// const root = document.getElementById("root");
// root.append(img);

// const root  = document.getElementById("root")

// root.innerHTML = '<div class="iconfont icon-sousuo"></div>'

// console.log('hello world')

// import './styles.css'

// const btn = document.createElement('button')
// btn.innerHTML = 'Hello World'
// document.body.appendChild(btn)

// btn.onclick = () => {
//   const div = document.createElement('div')
//   div.innerHTML = 'item'
//   document.body.appendChild(div)
// }

import counter from "./counter";
import number from "./number";

counter();
number();

if (module.hot) {
  module.hot.accept("./number.js", () => {
    document.body.removeChild(document.getElementById("number"));
    number();
  });
}
// css,js文件都需要写这串代码，但是css moudles 已经帮我们写好了
