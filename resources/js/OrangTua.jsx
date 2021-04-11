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
// import DashboardNovel from "./component/dashboard/novel/Index";
import KeluarIndex from "./component/keluar/Index";
import MasukIndex from "./component/masuk/Index";
// import Toc from "./component/toc/Index";
// import TocNew from "./component/toc/New";
// import TocEdit from "./component/toc/Edit";
// import Novel from "./component/novel/Index";
// import NovelNew from "./component/novel/New";
// import NovelEdit from "./component/novel/Edit";


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
                    <Empatkosongempat />
                </Switch>
            </div>
        </Router>,

        document.getElementById("root")
    );
}
