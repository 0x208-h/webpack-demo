import avatar from "./avatar.jpg";

export default function createAvatar() {
  const img = new Image();
  img.src = "../dist/" + avatar;
  img.classList.add("avatar");
  // img.src = avatar
  const root = document.getElementById("root");
  root.append(img);
}
