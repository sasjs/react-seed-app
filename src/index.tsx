import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "./App.scss";
import * as serviceWorker from "./serviceWorker";
import routes from "./routes";

const render = () => {
  ReactDOM.render(<>{routes}</>, document.getElementById("root"));
};

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
