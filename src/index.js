import React, { useEffect } from "react";
import ReactDom from "react-dom";
import axios from "axios";

function App() {
  // axios.defaults.baseURL = "http://www.dell-lee.com"

  useEffect(() => {
    axios
      .get("/react/api/header.json")
      .then((res) => console.log(res.data.data));
  }, []);
  return <div>Home</div>;
}

ReactDom.render(<App />, document.getElementById("root"));

// eslint-plugin-react@^7.28.0
// @typescript-eslint/eslint-plugin@latest eslint-config-airbnb@latest
//  eslint@^7.32.0 || ^8.2.0 eslint-plugin-import@^2.25.3
// eslint-plugin-jsx-a11y@^6.5.1 eslint-plugin-react-hooks@^4.3.0 @typescript-eslint/parser@latest
