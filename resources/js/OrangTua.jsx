import React, { Component } from 'react';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ReactRoute from "./reactRoute";
import MobileMenu from "./warudo/MobileMenu";
import Menu from "./warudo/Menu";

if (document.getElementById("root")) {
    ReactDOM.render(
        <Router>
            <div className="layout-w">
                <MobileMenu />
                <Menu />
                <ReactRoute />
            </div>
        </Router>,

        document.getElementById("root")
    );
}
