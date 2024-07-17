import React from "react";
// import "@arco-design/web-react/dist/css/arco.css";
import "@/assets/css/common.scss";
import "./App.scss";
import { routes } from "@/router/index";
import { useRoutes } from "react-router-dom";

const App = () => {
  const elements =  useRoutes(routes);
  return (
      <div>{elements}</div>
  );
};

export default App;
