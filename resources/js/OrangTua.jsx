import React, { Component } from 'react';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MobileMenu from "./warudo/MobileMenu";
import Menu from "./warudo/Menu";
import Empatkosongempat from "./warudo/Empatkosongempat";
import DashboardIndex from "./component/dashboard/Index";
import KeluarIndex from "./component/keluar/Index";
import MasukIndex from "./component/masuk/Index";
import UuzaaIndex from "./component/uuzaa/Index";
import HeyaIndex from "./component/heya/Index";
import SubBidangIndex from "./component/alhuqulAlfareia/Index";


if (document.getElementById("root")) {
    ReactDOM.render(
        <Router>
            <div className="layout-w">
                <MobileMenu />
                <Menu />
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={DashboardIndex}
                    />
                    <Route
                        exact
                        path="/surat-keluar"
                        component={KeluarIndex}
                    />
                    <Route
                        exact
                        path="/surat-masuk"
                        component={MasukIndex}
                    />
                    <Route
                        exact
                        path="/kanrisha/uuzaa"
                        component={UuzaaIndex}
                    />
                    <Route
                        exact
                        path="/kanrisha/heya"
                        component={HeyaIndex}
                    />
                    <Route
                        exact
                        path="/kanrisha/subBidang"
                        component={SubBidangIndex}
                    />
                    <Empatkosongempat />
                </Switch>
            </div>
        </Router>,

        document.getElementById("root")
    );
}
