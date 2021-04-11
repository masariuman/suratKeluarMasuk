import React from "react";
import Footer from "./Footer";
import Loader from "../../../public/masariuman/loading.gif";

const Loading = () => {
    return (
        <div className="content-w">
                {/* title content */}
                <div className="top-bar color-scheme-transparent masariuman-height103px">
                    <div className="top-menu-controls masariuman-marginleft30px">
                        <div className="icon-w top-icon masariuman-titlecontent">
                        </div>
                        <div className="masariuman-textleft">
                            <span className="masariuman-bold"></span> <br/>
                            <small></small>
                        </div>
                    </div>
                    <div className="top-menu-controls">
                        <button className="mr-2 mb-2 btn btn-outline-primary" type="button" id="petunjuk"><i className="batch-icon-bulb-2"></i> PETUNJUK <i className="batch-icon-bulb"></i></button>
                    </div>
                </div>
                <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="/it/ruangan"></a>
                    </li>
                    <li className="breadcrumb-item">
                        <span></span>
                    </li>
                </ul>

                {/* content */}
                <div className="content-i masariuman-minheight100vh">
                        <div className="content-box">
                            <div className="element-wrapper">
                                {/* content here */}
                                {/* end content here */}
                            </div>
                        </div>
                    </div>
                <Footer />
                <div className="masariuman_loading-container">
                    <img src={Loader} alt="loading" className="masariuman_loading-loader" />
                </div>
            </div>
    );
};

export default Loading;
