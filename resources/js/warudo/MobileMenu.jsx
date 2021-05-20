import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

class MobileMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuzaaMei: "",
            reberu: "",
            sashin: "",
        };
        this.renderSashin = this.renderSashin.bind(this);
    }

    getUuzaa() {
        axios.get("/getUuzaa").then((response) => {
            this.setState({
                uuzaaMei: response.data.data.name,
                reberu: response.data.data.level,
                sashin: response.data.data.sashin
            });
        });
    }

    componentDidMount() {
        this.getUuzaa();
    }

    renderSashin() {
        return !this.state.sashin || this.state.sashin === "" ? <img alt="" src="/warudo/dist/img/avatar.jpg" /> : <img alt="" src={"/sashin/"+this.state.sashin} />;
    }

    render() {
        return (
            <div className="menu-mobile menu-activated-on-click color-scheme-dark">
                <div className="mm-logo-buttons-w">
                    <a className="mm-logo">
                        <img src="/warudo/dist/img/logo.png" />
                        <span>{this.state.uuzaaMei}</span>
                    </a>
                    <div className="mm-buttons">
                        <div className="mobile-menu-trigger">
                            <div className="os-icon os-icon-hamburger-menu-1"></div>
                        </div>
                    </div>
                </div>
                <div className="menu-and-user">
                    <div className="logged-user-w">
                        <div className="avatar-w">
                            {this.renderSashin()}
                        </div>
                        <div className="logged-user-info-w">
                            <div className="logged-user-name">
                                {this.state.uuzaaMei}
                            </div>
                            <div className="logged-user-role">
                                {this.state.reberu}
                            </div>
                        </div>
                    </div>
                    {/* START - Mobile Menu List */}
                    <ul className="main-menu">
                        <li>
                            <NavLink
                                exact
                                activeClassName="masariuman-active"
                                to={`/`}
                            >
                                <div className="icon-w">
                                    <div className="os-icon os-icon-layout"></div>
                                </div>
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="has-sub-menu">
                            <NavLink
                                activeClassName="masariuman-active"
                                to={`/translation`}
                            >
                                <div className="icon-w">
                                    <div className="os-icon os-icon-book"></div>
                                </div>
                                <span>Translation</span>
                            </NavLink>
                                    <ul className="sub-menu">
                                        <li>
                                            <Link to={`/translation/posts`}>
                                                <i className="os-icon os-icon-pencil-1"></i> &nbsp;&nbsp;&nbsp;Posts
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={`/translation/toc`}>
                                                <i className="os-icon os-icon-book-open"></i> &nbsp;&nbsp;&nbsp;Table of Content
                                            </Link>
                                        </li>
                                    </ul>
                                    <ul className="sub-menu">
                                        <li>
                                            <Link to={`/translation/genre`}>
                                                <i className="os-icon os-icon-grid"></i> &nbsp;&nbsp;&nbsp;Genre
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={`/translation/tag`}>
                                                <i className="os-icon os-icon-tag"></i> &nbsp;&nbsp;&nbsp;Tag
                                            </Link>
                                        </li>
                                    </ul>
                        </li>
                        <li>
                            <a href="#">
                                <div className="icon-w">
                                    <div className="os-icon os-icon-ui-49"></div>
                                </div>
                                <span>Setting</span>
                            </a>
                        </li>
                        <li>
                            <a href="/logout">
                                <div className="icon-w">
                                    <div className="os-icon os-icon-signs-11"></div>
                                </div>
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                    {/* END - Mobile Menu List */}
                    {/* <div className="mobile-menu-magic">
                        <h4>
                            Light Admin
                        </h4>
                        <p>
                            Clean Bootstrap 4 Template
                        </p>
                        <div className="btn-w">
                            <a className="btn btn-white btn-rounded" href="https://themeforest.net/item/light-admin-clean-bootstrap-dashboard-html-template/19760124?ref=Osetin" target="_blank">Purchase Now</a>
                        </div>
                    </div> */}
                </div>
            {/* END - Mobile Menu */}
            </div>
        );
    }
}

export default MobileMenu;
