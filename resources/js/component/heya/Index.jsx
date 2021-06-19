import React, { Component } from "react";
import $ from 'jquery';
import Footer from "../../warudo/Footer";
import DarkMode from "../../warudo/DarkMode";
import { Link } from "react-router-dom";
import Loading from "../../warudo/Loading";
import swal from 'sweetalert';
import Pagination from "react-js-pagination";
import Highlighter from "react-highlight-words";


class Heya extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
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
    }

    handleChangeCari(e) {
        this.setState({
            cari: e.target.value
        });
        axios
            .post(`/heya/search`, {
                cari: e.target.value
            })
            .then(response => {
                // console.log(response.data);
                this.setState({
                    data: response.data.data.data,
                    loading: false,
                    activePage: response.data.data.current_page,
                    itemsCountPerPage: response.data.data.per_page,
                    totalItemsCount: response.data.data.total,
                    pageRangeDisplayed: 10
                });
                // console.log(this.state.tag);
            });
    }

    handleDeleteButton(e) {
        axios
            .get(`/kanrisha/heya/deeta/${e}`)
            .then(response => {
                swal({
                    title: `Yakin ingin menghapus Bidang ${response.data.data.heyaMei}`,
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
                            .delete(`/kanrisha/heya/deeta/${e}`, {
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
            .get(`/kanrisha/heya/deeta/${e}`)
            .then(response => {
                this.setState({
                    dataEditInput: response.data.data.heyaMei,
                    url: response.data.data.rinku
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
            .post("/kanrisha/heya/deeta", {
                heyaMei: this.state.dataNewInput
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
            .put(`/kanrisha/heya/deeta/${this.state.url}`, {
                heyaMei: this.state.dataEditInput
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

    getData() {
        this.setState({
            loading: true
        });
        axios
            .get("/kanrisha/heya/deeta")
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
                $('#petunjuk').on('click',function() {
                    var enjoyhint_instance = new EnjoyHint({});
                    var enjoyhint_script_steps = [
                    {
                        'next #buttonTambahModal' : 'Untuk Menambah Data Baru, Tekan Tombol Tambah Surat Masuk Baru'
                    },
                    {
                        'next #ubah1' : 'Untuk Mengubah Data, Tekan Tombol Ubah Berikut'
                    },
                    {
                        'next #hapus1' : 'Untuk Menghapus Data, Tekan Hapus Berikut'
                    },
                    {
                        'next #pagination' : 'Untuk Melihat Data Berikutnya, Pilih Pada Angka Berikut Untuk Melihat Data Pada Halaman Selanjutnya'
                    },
                    {
                        'next #cari' : 'Untuk Mencari data, Ketikkan Pada Kolom Berikut Dan Tunggu Hasilnya Keluar'
                    },
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
            .get('/kanrisha/heya/deeta?page='+pageNumber)
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
        // console.log(this.state.tag);
    }

    componentDidUpdate() {
        // this.getTag();
    }

    renderData() {
        return !this.state.data.length ? <tr><td colSpan="3" className="text-center">Data Tidak Ditemukan</td></tr> :
            this.state.data.map(data => (
                <tr key={data.id}>
                    <th scope="row">{data.nomor}</th>
                    <td>
                        <Highlighter
                            highlightClassName="YourHighlightClass"
                            searchWords={[this.state.cari]}
                            autoEscape={true}
                            textToHighlight={data.heyaMei}
                        />
                    </td>
                    <td>
                        <button data-target="#editModal" data-toggle="modal" className="mb-2 mr-2 border-0 btn-transition btn btn-shadow btn-outline-warning" type="button" onClick={this.handleEditButton.bind(this, data.rinku)} id={'ubah'+data.nomor}>Ubah</button>
                        <button className="mb-2 mr-2 border-0 btn-transition btn btn-shadow btn-outline-danger" type="button" onClick={this.handleDeleteButton.bind(this, data.rinku)} id={'hapus'+data.nomor}>Hapus</button>
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
                        <img alt="" src="/iconModal/roomPlus.png" width="200px" />
                        </div>
                        <div className="onboarding-content with-gradient masariuman_width100percent">
                        <h4 className="onboarding-title">
                            Tambah Bidang Baru
                        </h4>
                        <div className="onboarding-text">
                            Masukkan nama Bidang baru.
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <input
                                        onChange={this.handleChange}
                                        value={this.state.dataNewInput}
                                        title="Nama Bidang"
                                        placeholder="Masukkan Nama Bidang Baru.."
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group text-center">
                                    <button className="mr-2 mb-2 btn btn-primary" data-target="#onboardingWideFormModal" data-toggle="modal" type="submit">Tambah Bidang Baru</button>
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
                        <img alt="" src="/iconModal/roomEdit.png" width="200px" />
                        </div>
                        <div className="onboarding-content with-gradient masariuman_width100percent">
                        <h4 className="onboarding-title">
                            Ubah Nama Bidang
                        </h4>
                        <div className="onboarding-text">
                            Masukkan nama Bidang baru.
                        </div>
                        <form onSubmit={this.handleEditSubmit}>
                            <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <input
                                        onChange={this.handleEditInputChange}
                                        value={this.state.dataEditInput}
                                        title="Nama Bidang"
                                        placeholder="Masukkan Nama Bidang Baru.."
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group text-center">
                                    <button className="mr-2 mb-2 btn btn-warning" data-target="#onboardingWideFormModal" data-toggle="modal" type="submit">Ubah Nama Bidang</button>
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
                        <div className="os-icon os-icon-home"></div>
                        </div>
                        <div className="masariuman-textleft">
                            <span className="masariuman-bold">Bidang</span> <br/>
                            <small>Bidang Management</small>
                        </div>
                    </div>
                    <div className="top-menu-controls">
                        <button className="mr-2 mb-2 btn btn-outline-primary" type="button" id="petunjuk"><i className="batch-icon-bulb-2"></i> PETUNJUK <i className="batch-icon-bulb"></i></button>
                    </div>
                </div>
                <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a>Bidang</a>
                    </li>
                    <li className="breadcrumb-item">
                        <span>Bidang Management</span>
                    </li>
                </ul>

                {/* content */}
                <div className="content-i masariuman-minheight100vh">
                        <div className="content-box">
                            <div className="element-wrapper">
                                {/* content here */}
                                <div className="element-box">
                                    <h5 className="form-header">
                                    Bidang List
                                    </h5>
                                    <div className="form-desc">
                                        Manajemen Bidang Data
                                    </div>
                                    <div>
                                        <button className="mr-2 mb-2 btn btn-primary" data-target="#tambahModal" data-toggle="modal" type="button" id="buttonTambahModal">Tambah Bidang Baru</button>
                                        <div className="col-sm-4 float-right" id="cari">
                                            <input type="text" className="form-control" onChange={this.handleChangeCari}
                                                value={this.state.cari} placeholder="Cari Bidang..."></input>
                                        </div>
                                    </div>
                                    <div className="table-responsive" id="BidangTable">
                                        <table id="tabeldata" width="100%" className="table table-striped table-lightfont">
                                            <thead>
                                                <tr>
                                                    <th className="width50px">NO</th>
                                                    <th>NAMA Bidang</th>
                                                    <th className="width250px">ACTION</th>
                                                </tr>
                                            </thead>
                                            <tbody>{this.renderData()}</tbody>
                                        </table>
                                    </div>
                                    <div className="d-flex justify-content-center" id="pagination">
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

export default Heya;
