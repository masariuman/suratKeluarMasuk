import React, { Component } from "react";
import $ from 'jquery';
import Footer from "../../warudo/Footer";
import DarkMode from "../../warudo/DarkMode";
import { Link } from "react-router-dom";
import Loading from "../../warudo/Loading";
import swal from 'sweetalert';
import Pagination from "react-js-pagination";
import Highlighter from "react-highlight-words";


class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            heya: [],
            heyaMei : "",
            level: "3",
            uuzaNoRinku : "",
            nip : "",
            name : "",
            dataEditInput: "",
            cari: "",
            sashinUuzaa : "",
            url: null,
            loading: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleEditInputChange = this.handleEditInputChange.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.handleLevelSubmit = this.handleLevelSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderData = this.renderData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.modalTambah = this.modalTambah.bind(this);
        this.modalUbah = this.modalUbah.bind(this);
        this.modalLevel = this.modalLevel.bind(this);
        this.handleChangeCari = this.handleChangeCari.bind(this);
        this.handleChangeHeya = this.handleChangeHeya.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeNip = this.handleChangeNip.bind(this);
        this.handleChangeLevel = this.handleChangeLevel.bind(this);
        this.handleButtonFile = this.handleButtonFile.bind(this);
        this.handleChangeFile = this.handleChangeFile.bind(this);
    }

    handleButtonFile(e) {
        this.refs.fileUploader.click();
        // console.log(e.target.value);
    }

    handleChangeFile(e) {
        const data = new FormData();
        data.append('file', e.target.files[0]);
        data.append('url', this.state.uuzaNoRinku);
        axios
            .post(`/kanrisha/uuzaa/sashinUuzaa/`, data)
            .then((response) => {
                this.setState({
                    sashinUuzaa: response.data.data.data.sashin
                });
                console.log(response);
                swal("Sukses!", "Foto Berhasi Diubah!", "success");
            })
            .catch(error => {
                this.setState({
                    loading: false
                });
                swal("Error!", "Gagal Mengubah Foto, Silahkan Hubungi Admin!", "error");
            });
    }

    handleChangeLevel(e) {
        this.setState({
            level: e.target.value,
        });
        console.log(this.state.level);
    }

    handleChangeHeya(e) {
        this.setState({
            heyaMei: e.target.value,
        });
    }

    handleChangeName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    handleChangeNip(e) {
        this.setState({
            nip: e.target.value,
        });
    }

    handleChangeCari(e) {
        this.setState({
            cari: e.target.value
        });
        axios
            .post(`/uuzaa/search`, {
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
            .get(`/kanrisha/uuzaa/deeta/${e}`)
            .then(response => {
                swal({
                    title: `Yakin ingin menghapus user dengan NIP ${response.data.data.juugyouinBangou} yang bernama ${response.data.data.name}`,
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
                            .delete(`/kanrisha/uuzaa/deeta/${e}`, {
                                rinku: ""
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

    handleResetPasswordButton(e) {
        axios
            .get(`/kanrisha/uuzaa/deeta/${e}`)
            .then(response => {
                swal({
                    title: `Apakah Anda Yakin ingin mereset password dengan NIP ${response.data.data.juugyouinBangou} yang bernama ${response.data.data.name}`,
                    text: "Setelah Direset, Password Akan Kembali Menjadi NIP Sebagai Password!",
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
                            .get(`/kanrisha/uuzaa/resetPasswordUser/${e}`, {
                                rinku: ""
                            })
                            .then(response => {
                                this.setState({
                                    data: response.data.data.data,
                                    loading: false
                                });
                                swal("Sukses!", "Password Berhasil Di Reset Ulang!", "success");
                                // console.log("from handle sumit", response);
                            })
                            .catch(error => {
                                this.setState({
                                    loading: false
                                });
                                swal("Error!", "Password Gagal Direset Ulang!", "error");
                            });
                    } else {
                    //   swal("Data Tidak Terhapus!");
                    }
                  });
            })
            .catch(error => {
                swal("Error!", "Terdapat Masalah, Silahkan Hubungi Admin!", "error");
            });
    }

    handleEditButton(e) {
        axios
            .get(`/kanrisha/uuzaa/deeta/${e}`)
            .then(response => {
                this.setState({
                    heyaMei : response.data.data.heyaRinku,
                    nip : response.data.data.juugyouinBangou,
                    uuzaNoRinku : response.data.data.rinku,
                    sashinUuzaa : response.data.data.sashin,
                    name : response.data.data.name
                });
            })
            .catch(error => {
                swal("Error!", "Terdapat Masalah, Silahkan Hubungi Admin!", "error");
            });
    }

    handleLevelButton(e) {
        axios
            .get(`/kanrisha/uuzaa/deeta/${e}`)
            .then(response => {
                this.setState({
                    level : response.data.data.reberu,
                    uuzaNoRinku : response.data.data.rinku
                });
            })
            .catch(error => {
                swal("Error!", "Terdapat Masalah, Silahkan Hubungi Admin!", "error");
            });
    }

    handleChange(e) {
        this.setState({
            create: e.target.value
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
            .post("/kanrisha/uuzaa/deeta", {
                heyaMei : this.state.heyaMei,
                nip : this.state.nip,
                name : this.state.name
            })
            .then(response => {
                this.setState({
                    data: [response.data.data, ...this.state.data],
                    nip : "",
                    name : "",
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
            .put(`/kanrisha/uuzaa/deeta/${this.state.uuzaNoRinku}`, {
                heyaMei : this.state.heyaMei,
                nip : this.state.nip,
                name : this.state.name
            })
            .then(response => {
                this.setState({
                    data: response.data.data.data,
                    nip : "",
                    name : "",
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
                swal("Error!", "Gagal Mengubah Data, Silahkan Hubungi Admin!", "error");
            });
        // console.log(this.state.create);
    }

    handleLevelSubmit(e) {
        e.preventDefault();
        this.setState({
            loading: true
        });
        axios
            .put(`/kanrisha/uuzaa/deeta/${this.state.uuzaNoRinku}`, {
                reberu : this.state.level
            })
            .then(response => {
                this.setState({
                    data: response.data.data.data,
                    level : "3",
                    loading: false
                });
                $("#levelModal").removeClass("in");
                $(".modal-backdrop").remove();
                $('body').removeClass('modal-open');
                $('body').css('padding-right', '');
                $("#levelModal").hide();
                swal("Sukses!", "Data Berhasil Diubah!", "success");
                // console.log("from handle sumit", response);
            })
            .catch(error => {
                this.setState({
                    loading: false
                });
                swal("Error!", "Gagal Mengubah Data, Silahkan Hubungi Admin!", "error");
            });
        // console.log(this.state.create);
    }

    getHeya() {
        axios.get("/kanrisha/uuzaa/deeta/create").then((response) => {
            this.setState({
                heya: response.data.data.heya,
                heyaMei: response.data.data.heya[0].rinku,
            });
        });
    }

    getData() {
        this.setState({
            loading: true
        });
        axios
            .get("/kanrisha/uuzaa/deeta")
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
                        'next #ubah1' : 'Untuk Mengubah Data dan Foto, Tekan Tombol Ubah Data/Foto Berikut'
                    },
                    {
                        'next #level1' : 'Untuk Mengubah Level User Dalam Menggunakan Aplikasi, Tekan Tombol Level Berikut. <br /><br />Level Normal User Tidak Dapat Login. <br /><br /> Level Admin Bidang Adalah Level Untuk Pegawai Yang Memanajemen Data Surat Sesuai <br /> Dengan Bidangnya Masing, Masing. Level Admin Bidang Hanya <br /> Bisa Melihat Surat Dari Bidangnya Dan Tidak Memiliki Akses Untuk Manajemen User, <br /> Manajemen Bidang, dan Manajemen Sub Bidang. <br /><br /> Level Super Admin Layaknya Mirip Seperti Level Admin Akan Tetapi <br /> Dapat Melihat Keseluruhan Surat Dari Seluruh Bidang. <br /><br /> Level Legendary Admin Mirip Seperti Level Super Admin Akan Tetapi <br /> Dapat Mengakses Menu Manajemen User, Manajemen Bidang, dan Manajemen Sub Bidang.'
                    },
                    {
                        'next #reset1' : 'Untuk Mereset Password User, Tekan Tombol Reset Password. Password Akan Dikembalikan Ke Password Semula Yaitu NIP dari Pegawai Tersebut.'
                    },
                    {
                        'next #cari' : 'Untuk Mencari data, Ketikkan Pada Kolom Berikut Dan Tunggu Hasilnya Keluar'
                    },
                    {
                        'next #pagination' : 'Untuk Melihat Data Berikutnya, Pilih Pada Angka Berikut Untuk Melihat Data Pada Halaman Selanjutnya'
                    }
                    ];
                    enjoyhint_instance.set(enjoyhint_script_steps);
                    enjoyhint_instance.run();
                });
            })
            .catch(error => {
                swal("Error!", "Terdapat Masalah, Silahkan Hubungi Admin! ", "error");
                this.setState({loading: false});
            });
    }

    handlePageChange(pageNumber) {
        this.setState({
            loading: true
        });
        axios
            .get('/masariuman_tag?page='+pageNumber)
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
        // console.log(this.state.data);
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

    renderSashin() {
        return !this.state.sashinUuzaa || this.state.sashinUuzaa === "" ? <img alt="" src="/warudo/dist/img/avatar.jpg" /> : <img alt="" src={"/sashin/"+this.state.sashinUuzaa} />;
    }

    renderData() {
        return !this.state.data.length ? <tr><td colSpan="6" className="text-center">Data Tidak Ditemukan</td></tr> :
            this.state.data.map(data => (
                <tr key={data.rinku}>
                    <th scope="row" className="text-center">{data.nomor}</th>
                    <td className="text-center">
                        <Highlighter
                            highlightClassName="YourHighlightClass"
                            searchWords={[this.state.cari]}
                            autoEscape={true}
                            textToHighlight={data.juugyouinBangou}
                        />
                    </td>
                    <td className="text-center">
                        <Highlighter
                            highlightClassName="YourHighlightClass"
                            searchWords={[this.state.cari]}
                            autoEscape={true}
                            textToHighlight={data.name}
                        />
                    </td>
                    <td className="text-center">{data.heyaMei}</td>
                    <td className="text-center">{data.level}</td>
                    <td className="text-center">
                        <button data-target="#editModal" data-toggle="modal" className="mb-2 mr-2 border-0 btn-transition btn btn-shadow btn-outline-warning" type="button" onClick={this.handleEditButton.bind(this, data.rinku)} id={'ubah'+data.nomor}>Ubah Data/Foto</button>
                        <button className="mb-2 mr-2 border-0 btn-transition btn btn-shadow btn-outline-danger" type="button" onClick={this.handleDeleteButton.bind(this, data.rinku)} id={'hapus'+data.nomor}>Hapus</button> <br />
                        <button data-target="#levelModal" data-toggle="modal" className="mb-2 mr-2 border-0 btn-transition btn btn-shadow btn-outline-secondary" type="button" onClick={this.handleLevelButton.bind(this, data.rinku)} id={'level'+data.nomor}>Level</button>
                        <button className="mb-2 mr-2 border-0 btn-transition btn btn-shadow btn-outline-success" type="button" onClick={this.handleResetPasswordButton.bind(this, data.rinku)} id={'reset'+data.nomor}>Reset Password</button>
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
                        <div className="onboarding-content with-gradient masariuman_width100percent">
                        <h4 className="onboarding-title">
                            Tambah User Baru
                        </h4>
                        <div className="onboarding-text">
                            Masukkan User baru.
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <input
                                        onChange={this.handleChangeNip}
                                        value={this.state.nip}
                                        title="NIP User"
                                        placeholder="Masukkan NIP Baru.."
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        onChange={this.handleChangeName}
                                        value={this.state.name}
                                        title="Nama User"
                                        placeholder="Masukkan Nama User Baru.."
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
                                    <button className="mr-2 mb-2 btn btn-primary" data-target="#onboardingWideFormModal" data-toggle="modal" type="submit">Tambah User Baru</button>
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
                            <h4 className="onboarding-title">
                                Ubah Foto
                            </h4>
                            {this.renderSashin()} <br /><br />
                            <button className="mr-2 mb-2 btn btn-primary" type="button" onClick={this.handleButtonFile} >Upload Foto Baru</button>
                            <input
                                onChange={this.handleChangeFile}
                                title="File"
                                placeholder="File.."
                                type="file"
                                className="form-control masariuman_displayNone"
                                ref="fileUploader"
                            />
                        </div>
                        <div className="onboarding-content with-gradient masariuman_width100percent">
                        <h4 className="onboarding-title">
                            Ubah data User
                        </h4>
                        <div className="onboarding-text">
                            Masukkan data User baru.
                        </div>
                        <form onSubmit={this.handleEditSubmit}>
                            <div className="row">
                            <div className="col-sm-12">
                            <div className="form-group">
                                    <input
                                        onChange={this.handleChangeNip}
                                        value={this.state.nip}
                                        title="NIP User"
                                        placeholder="Masukkan NIP Baru.."
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        onChange={this.handleChangeName}
                                        value={this.state.name}
                                        title="Nama User"
                                        placeholder="Masukkan Nama User Baru.."
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
                                    <button className="mr-2 mb-2 btn btn-warning" data-target="#onboardingWideFormModal" data-toggle="modal" type="submit">Ubah Nama User</button>
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

    modalLevel() {
        return (
            <div aria-hidden="true" className="onboarding-modal modal fade animated" id="levelModal" role="dialog" tabIndex="-1">
                <div className="modal-dialog modal-lg modal-centered" role="document">
                    <div className="modal-content text-center">
                    <button aria-label="Close" className="close" data-dismiss="modal" type="button"><span className="close-label">Tutup</span><span className="os-icon os-icon-close"></span></button>
                    <div className="onboarding-side-by-side">
                        <div className="onboarding-media">
                        <img alt="" src="/iconModal/tagEdit.png" width="200px" />
                        </div>
                        <div className="onboarding-content with-gradient masariuman_width100percent">
                        <h4 className="onboarding-title">
                            Ubah Level User
                        </h4>
                        <div className="onboarding-text">
                            Masukkan Level User Baru.
                        </div>
                        <form onSubmit={this.handleLevelSubmit}>
                            <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <select
                                        value={this.state.level}
                                        onChange={this.handleChangeLevel}
                                        className="form-control"
                                    >
                                        <option value="nol" key="nol">
                                            Legendary Admin
                                        </option>
                                        <option value="1" key="1">
                                            Super Admin
                                        </option>
                                        <option value="2" key="2">
                                            Admin Bidang
                                        </option>
                                        <option value="3" key="3">
                                            Normal User
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group text-center">
                                    <button className="mr-2 mb-2 btn btn-warning" data-target="#onboardingWideFormModal" data-toggle="modal" type="submit">Ubah Nama User</button>
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
                            <span className="masariuman-bold">User</span> <br/>
                            <small>User Management</small>
                        </div>
                    </div>
                    <div className="top-menu-controls">
                        <button className="mr-2 mb-2 btn btn-outline-primary" type="button" id="petunjuk"><i className="batch-icon-bulb-2"></i> PETUNJUK <i className="batch-icon-bulb"></i></button>
                    </div>
                </div>
                <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a>User</a>
                    </li>
                    <li className="breadcrumb-item">
                        <span>User Management</span>
                    </li>
                </ul>

                {/* content */}
                <div className="content-i masariuman-minheight100vh">
                        <div className="content-box">
                            <div className="element-wrapper">
                                {/* content here */}
                                <div className="element-box">
                                    <h5 className="form-header">
                                    User List
                                    </h5>
                                    <div className="form-desc">
                                        Manajemen User Data
                                    </div>
                                    <div>
                                        <button className="mr-2 mb-2 btn btn-primary" data-target="#tambahModal" data-toggle="modal" type="button" id="buttonTambahModal">Tambah User Baru</button>
                                        <div className="col-sm-4 float-right" id="cari">
                                            <input type="text" className="form-control" onChange={this.handleChangeCari}
                                                value={this.state.cari} placeholder="Cari User..."></input>
                                        </div>
                                    </div>
                                    <div className="table-responsive" id="ruanganTable">
                                        <table id="tabeldata" width="100%" className="table table-striped table-lightfont">
                                            <thead>
                                                <tr>
                                                    <th className="width50px text-center">NO</th>
                                                    <th className="text-center">NIP</th>
                                                    <th className="text-center">NAMA</th>
                                                    <th className="text-center">Bidang</th>
                                                    <th className="text-center">LEVEL USER</th>
                                                    <th className="width250px text-center">ACTION</th>
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
                {this.modalLevel()}
            </div>
        );
    }
}

export default User;
