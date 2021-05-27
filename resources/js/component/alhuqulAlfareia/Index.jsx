import React, { Component } from "react";
import $ from 'jquery';
import Footer from "../../warudo/Footer";
import DarkMode from "../../warudo/DarkMode";
import { Link } from "react-router-dom";
import Loading from "../../warudo/Loading";
import swal from 'sweetalert';
import Pagination from "react-js-pagination";


class alhuqulAlfareia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            heya: [],
            heyaMei : "",
            dataNewInput: "",
            dataEditInput: "",
            cari: "",
            url: null,
            loading: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleEditInputChange = this.handleEditInputChange.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderData = this.renderData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.modalTambah = this.modalTambah.bind(this);
        this.modalUbah = this.modalUbah.bind(this);
        this.handleChangeCari = this.handleChangeCari.bind(this);
        this.handleChangeHeya = this.handleChangeHeya.bind(this);
    }

    handleChangeHeya(e) {
        this.setState({
            heyaMei: e.target.value,
        });
    }

    handleChangeCari(e) {
        this.setState({
            cari: e.target.value
        });
        axios
            .post(`/masariuman_tag/search`, {
                cari: e.target.value
            })
            .then(response => {
                // console.log(response.data);
                this.setState({
                    data: response.data.deeta_data.data,
                    loading: false,
                    activePage: response.data.deeta_data.current_page,
                    itemsCountPerPage: response.data.deeta_data.per_page,
                    totalItemsCount: response.data.deeta_data.total,
                    pageRangeDisplayed: 10
                });
                // console.log(this.state.tag);
            });
    }

    handleDeleteButton(e) {
        axios
            .get(`/kanrisha/alhuqulAlfareia/deeta/${e}`)
            .then(response => {
                swal({
                    title: `Yakin ingin menghapus Sub Bidang ${response.data.data.asm}`,
                    text: "Kalau Terhapus, Hubungi Admin Untuk Mengembalikan Data yang Terhapus!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                        this.setState({
                            loading: true
                        });
                        axios
                            .delete(`/kanrisha/alhuqulAlfareia/deeta/${e}`, {
                                url: this.state.url
                            })
                            .then(response => {
                                this.setState({
                                    data: response.data.data.data,
                                    loading: false
                                });
                                swal("Sukses!", "Data Berhasil Dihapus!", "success");
                                // console.log("from handle sumit", response);
                            })
                            .catch(error => {
                                this.setState({
                                    loading: false
                                });
                                swal("Error!", "Gagal Menghapus Data, Silahkan Hubungi Admin!", "error");
                            });
                    } else {
                      swal("Data Tidak Terhapus!");
                    }
                  });
            })
            .catch(error => {
                swal("Error!", "Terdapat Masalah, Silahkan Hubungi Admin!", "error");
            });
    }

    handleEditButton(e) {
        axios
            .get(`/kanrisha/alhuqulAlfareia/deeta/${e}`)
            .then(response => {
                this.setState({
                    dataEditInput: response.data.data.asm,
                    url: response.data.data.rinku,
                    heyaMei: response.data.data.heyaRinku
                });
            })
            .catch(error => {
                swal("Error!", "Terdapat Masalah, Silahkan Hubungi Admin!", "error");
            });
    }

    handleChange(e) {
        this.setState({
            dataNewInput: e.target.value
        });
        // console.log(e.target.value);
    }

    handleEditInputChange(e) {
        this.setState({
            dataEditInput: e.target.value
        });
        // console.log(e.target.value);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            loading: true
        });
        axios
            .post("/kanrisha/alhuqulAlfareia/deeta", {
                data: this.state.dataNewInput,
                heyaMei: this.state.heyaMei
            })
            .then(response => {
                this.setState({
                    data: [response.data.data, ...this.state.data],
                    dataNewInput: "",
                    loading: false
                });
                $("#tambahModal").removeClass("in");
                $(".modal-backdrop").remove();
                $('body').removeClass('modal-open');
                $('body').css('padding-right', '');
                $("#tambahModal").hide();
                swal("Sukses!", "Data Baru Berhasil Ditambahkan!", "success");
                // console.log("from handle sumit", response);
            })
            .catch(error => {
                this.setState({
                    loading: false
                });
                swal("Error!", "Gagal Memasukkan Data Baru, Silahkan Hubungi Admin!", "error");
            });
        // console.log(this.state.create);
    }

    handleEditSubmit(e) {
        e.preventDefault();
        this.setState({
            loading: true
        });
        axios
            .put(`/kanrisha/alhuqulAlfareia/deeta/${this.state.url}`, {
                heyaMei: this.state.heyaMei,
                data: this.state.dataEditInput
            })
            .then(response => {
                this.setState({
                    data: response.data.data.data,
                    dataEditInput: "",
                    loading: false
                });
                $("#editModal").removeClass("in");
                $(".modal-backdrop").remove();
                $('body').removeClass('modal-open');
                $('body').css('padding-right', '');
                $("#editModal").hide();
                swal("Sukses!", "Data Berhasil Diubah!", "success");
                // console.log("from handle sumit", response);
            })
            .catch(error => {
                this.setState({
                    loading: false
                });
                swal("Error!", "Gagal Mengubah Data, Silahkan Hubungi Admin! Kode Error : HS", "error");
            });
        // console.log(this.state.create);
    }

    getHeya() {
        axios.get("/kanrisha/alhuqulAlfareia/deeta/create").then((response) => {
            this.setState({
                heya: response.data.data.heya,
                heyaMei: response.data.data.heya[0].rinku,
            });
            // console.log(response.data.data.heya[0].rinku);
        });
    }

    getData() {
        this.setState({
            loading: true
        });
        axios
            .get("/kanrisha/alhuqulAlfareia/deeta")
            .then(response => {
                // console.log(response.data.data.data);
                this.setState({
                    data: response.data.data.data,
                    loading: false,
                    activePage: response.data.data.current_page,
                    itemsCountPerPage: response.data.data.per_page,
                    totalItemsCount: response.data.data.total,
                    pageRangeDisplayed: 10
                });
            })
            .catch(error => {
                swal("Error!", "Terdapat Masalah, Silahkan Hubungi Admin! Code Error : GD", "error");
                this.setState({loading: false});
            });
    }

    handlePageChange(pageNumber) {
        this.setState({
            loading: true
        });
        axios
            .get('/kanrisha/alhuqulAlfareia/deeta?page='+pageNumber)
            .then(response => {
                this.setState({
                    data: response.data.deeta_data.data,
                    loading: false,
                    activePage: response.data.deeta_data.current_page,
                    itemsCountPerPage: response.data.deeta_data.per_page,
                    totalItemsCount: response.data.deeta_data.total,
                    pageRangeDisplayed: 10
                });
            })
            .catch(error => {
                swal("Error!", "Terdapat Masalah, Silahkan Hubungi Admin!", "error");
                this.setState({loading: false});
            });
    }

    testData() {
        axios
            .get("/masariuman_tag")
            .then(response => console.log(response.data.deeta_data));
    }

    componentDidMount() {
        this.getData();
        this.getHeya();
        // console.log(this.state.tag);
    }

    componentDidUpdate() {
        // this.getTag();
    }

    renderSelect() {
        return this.state.heya.map((albayanat) => (
            <option value={albayanat.rinku} key={albayanat.rinku}>
                {albayanat.heyaMei}
            </option>
        ));
    }

    renderData() {
        return !this.state.data.length ? <tr><td colSpan="3" className="text-center">Data Tidak Ditemukan</td></tr> :
            this.state.data.map(data => (
                <tr key={data.id}>
                    <th scope="row">{data.nomor}</th>
                    <td>{data.asm}</td>
                    <td>
                        <button data-target="#editModal" data-toggle="modal" className="mb-2 mr-2 border-0 btn-transition btn btn-shadow btn-outline-warning" type="button" onClick={this.handleEditButton.bind(this, data.rinku)}>Ubah</button>
                        <button className="mb-2 mr-2 border-0 btn-transition btn btn-shadow btn-outline-danger" type="button" onClick={this.handleDeleteButton.bind(this, data.rinku)}>Hapus</button>
                    </td>
                </tr>
            ));
    }

    modalTambah() {
        return (
            <div aria-hidden="true" className="onboarding-modal modal fade animated" id="tambahModal" role="dialog" tabIndex="-1">
                <div className="modal-dialog modal-lg modal-centered" role="document">
                    <div className="modal-content text-center">
                    <button aria-label="Close" className="close" data-dismiss="modal" type="button"><span className="close-label">Tutup</span><span className="os-icon os-icon-close"></span></button>
                    <div className="onboarding-side-by-side">
                        <div className="onboarding-media">
                        <img alt="" src="/iconModal/tagplus.png" width="200px" />
                        </div>
                        <div className="onboarding-content with-gradient">
                        <h4 className="onboarding-title">
                            Tambah Sub Bidang Baru
                        </h4>
                        <div className="onboarding-text">
                            Masukkan nama Sub Bidang baru.
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <input
                                        onChange={this.handleChange}
                                        value={this.state.dataNewInput}
                                        title="Nama Sub Bidang"
                                        placeholder="Masukkan Nama Sub Bidang Baru.."
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <select
                                        value={this.state.heyaMei}
                                        onChange={this.handleChangeHeya}
                                        className="form-control"
                                    >
                                        {this.renderSelect()}
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group text-center">
                                    <button className="mr-2 mb-2 btn btn-primary" data-target="#onboardingWideFormModal" data-toggle="modal" type="submit">Tambah Sub Bidang Baru</button>
                                </div>
                            </div>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }

    modalUbah() {
        return (
            <div aria-hidden="true" className="onboarding-modal modal fade animated" id="editModal" role="dialog" tabIndex="-1">
                <div className="modal-dialog modal-lg modal-centered" role="document">
                    <div className="modal-content text-center">
                    <button aria-label="Close" className="close" data-dismiss="modal" type="button"><span className="close-label">Tutup</span><span className="os-icon os-icon-close"></span></button>
                    <div className="onboarding-side-by-side">
                        <div className="onboarding-media">
                        <img alt="" src="/iconModal/tagEdit.png" width="200px" />
                        </div>
                        <div className="onboarding-content with-gradient">
                        <h4 className="onboarding-title">
                            Ubah Nama Sub Bidang
                        </h4>
                        <div className="onboarding-text">
                            Masukkan nama Sub Bidang baru.
                        </div>
                        <form onSubmit={this.handleEditSubmit}>
                            <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <input
                                        onChange={this.handleEditInputChange}
                                        value={this.state.dataEditInput}
                                        title="Nama Sub Bidang"
                                        placeholder="Masukkan Nama Sub Bidang Baru.."
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <select
                                        value={this.state.heyaMei}
                                        onChange={this.handleChangeHeya}
                                        className="form-control"
                                    >
                                        {this.renderSelect()}
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group text-center">
                                    <button className="mr-2 mb-2 btn btn-warning" data-target="#onboardingWideFormModal" data-toggle="modal" type="submit">Ubah Nama Sub Bidang</button>
                                </div>
                            </div>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            this.state.loading === true ? <Loading /> :
            <div className="content-w">
                {/* title content */}
                <div className="top-bar color-scheme-transparent masariuman-height103px">
                    <div className="top-menu-controls masariuman-marginleft30px">
                        <div className="icon-w top-icon masariuman-titlecontent">
                        <div className="os-icon os-icon-tag"></div>
                        </div>
                        <div className="masariuman-textleft">
                            <span className="masariuman-bold">Sub Bidang</span> <br/>
                            <small>Sub Bidang Management</small>
                        </div>
                    </div>
                    <div className="top-menu-controls">
                        <button className="mr-2 mb-2 btn btn-outline-primary" type="button" id="petunjuk"><i className="batch-icon-bulb-2"></i> PETUNJUK <i className="batch-icon-bulb"></i></button>
                    </div>
                </div>
                <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a>Sub Bidang</a>
                    </li>
                    <li className="breadcrumb-item">
                        <span>Sub Bidang Management</span>
                    </li>
                </ul>

                {/* content */}
                <div className="content-i masariuman-minheight100vh">
                        <div className="content-box">
                            <div className="element-wrapper">
                                {/* content here */}
                                <div className="element-box">
                                    <h5 className="form-header">
                                    Sub Bidang List
                                    </h5>
                                    <div className="form-desc">
                                        Manajemen Sub Bidang Data
                                    </div>
                                    <div>
                                        <button className="mr-2 mb-2 btn btn-primary" data-target="#tambahModal" data-toggle="modal" type="button" id="buttonTambahModal">Tambah Sub Bidang Baru</button>
                                        <div className="col-sm-4 float-right">
                                            <input type="text" className="form-control" onChange={this.handleChangeCari}
                                                value={this.state.cari} placeholder="Cari Sub Bidang..."></input>
                                        </div>
                                    </div>
                                    <div className="table-responsive" id="Sub BidangTable">
                                        <table id="tabeldata" width="100%" className="table table-striped table-lightfont">
                                            <thead>
                                                <tr>
                                                    <th className="width50px">NO</th>
                                                    <th>NAMA Sub Bidang</th>
                                                    <th className="width250px">ACTION</th>
                                                </tr>
                                            </thead>
                                            <tbody>{this.renderData()}</tbody>
                                        </table>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <Pagination
                                            activePage={this.state.activePage}
                                            itemsCountPerPage={this.state.itemsCountPerPage}
                                            totalItemsCount={this.state.totalItemsCount}
                                            pageRangeDisplayed={this.state.pageRangeDisplayed}
                                            onChange={this.handlePageChange}
                                        />
                                    </div>
                                </div>
                                {/* end content here */}
                            </div>
                            <DarkMode />
                        </div>
                    </div>
                <Footer />
                {this.modalTambah()}
                {this.modalUbah()}
            </div>
        );
    }
}

export default alhuqulAlfareia;
