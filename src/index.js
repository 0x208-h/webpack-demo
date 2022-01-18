import React, { useEffect } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import List from "./list";
import Home from "./home";

const App = () => {
  // axios.defaults.baseURL = "http://www.dell-lee.com"

  useEffect(() => {
    axios
      .get("/react/api/header.json")
      .then((res) => console.log(res.data.data));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/abc.html" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDom.render(<App />, document.getElementById("root"));
