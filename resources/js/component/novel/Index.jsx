import React, { Component } from "react";
import Footer from "../../warudo/Footer";
import DarkMode from "../../warudo/DarkMode";
import { Link } from "react-router-dom";
import Loading from "../../warudo/Loading";
import swal from 'sweetalert';
import Pagination from "react-js-pagination";


class Novel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            novel: [],
            cari: "",
            loading: true,
        };
        this.renderNovel = this.renderNovel.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleChangeCari = this.handleChangeCari.bind(this);
    }

    handleChangeCari(e) {
        this.setState({
            cari: e.target.value
        });
        axios
            .post(`/child/search`, {
                cari: e.target.value
            })
            .then(response => {
                // console.log(response.data);
                this.setState({
                    novel: response.data.data.data,
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
            .get(`/child/${e}`)
            .then(response => {
                swal({
                    title: `Yakin ingin menghapus ${response.data.data.title}`,
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
                            .delete(`/child/${e}`, {
                                url: this.state.url
                            })
                            .then(response => {
                                this.setState({
                                    novel: response.data.data.data,
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

    getNovel() {
        this.setState({
            loading: true
        });
        axios
            .get("/child")
            .then(response => {
                // console.log(response);
                this.setState({
                    novel: response.data.data.data,
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

    handlePageChange(pageNumber) {
        this.setState({
            loading: true
        });
        axios
            .get('/child?page='+pageNumber)
            .then(response => {
                this.setState({
                    novel: response.data.data.data,
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

    componentDidMount() {
        this.getNovel();
    }

    componentDidUpdate() {
        // this.getGenre();
    }

    renderNovel() {
        return !this.state.novel.length ? <tr><td colSpan="3" className="text-center">Data Tidak Ditemukan</td></tr> :
            this.state.novel.map(novel => (
                <tr key={novel.id}>
                    <th scope="row">{novel.nomor}</th>
                    <td>{novel.title}</td>
                    <td>
                        <Link
                            to={`/translation/posts/${novel.url}/edit`}
                            className="mb-2 mr-2 border-0 btn-transition btn btn-shadow btn-outline-warning"
                        >
                            <span className="pe-7s-pen"> </span> Edit
                        </Link>
                        <button className="mb-2 mr-2 border-0 btn-transition btn btn-shadow btn-outline-danger" type="button" onClick={this.handleDeleteButton.bind(this, novel.url)}>Delete</button>
                    </td>
                </tr>
            ));
    }

    render() {
        return (
            this.state.loading === true ? <Loading /> :
            <div className="content-w">
                {/* title content */}
                <div className="top-bar color-scheme-transparent masariuman-height103px">
                    <div className="top-menu-controls masariuman-marginleft30px">
                        <div className="icon-w top-icon masariuman-titlecontent">
                        <div className="os-icon os-icon-pencil-1"></div>
                        </div>
                        <div className="masariuman-textleft">
                            <span className="masariuman-bold">Novel</span> <br/>
                            <small>Translation Posts Management</small>
                        </div>
                    </div>
                    <div className="top-menu-controls">
                        <button className="mr-2 mb-2 btn btn-outline-primary" type="button" id="petunjuk"><i className="batch-icon-bulb-2"></i> PETUNJUK <i className="batch-icon-bulb"></i></button>
                    </div>
                </div>
                <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a>Novel</a>
                    </li>
                    <li className="breadcrumb-item">
                        <span>Translation Posts Management</span>
                    </li>
                </ul>

                {/* content */}
                <div className="content-i masariuman-minheight100vh">
                        <div className="content-box">
                            <div className="element-wrapper">
                                {/* content here */}
                                <div className="element-box">
                                    <h5 className="form-header">
                                        Translation Posts List
                                    </h5>
                                    <div className="form-desc">
                                        Manajemen Posts
                                    </div>
                                    <div>
                                        <Link
                                            to={`/translation/posts/new`}
                                            className="mb-2 mr-2 btn btn-primary"
                                        >
                                            <span className="pe-7s-plus"> </span> Tambah Post Baru
                                        </Link>
                                        <div className="col-sm-4 float-right">
                                            <input type="text" className="form-control" onChange={this.handleChangeCari}
                                                value={this.state.cari} placeholder="Cari Judul..."></input>
                                        </div>
                                    </div>
                                    <div className="table-responsive" id="ruanganTable">
                                        <table id="tabeldata" width="100%" className="table table-striped table-lightfont">
                                            <thead>
                                                <tr>
                                                    <th className="width50px">NO</th>
                                                    <th>Title</th>
                                                    <th className="width250px">ACTION</th>
                                                </tr>
                                            </thead>
                                            <tbody>{this.renderNovel()}</tbody>
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
            </div>
        );
    }
}

export default Novel;
