import Header from "./header.js";
import avatar from "./avatar.jpg";
import createAvatar from "./createAvatar.js";
import styles from "./index.scss";

new Header();
console.log(avatar);

createAvatar()

const img = new Image();
img.src = "../dist/" + avatar;
img.classList.add(styles.avatar);
// img.src = avatar
const root = document.getElementById("root");
root.append(img);
