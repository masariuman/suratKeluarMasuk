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
            totalSuratMasuk: 0,
            totalSuratKeluar: 0,
            totalSurat: 0,
            totalSurat30HariTerakhir : 0,
            dateSuratMasuk: [],
            dateSuratKeluar: [],
            dataSuratMasukPerDay: [],
            dataSuratKeluarPerDay: [],
            loading: true
        };
    }

    getData() {
        this.setState({
            loading: true
        });
        axios
            .get("/kanrisha/dashboard/deeta")
            .then(response => {
                // console.log(response);
                this.setState({
                    totalSuratMasuk: response.data.data.totalSuratMasuk,
                    totalSuratKeluar: response.data.data.totalSuratKeluar,
                    totalSurat: response.data.data.totalSurat,
                    totalSurat30HariTerakhir : response.data.data.totalSurat30HariTerakhir,
                    dateSuratMasuk: response.data.data.dateSuratMasuk,
                    dateSuratKeluar: response.data.data.dateSuratKeluar,
                    dataSuratMasukPerDay: response.data.data.dataSuratMasukPerDay,
                    dataSuratKeluarPerDay: response.data.data.dataSuratKeluarPerDay,
                    loading: false
                });
                // console.log(this.state);
                if ($("#translationChart").length) {
                    var translationChart = $("#translationChart"); // line chart data

                    var lineData = {
                      labels: this.state.dateSuratMasuk,
                      datasets: [
                        {
                            label: "Total Surat Masuk",
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
                            data: this.state.dataSuratMasukPerDay,
                            spanGaps: false,
                            responsive: true
                        },
                        {
                            label: "Total Surat Keluar",
                            fill: false,
                            lineTension: 0.3,
                            backgroundColor: "#fff",
                            borderColor: "#fc1433",
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
                            data: this.state.dataSuratKeluarPerDay,
                            spanGaps: false,
                            responsive: true
                        }
                      ]
                    }; // line chart init

                    var mytranslationChart = new Chart(translationChart, {
                      type: 'line',
                      data: lineData,
                      options: {
                        responsive: true,
                        legend: {
                            position: 'top',
                        },
                        scales: {
                          xAxes: [{
                            ticks: {
                              fontSize: '11',
                              fontColor: '#969da5'
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Tanggal'
                            },
                            gridLines: {
                              color: 'rgba(0,0,0,0.05)',
                              zeroLineColor: 'rgba(0,0,0,0.05)'
                            }
                          }],
                          yAxes: [{
                            display: true,
                            ticks: {
                              beginAtZero: true
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Jumlah'
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
                            'next #userSetting' : "Arahkan Mouse Kesini Untuk Membuka Menu Pengaturan User. <br /><br /> <img src='/petunjuk/userSetting.png' class='masariuman_imgUserSetting' /> <br /><br /> Anda Dapat Mengubah Password Dan Mengubah Foto Profil Anda Dengan Menekan Tombol Pengaturan User Untuk Membuka Form <br /> Untuk Mengubah Data Password Atau Foto Profil Anda. <br/> <br/> Untuk Keluar Dari Aplikasi, Anda Dapat Menekan Tombol Logout."
                        },
                        {
                            'next #meno' : 'Pilih Menu Pada Panel Berikut Untuk Membuka Halaman Sesuai Dengan Menu Yang Dipilih.'
                        }
                    ];
                    enjoyhint_instance.set(enjoyhint_script_steps);
                    enjoyhint_instance.run();
                });
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
                                    <div className="element-wrapper masariuman_displayFlex masariuman_paddingBottom0">
                                        <div className="col-sm-6">
                                            <a className="element-box el-tablo centered trend-in-corner padded bold-label">
                                                <div className="value">
                                                    {this.state.totalSuratMasuk}
                                                </div>
                                                <div className="label">
                                                    Total Surat Masuk
                                                </div>
                                            </a>
                                        </div>
                                        <div className="col-sm-6">
                                            <a className="element-box el-tablo centered trend-in-corner padded bold-label masariuman_colorGreen">
                                                <div className="value">
                                                {this.state.totalSuratKeluar}
                                                </div>
                                                <div className="label">
                                                    Total Surat Keluar
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="element-wrapper masariuman_paddingBottom0">
                                        <div className="col-sm-12">
                                            <a className="element-box el-tablo centered trend-in-corner padded bold-label masariuman_colorRed">
                                                <div className="value">
                                                {this.state.totalSurat}
                                                </div>
                                                <div className="label">
                                                    Total Surat
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="element-wrapper masariuman_paddingBottom0">
                                        {/* content here */}
                                        <div className="element-box">
                                            <h5 className="form-header">
                                                Dashboard
                                            </h5>
                                            <div className="form-desc">
                                                Manajemen Dashboard
                                            </div>
                                            <div className="os-tabs-w">
                                                <div className="os-tabs-controls">
                                                    <ul className="nav nav-tabs smaller">
                                                        <li className="nav-item">
                                                            <a className="nav-link active" data-toggle="tab">Total Surat 30 Hari Terakhir</a>
                                                        </li>
                                                    </ul>
                                                    <ul className="nav nav-pills smaller d-none d-md-flex">
                                                        {/* <li className="nav-item">
                                                            <a className="nav-link active masariuman_cursorPointer" data-toggle="tab" onClick={this.changeGetData.bind(this, 7)}>7 Days</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link masariuman_cursorPointer" data-toggle="tab" onClick={this.changeGetData.bind(this, 14)}>14 Days</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link masariuman_cursorPointer" data-toggle="tab" onClick={this.changeGetData.bind(this, 30)}>30 Days</a>
                                                        </li> */}
                                                    </ul>
                                                </div>
                                                <div className="tab-content">
                                                    <div className="tab-pane active" id="tab_overview">
                                                        <div className="el-tablo bigger">
                                                            <div className="label">
                                                                Total Surat 30 Hari Terakhir
                                                            </div>
                                                            <div className="value">
                                                                {this.state.totalSurat30HariTerakhir}
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
