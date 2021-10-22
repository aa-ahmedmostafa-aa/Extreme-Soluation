import "../node_modules/jquery/dist/jquery.min.js";
import "../node_modules/popper.js/dist/popper"

import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
// import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
  <Router>
    <App />
  </Router>
  </Provider>,
  document.getElementById('root')
);

