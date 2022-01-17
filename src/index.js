import React, { useEffect } from "react";
import ReactDom from "react-dom";
import axios from "axios";

const App = () => {
  // axios.defaults.baseURL = "http://www.dell-lee.com"

  useEffect(() => {
    axios.get('/react/api/header.json').then(res => console.log(res.data.data))
  }, [])

  return (<div>Hello, world!</div>)
}

ReactDom.render(<App />, document.getElementById('root'))