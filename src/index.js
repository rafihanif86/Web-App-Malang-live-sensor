
import React from "react";
import ReactDOM from "react-dom";

import firebase from './config/firebase';
import { store } from './config/redux';

// styles
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";
// pages
import App from "containers/App";

// others


console.log('firebase here ==>', firebase);

ReactDOM.render(<App />, document.getElementById("root"));
