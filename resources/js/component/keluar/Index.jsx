import React, { Component } from "react";
import $ from 'jquery';
import Footer from "../../warudo/Footer";
import DarkMode from "../../warudo/DarkMode";
import { Link } from "react-router-dom";
import Loading from "../../warudo/Loading";
import swal from 'sweetalert';
import Pagination from "react-js-pagination";
import Highlighter from "react-highlight-words";


class Keluar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            subbid: [],
            asalSurat: "",
            tujuanSurat: "",
            nomorSurat: "",
            asalSuratName: "",
            tanggalSurat: "",
            perihal: "",
            tanggalKirim: "",
            kodeBerkas: "",
            dataEditInput: "",
            cari: "",
            url: null,
            file: null,
            filePath: null,
            fileUrl: null,
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
        this.modalDetail = this.modalDetail.bind(this);
        this.handleChangeCari = this.handleChangeCari.bind(this);
        this.handleChangeAsalSurat = this.handleChangeAsalSurat.bind(this);
        this.handleChangeTujuanSurat = this.handleChangeTujuanSurat.bind(this);
        this.handleChangeNomorSurat = this.handleChangeNomorSurat.bind(this);
        this.handleChangeTanggalSurat = this.handleChangeTanggalSurat.bind(this);
        this.handleChangePerihal = this.handleChangePerihal.bind(this);
        this.handleChangeTanggalKirim = this.handleChangeTanggalKirim.bind(this);
        this.handleChangeKodeBerkas = this.handleChangeKodeBerkas.bind(this);
        this.handleChangeFile = this.handleChangeFile.bind(this);
        this.handleButtonFile = this.handleButtonFile.bind(this);
        this.handleTambahButton = this.handleTambahButton.bind(this);
    }

    handleTambahButton(e) {
        this.setState({
            nomorSurat: "",
            tanggalSurat: "",
            perihal: "",
            tanggalKirim: "",
            tujuanSurat: "",
            asalSurat: "",
            kodeBerkas: "",
            file: null,
            filePath: null,
            fileUrl: null,
        });
    }

    handleButtonFile(e) {
        this.refs.fileUploader.click();
        // console.log(e.target.value);
    }

    handleChangeAsalSurat(e) {
        this.setState({
            asalSurat: e.target.value
        });
        // console.log(e.target.value);
    }

    handleChangeTujuanSurat(e) {
        this.setState({
            tujuanSurat: e.target.value
        });
        // console.log(e.target.value);
    }

    handleChangeKodeBerkas(e) {
        this.setState({
            kodeBerkas: e.target.value
        });
        // console.log(e.target.value);
    }

    handleChangeNomorSurat(e) {
        this.setState({
            nomorSurat: e.target.value
        });
        // console.log(e.target.value);
    }

    handleChangeTanggalSurat(e) {
        this.setState({
            tanggalSurat: e.target.value
        });
        // console.log(e.target.value);
    }

    handleChangePerihal(e) {
        this.setState({
            perihal: e.target.value
        });
        // console.log(e.target.value);
    }

    handleChangeTanggalKirim(e) {
        this.setState({
            tanggalKirim: e.target.value
        });
        // console.log(e.target.value);
    }

    handleChangeFile(e) {
        // console.log(e.target.files[0]);
        this.setState({
            file: e.target.files[0],
            filePath: e.target.value,
            fileUrl: e.target.value,
        });
    }

    handleChangeCari(e) {
        this.setState({
            cari: e.target.value
        });
        axios
            .post(`/keluar/search`, {
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
            .get(`/kanrisha/keluar/deeta/${e}`)
            .then(response => {
                swal({
                    title: `Yakin ingin menghapus surat yang menuju ${response.data.data.tujuanSurat} dengan nomor surat ${response.data.data.nomorSurat}`,
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
                            .delete(`/kanrisha/keluar/deeta/${e}`, {
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
            .get(`/kanrisha/keluar/deeta/${e}`)
            .then(response => {
                this.setState({
                    nomorSurat: response.data.data.nomorSurat,
                    tanggalSurat: response.data.data.tanggalSurat,
                    perihal: response.data.data.perihal,
                    tujuanSurat: response.data.data.tujuanSurat,
                    tanggalKirim: response.data.data.tanggalKirim,
                    asalSurat: response.data.data.asalSuratId.rinku,
                    asalSuratName: response.data.data.subbid.asm,
                    kodeBerkas: response.data.data.kodeBerkas,
                    url: e,
                    filePath: response.data.data.filePath,
                    fileUrl: response.data.data.filePath,
                    file: null
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
        const data = new FormData();
        data.append('file', this.state.file);
        data.append('asalSurat', this.state.asalSurat);
        data.append('nomorSurat', this.state.nomorSurat);
        data.append('tanggalSurat', this.state.tanggalSurat);
        data.append('perihal', this.state.perihal);
        data.append('tujuanSurat', this.state.tujuanSurat);
        data.append('tanggalKirim', this.state.tanggalKirim);
        data.append('kodeBerkas', this.state.kodeBerkas);
        axios
            .post("/kanrisha/keluar/deeta", data)
            .then(response => {
                this.setState({
                    data: [response.data.data, ...this.state.data],
                    nomorSurat: "",
                    tanggalSurat: "",
                    perihal: "",
                    tanggalKirim: "",
                    kodeBerkas: "",
                    tujuanSurat: "",
                    file: null,
                    filePath: null,
                    fileUrl: null,
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
        const data = new FormData();
        data.append('file', this.state.file);
        data.append('asalSurat', this.state.asalSurat);
        data.append('nomorSurat', this.state.nomorSurat);
        data.append('tanggalSurat', this.state.tanggalSurat);
        data.append('perihal', this.state.perihal);
        data.append('tujuanSurat', this.state.tujuanSurat);
        data.append('tanggalKirim', this.state.tanggalKirim);
        data.append('kodeBerkas', this.state.kodeBerkas);
        data.append('rinku', this.state.url);
        // console.log(data);
        axios
            .post(`/kanrisha/keluar/deeta/update`, data)
            .then(response => {
                this.setState({
                    data: response.data.data.data,
                    tujuanSurat: "",
                    nomorSurat: "",
                    tanggalSurat: "",
                    perihal: "",
                    tanggalKirim: "",
                    kodeBerkas: "",
                    file: null,
                    filePath: null,
                    fileUrl: null,
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

    getData() {
        this.setState({
            loading: true
        });
        axios
            .get("/kanrisha/keluar/deeta")
            .then(response => {
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
                        'next #detail1' : 'Untuk Menghapus Data, Tekan Hapus Berikut'
                    },
                    {
                        'next #downloadButton' : "Apabila Anda Ada Melakukan Upload Data Ketika Menambahkan Data Baru <br> Atau Mengubah Data Baru, Maka Akan Muncul <br> Tombol <button class='mr-2 mb-2 btn btn-outline-secondary'>Download</button> Yang Dapat Digunakan Untuk Mendownload/Mengunduh Data"
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
                swal("Error!", "Terdapat Masalah, Silahkan Hubungi Admin!", "error");
                this.setState({loading: false});
            });
    }

    getSubbid() {
        axios.get("/kanrisha/keluar/deeta/create").then((response) => {
            this.setState({
                subbid: response.data.data,
                asalSurat: response.data.data[0].rinku,
            });
            // console.log(this.state.asalSurat);
        });
    }

    handlePageChange(pageNumber) {
        this.setState({
            loading: true
        });
        axios
            .get('/kanrisha/keluar/deeta?page='+pageNumber)
            .then(response => {
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
                swal("Error!", "Terdapat Masalah, Silahkan Hubungi Admin!", "error");
                this.setState({loading: false});
            });
    }

    testData() {
        axios
            .get("/kanrisha/masuk/deeta")
            .then(response => console.log(response.data.data));
    }

    componentDidMount() {
        this.getData();
        this.getSubbid();
    }

    componentDidUpdate() {
        // this.getTag();
    }

    renderData() {
        return !this.state.data.length ? <tr><td colSpan="6" className="text-center">Data Tidak Ditemukan</td></tr> :
            this.state.data.map(data => (
                <tr key={data.rinku}>
                    <th scope="row">
                        <Highlighter
                            highlightClassName="YourHighlightClass"
                            searchWords={[this.state.cari]}
                            autoEscape={true}
                            textToHighlight={data.nomor}
                        />
                    </th>
                    <td>{data.asalSuratText}</td>
                    <td>
                        <Highlighter
                            highlightClassName="YourHighlightClass"
                            searchWords={[this.state.cari]}
                            autoEscape={true}
                            textToHighlight={data.nomorSurat}
                        />
                        <br />
                        <small>{data.tanggalSuratText}</small>
                    </td>
                    <td>
                        <Highlighter
                            highlightClassName="YourHighlightClass"
                            searchWords={[this.state.cari]}
                            autoEscape={true}
                            textToHighlight={data.potonganPerihal}
                        />
                    </td>
                    <td>
                        <Highlighter
                            highlightClassName="YourHighlightClass"
                            searchWords={[this.state.cari]}
                            autoEscape={true}
                            textToHighlight={data.tujuanSurat}
                        />
                        <br />
                        <small>{data.tanggalKirimText}</small>
                    </td>
                    <td id="downloadButton">
                        <div className="text-center">
                            {data.file ? (
                                <a href={`/zaFail/${data.file}`} className="mr-2 mb-2 btn btn-outline-secondary">Download</a>
                            ) : (
                                <span></span>
                            )}
                            <button data-target="#detailModal" data-toggle="modal" className="mr-2 mb-2 btn btn-outline-info" type="button" onClick={this.handleEditButton.bind(this, data.rinku)} id={'detail'+data.nomor}>Detail</button>
                        </div>
                        <div className="text-center">
                            <button data-target="#editModal" data-toggle="modal" className="mr-2 mb-2 btn btn-outline-warning" type="button" onClick={this.handleEditButton.bind(this, data.rinku)} id={'ubah'+data.nomor}>Ubah</button>
                            <button className="mr-2 mb-2 btn btn-outline-danger" type="button" onClick={this.handleDeleteButton.bind(this, data.rinku)} id={'hapus'+data.nomor}>Hapus</button>
                        </div>
                    </td>
                </tr>
            ));
    }

    renderSelect() {
        return this.state.subbid.map((data) => (
            <option value={data.rinku} key={data.rinku}>
                {data.asm}
            </option>
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
                            Tambah Surat Keluar Baru
                        </h4>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                            <div className="col-sm-12">
                                <table className="masariuman_tableLabelTanggal">
                                    <tbody>
                                        <tr>
                                            <td>
                                                Asal Surat :
                                            </td>
                                            <td className="form-group">
                                                <select
                                                    value={this.state.asalSurat}
                                                    onChange={this.handleChangeAsalSurat}
                                                    className="form-control"
                                                >
                                                    {this.renderSelect()}
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <input
                                        onChange={this.handleChangeNomorSurat}
                                        value={this.state.nomorSurat}
                                        title="Nomor Surat"
                                        placeholder="Nomor Surat.."
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <table className="masariuman_tableLabelTanggal">
                                    <tbody>
                                        <tr>
                                            <td>
                                                Tanggal Surat :
                                            </td>
                                            <td className="form-group">
                                                <input
                                                    onChange={this.handleChangeTanggalSurat}
                                                    value={this.state.tanggalSurat}
                                                    title="Tanggal Surat"
                                                    placeholder="Tanggal Surat.."
                                                    type="date"
                                                    className="form-control"
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <textarea
                                        onChange={this.handleChangePerihal}
                                        value={this.state.perihal}
                                        title="Perihal Surat"
                                        placeholder="Perihal Surat.."
                                        className="form-control"
                                        rows="3" />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <table className="masariuman_tableLabelTanggal">
                                    <tbody>
                                        <tr>
                                            <td>
                                                Tanggal Surat Dikirim :
                                            </td>
                                            <td className="form-group">
                                                <input
                                                    onChange={this.handleChangeTanggalKirim}
                                                    value={this.state.tanggalKirim}
                                                    title="Tanggal Surat"
                                                    placeholder="Tanggal Surat.."
                                                    type="date"
                                                    className="form-control"
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <input
                                        onChange={this.handleChangeTujuanSurat}
                                        value={this.state.tujuanSurat}
                                        title="Tujuan Surat"
                                        placeholder="Tujuan Surat.."
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <input
                                        onChange={this.handleChangeKodeBerkas}
                                        value={this.state.kodeBerkas}
                                        title="Kode Berkas"
                                        placeholder="Kode Berkas.."
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <input
                                        onChange={this.handleChangeFile}
                                        title="File"
                                        placeholder="File.."
                                        type="file"
                                        className="form-control masariuman_displayNone"
                                        ref="fileUploader"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <table className="masariuman_tableFile">
                                    <tbody>
                                        <tr>
                                            <td className="masariuman_width110px">
                                                <button className="mr-2 mb-2 btn btn-primary" type="button" onClick={this.handleButtonFile} >Upload File</button>
                                            </td>
                                            <td className="form-group">
                                                <a target="_blank" href={this.state.fileUrl}>{this.state.filePath}</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group text-center">
                                    <button className="mr-2 mb-2 btn btn-primary" data-target="#onboardingWideFormModal" data-toggle="modal" type="submit">Tambah Surat Keluar Baru</button>
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
                        <div className="onboarding-content with-gradient masariuman_width100percent">
                        <h4 className="onboarding-title">
                            Ubah Data Surat Keluar
                        </h4>
                        <form onSubmit={this.handleEditSubmit}>
                            <div className="row">
                            <div className="col-sm-12">
                                <table className="masariuman_tableLabelTanggal">
                                    <tbody>
                                        <tr>
                                            <td>
                                                Asal Surat :
                                            </td>
                                            <td className="form-group">
                                                <select
                                                    value={this.state.asalSurat}
                                                    onChange={this.handleChangeAsalSurat}
                                                    className="form-control"
                                                >
                                                    {this.renderSelect()}
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <input
                                        onChange={this.handleChangeNomorSurat}
                                        value={this.state.nomorSurat}
                                        title="Nomor Surat"
                                        placeholder="Nomor Surat.."
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <table className="masariuman_tableLabelTanggal">
                                    <tbody>
                                        <tr>
                                            <td>
                                                Tanggal Surat :
                                            </td>
                                            <td className="form-group">
                                                <input
                                                    onChange={this.handleChangeTanggalSurat}
                                                    value={this.state.tanggalSurat}
                                                    title="Tanggal Surat"
                                                    placeholder="Tanggal Surat.."
                                                    type="date"
                                                    className="form-control"
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <textarea
                                        onChange={this.handleChangePerihal}
                                        value={this.state.perihal}
                                        title="Perihal Surat"
                                        placeholder="Perihal Surat.."
                                        className="form-control"
                                        rows="3" />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <table className="masariuman_tableLabelTanggal">
                                    <tbody>
                                        <tr>
                                            <td>
                                                Tanggal Surat Dikirim :
                                            </td>
                                            <td className="form-group">
                                                <input
                                                    onChange={this.handleChangeTanggalKirim}
                                                    value={this.state.tanggalKirim}
                                                    title="Tanggal Surat"
                                                    placeholder="Tanggal Surat.."
                                                    type="date"
                                                    className="form-control"
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <input
                                        onChange={this.handleChangeTujuanSurat}
                                        value={this.state.tujuanSurat}
                                        title="Tujuan Surat"
                                        placeholder="Tujuan Surat.."
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <input
                                        onChange={this.handleChangeKodeBerkas}
                                        value={this.state.kodeBerkas}
                                        title="Kode Berkas"
                                        placeholder="Kode Berkas.."
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <input
                                        onChange={this.handleChangeFile}
                                        title="File"
                                        placeholder="File.."
                                        type="file"
                                        className="form-control masariuman_displayNone"
                                        ref="fileUploader"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <table className="masariuman_tableFile">
                                    <tbody>
                                        <tr>
                                            <td className="masariuman_width110px">
                                                <button className="mr-2 mb-2 btn btn-primary" type="button" onClick={this.handleButtonFile} >Upload File</button>
                                            </td>
                                            <td className="form-group">
                                                <a target="_blank" href={this.state.fileUrl}>{this.state.filePath}</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group text-center">
                                    <button className="mr-2 mb-2 btn btn-warning" data-target="#onboardingWideFormModal" data-toggle="modal" type="submit">Ubah Surat Keluar Baru</button>
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

    modalDetail() {
        return (
            <div aria-hidden="true" className="onboarding-modal modal fade animated" id="detailModal" role="dialog" tabIndex="-1">
                <div className="modal-dialog modal-lg modal-centered" role="document">
                    <div className="modal-content">
                    <button aria-label="Close" className="close" data-dismiss="modal" type="button"><span className="close-label">Tutup</span><span className="os-icon os-icon-close"></span></button>
                    <div className="onboarding-side-by-side">
                        <div className="onboarding-media">
                        <img alt="" src="/iconModal/tagEdit.png" width="200px" />
                        </div>
                        <div className="onboarding-content with-gradient masariuman_width100percent">
                        <h4 className="onboarding-title text-center">
                            Detail Data
                        </h4>
                            <div className="row">
                                <div className="col-sm-12 table-responsive">
                                <table className="masariuman_tableLabelTanggal table table-striped">
                                        <tbody>
                                            <tr>
                                                <td className="masariuman_width200px">
                                                    Asal Surat
                                                </td>
                                                <td className="titikDua">
                                                    :
                                                </td>
                                                <td className="form-group masariuman_tdwarp">
                                                    {this.state.asalSuratName}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Nomor Surat
                                                </td>
                                                <td>
                                                    :
                                                </td>
                                                <td className="form-group masariuman_tdwarp">
                                                    {this.state.nomorSurat}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Tanggal Surat
                                                </td>
                                                <td>
                                                    :
                                                </td>
                                                <td className="form-group masariuman_tdwarp">
                                                    {this.state.tanggalSurat}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Perihal Surat
                                                </td>
                                                <td>
                                                    :
                                                </td>
                                                <td className="form-group masariuman_tdwarp">
                                                    {this.state.perihal}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Tujuan Surat
                                                </td>
                                                <td>
                                                    :
                                                </td>
                                                <td className="form-group masariuman_tdwarp">
                                                    {this.state.tujuanSurat}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Tanggal Kirim Surat
                                                </td>
                                                <td>
                                                    :
                                                </td>
                                                <td className="form-group masariuman_tdwarp">
                                                    {this.state.tanggalKirim}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Kode Berkas
                                                </td>
                                                <td>
                                                    :
                                                </td>
                                                <td className="form-group masariuman_tdwarp">
                                                    {this.state.kodeBerkas}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    {this.state.filePath ? (
                                        <a href={`/zaFail/${this.state.filePath}`} className="mr-2 mb-2 btn btn-outline-secondary masariuman_width100percent">Download File</a>
                                    ) : (
                                        <span></span>
                                    )}
                                </div>
                            </div>
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
                            <span className="masariuman-bold">Surat Keluar</span> <br/>
                            <small>Surat Keluar Management</small>
                        </div>
                    </div>
                    <div className="top-menu-controls">
                        <button className="mr-2 mb-2 btn btn-outline-primary" type="button" id="petunjuk"><i className="batch-icon-bulb-2"></i> PETUNJUK <i className="batch-icon-bulb"></i></button>
                    </div>
                </div>
                <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a>Surat Keluar</a>
                    </li>
                    <li className="breadcrumb-item">
                        <span>Surat Keluar Management</span>
                    </li>
                </ul>

                {/* content */}
                <div className="content-i masariuman-minheight100vh">
                        <div className="content-box">
                            <div className="element-wrapper">
                                {/* content here */}
                                <div className="element-box">
                                    <h5 className="form-header">
                                    Surat Keluar List
                                    </h5>
                                    <div className="form-desc">
                                        Manajemen Surat Keluar Data
                                    </div>
                                    <div>
                                        <button className="mr-2 mb-2 btn btn-primary" data-target="#tambahModal" data-toggle="modal" type="button" id="buttonTambahModal" onClick={this.handleTambahButton}>Tambah Surat Keluar Baru</button>
                                        <div className="col-sm-4 float-right" id="cari">
                                            <input type="text" className="form-control" onChange={this.handleChangeCari}
                                                value={this.state.cari} placeholder="Cari Surat Keluar..."></input>
                                        </div>
                                    </div>
                                    <div className="table-responsive" id="ruanganTable">
                                        <table id="tabeldata" width="100%" className="table table-striped table-lightfont">
                                            <thead>
                                                <tr>
                                                    <th className="width50px text-center">NO</th>
                                                    <th className="text-center">Asal Surat</th>
                                                    <th className="text-center">Nomor/Tanggal Surat</th>
                                                    <th className="text-center">Perihal</th>
                                                    <th className="text-center">Tujuan/Tanggal Dikirim</th>
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
                {this.modalDetail()}
            </div>
        );
    }
}

export default Keluar;
