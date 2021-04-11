import React, { Component } from "react";
import Footer from "../../warudo/Footer";
import DarkMode from "../../warudo/DarkMode";

import Loading from "../../warudo/Loading";
import swal from 'sweetalert';

// import $ from 'jquery';
// import 'react-summernote/dist/react-summernote.css'; // import styles
// import 'react-summernote/lang/summernote-id-ID'; // you can import any other locale

// import 'bootstrap/js/modal';
// import 'bootstrap/js/dropdown';
// import 'bootstrap/js/tooltip';
// import 'bootstrap/dist/css/bootstrap.css';

class DashboardIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            data: [],
            date: [],
            totalVisitors: 0,
            totalNovels: 0,
            totalPosts: 0,
            totalGenres: 0,
            totalTags: 0,
            totalFollowers: 0,
            loading: true
        };
    }

    getData() {
        this.setState({
            loading: true
        });
        axios
            .get("/translation/data")
            .then(response => {
                // console.log(response);
                this.setState({
                    total: response.data.data.total,
                    data: response.data.data.dataPerDay,
                    date: response.data.data.visitor,
                    totalVisitors: response.data.data.totalVisitors,
                    totalNovels: response.data.data.totalNovels,
                    totalPosts: response.data.data.totalPosts,
                    totalGenres: response.data.data.totalGenres,
                    totalTags: response.data.data.totalTags,
                    totalFollowers: response.data.data.totalFollowers,
                    loading: false
                });
                // console.log(this.state);
                if ($("#translationChart").length) {
                    var translationChart = $("#translationChart"); // line chart data

                    var lineData = {
                      labels: this.state.date,
                      datasets: [{
                        label: "Total Pengunjung",
                        fill: false,
                        lineTension: 0.3,
                        backgroundColor: "#fff",
                        borderColor: "#047bf8",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "#fff",
                        pointBackgroundColor: "#141E41",
                        pointBorderWidth: 3,
                        pointHoverRadius: 10,
                        pointHoverBackgroundColor: "#FC2055",
                        pointHoverBorderColor: "#fff",
                        pointHoverBorderWidth: 3,
                        pointRadius: 5,
                        pointHitRadius: 10,
                        data: this.state.data,
                        spanGaps: false,
                        responsive: true
                      }]
                    }; // line chart init

                    var mytranslationChart = new Chart(translationChart, {
                      type: 'line',
                      data: lineData,
                      options: {
                        legend: {
                          display: false
                        },
                        scales: {
                          xAxes: [{
                            ticks: {
                              fontSize: '11',
                              fontColor: '#969da5'
                            },
                            gridLines: {
                              color: 'rgba(0,0,0,0.05)',
                              zeroLineColor: 'rgba(0,0,0,0.05)'
                            }
                          }],
                          yAxes: [{
                            display: false,
                            ticks: {
                              beginAtZero: true
                            }
                          }]
                        }
                      }
                    });
                  } // init donut chart if element exists
                  $('#petunjuk').on('click',function() {
                    var enjoyhint_instance = new EnjoyHint({});
                    var enjoyhint_script_steps = [
                    {
                        'next #test' : 'Click the "New" button to start creating your project'
                    }
                    ];
                    enjoyhint_instance.set(enjoyhint_script_steps);
                    enjoyhint_instance.run();
                });
            });
    }

    changeGetData(e) {
        axios
            .post(`/translation/data`, {
                day: e
            })
            .then(response => {
                // console.log(response);
                this.setState({
                    total: response.data.data.total,
                    data: response.data.data.dataPerDay,
                    date: response.data.data.visitor
                });
                // console.log(this.state);
                if ($("#translationChart").length) {
                    var translationChart = $("#translationChart"); // line chart data

                    var lineData = {
                      labels: this.state.date,
                      datasets: [{
                        label: "Total Pengunjung",
                        fill: false,
                        lineTension: 0.3,
                        backgroundColor: "#fff",
                        borderColor: "#047bf8",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "#fff",
                        pointBackgroundColor: "#141E41",
                        pointBorderWidth: 3,
                        pointHoverRadius: 10,
                        pointHoverBackgroundColor: "#FC2055",
                        pointHoverBorderColor: "#fff",
                        pointHoverBorderWidth: 3,
                        pointRadius: 5,
                        pointHitRadius: 10,
                        data: this.state.data,
                        spanGaps: false
                      }]
                    }; // line chart init

                    var mytranslationChart = new Chart(translationChart, {
                      type: 'line',
                      data: lineData,
                      options: {
                        legend: {
                          display: false
                        },
                        scales: {
                          xAxes: [{
                            ticks: {
                              fontSize: '11',
                              fontColor: '#969da5'
                            },
                            gridLines: {
                              color: 'rgba(0,0,0,0.05)',
                              zeroLineColor: 'rgba(0,0,0,0.05)'
                            }
                          }],
                          yAxes: [{
                            display: false,
                            ticks: {
                              beginAtZero: true
                            }
                          }]
                        }
                      }
                    });
                  } // init donut chart if element exists
            })
            .catch(error => {
                swal("Error!", "Terdapat Masalah, Silahkan Hubungi Admin!", "error");
            });
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            this.state.loading === true ? <Loading /> :
            <div className="content-w">
                {/* title content */}
                <div className="top-bar color-scheme-transparent masariuman-height103px">
                    <div className="top-menu-controls masariuman-marginleft30px">
                        <div className="icon-w top-icon masariuman-titlecontent" id="test">
                        <div className="os-icon os-icon-layout"></div>
                        </div>
                        <div className="masariuman-textleft">
                            <span className="masariuman-bold">Dashboard</span> <br/>
                            <small>Manajemen Dashboard</small>
                        </div>
                    </div>
                    <div className="top-menu-controls">
                        <button className="mr-2 mb-2 btn btn-outline-primary" type="button" id="petunjuk"><i className="batch-icon-bulb-2"></i> PETUNJUK <i className="batch-icon-bulb"></i></button>
                    </div>
                </div>
                <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a>Dashboard</a>
                    </li>
                    <li className="breadcrumb-item">
                        <span>Dashboard</span>
                    </li>
                </ul>

                {/* content */}
                <div className="content-i masariuman-minheight100vh">
                        <div className="content-box">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="element-wrapper">
                                        <div className="col-sm-3">
                                            <a className="element-box el-tablo centered trend-in-corner padded bold-label">
                                                <div className="value">
                                                    {this.state.totalPosts}
                                                </div>
                                                <div className="label">
                                                    Total Posts
                                                </div>
                                            </a>
                                        </div>
                                        <div className="col-sm-2">
                                            <a className="element-box el-tablo centered trend-in-corner padded bold-label masariuman_colorGreen">
                                                <div className="value">
                                                    {this.state.totalNovels}
                                                </div>
                                                <div className="label">
                                                    Total Novels
                                                </div>
                                            </a>
                                        </div>
                                        <div className="col-sm-2">
                                            <a className="element-box el-tablo centered trend-in-corner padded bold-label masariuman_colorYellow">
                                                <div className="value">
                                                    {this.state.totalFollowers}
                                                </div>
                                                <div className="label">
                                                    Total Followers
                                                </div>
                                            </a>
                                        </div>
                                        <div className="col-sm-2">
                                            <a className="element-box el-tablo centered trend-in-corner padded bold-label masariuman_colorPurple">
                                                <div className="value">
                                                    {this.state.totalGenres}
                                                </div>
                                                <div className="label">
                                                    Total Genres
                                                </div>
                                            </a>
                                        </div>
                                        <div className="col-sm-3">
                                            <a className="element-box el-tablo centered trend-in-corner padded bold-label masariuman_colorOrange">
                                                <div className="value">
                                                    {this.state.totalTags}
                                                </div>
                                                <div className="label">
                                                    Total Tags
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="element-wrapper">
                                        <div className="col-sm-12">
                                            <a className="element-box el-tablo centered trend-in-corner padded bold-label masariuman_colorRed">
                                                <div className="value">
                                                    {this.state.totalVisitors}
                                                </div>
                                                <div className="label">
                                                    Total Visitors
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="element-wrapper">
                                        {/* content here */}
                                        <div className="element-box">
                                            <h5 className="form-header">
                                                Translation's Dashboard
                                            </h5>
                                            <div className="form-desc">
                                                Manajemen Data Dashboard
                                            </div>
                                            <div className="os-tabs-w">
                                                <div className="os-tabs-controls">
                                                    <ul className="nav nav-tabs smaller">
                                                        <li className="nav-item">
                                                            <a className="nav-link active" data-toggle="tab">Visitor</a>
                                                        </li>
                                                    </ul>
                                                    <ul className="nav nav-pills smaller d-none d-md-flex">
                                                        <li className="nav-item">
                                                            <a className="nav-link active masariuman_cursorPointer" data-toggle="tab" onClick={this.changeGetData.bind(this, 7)}>7 Days</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link masariuman_cursorPointer" data-toggle="tab" onClick={this.changeGetData.bind(this, 14)}>14 Days</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link masariuman_cursorPointer" data-toggle="tab" onClick={this.changeGetData.bind(this, 30)}>30 Days</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="tab-content">
                                                    <div className="tab-pane active" id="tab_overview">
                                                        <div className="el-tablo bigger">
                                                            <div className="label">
                                                                Translation Visitors
                                                            </div>
                                                            <div className="value">
                                                                {this.state.total}
                                                            </div>
                                                        </div>
                                                        <div className="el-chart-w">
                                                            <canvas height="150px" id="translationChart" width="600px"></canvas>
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane" id="tab_sales"></div>
                                                    <div className="tab-pane" id="tab_conversion"></div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* end content here */}
                                    </div>
                                </div>
                            </div>
                            <DarkMode />
                        </div>
                    </div>
                <Footer />
            </div>
        );
    }
}

export default DashboardIndex;
