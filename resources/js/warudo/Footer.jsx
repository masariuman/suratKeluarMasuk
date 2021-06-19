import React, { Component } from "react";

class Footer extends Component {
    render() {
        return (
            <div className="top-bar color-scheme-light masariuman-footer">
                <ul>
                    <li>
                        Copyright <i className="fa fa-copyright"></i> 2021
                    </li>
                    <li>
                        <a href="http://masariuman.com/" target="_blank"><i className="fa fa-gg"></i> Arif Setiawan <i className="fa fa-gg"></i></a>
                    </li>
                    <li>All Right Reserved</li>
                </ul>
            </div>
        );
    }
}

export default Footer;
