import React, { Component } from "react";
import Footer from "../../warudo/Footer";
import DarkMode from "../../warudo/DarkMode";
import swal from 'sweetalert';

import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles
import 'react-summernote/lang/summernote-id-ID'; // you can import any other locale

import 'bootstrap/js/modal';
import 'bootstrap/js/dropdown';
import 'bootstrap/js/tooltip';

class NovelEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            parents: [],
            parenturl: "",
            parentcontent: "",
            thumb: "",
            thumbDesc: "",
            url: "",
        };
        this.onImageUpload = this.onImageUpload.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleChangeParent = this.handleChangeParent.bind(this);
        this.handleChangethumb = this.handleChangethumb.bind(this);
        this.handleChangethumbDesc = this.handleChangethumbDesc.bind(this);
        this.renderSelect = this.renderSelect.bind(this);
    }

    handleChangeTitle(e) {
        this.setState({
            title: e.target.value,
        });
    }

    handleChangeContent(e) {
        this.setState({
            content: e,
        });
    }

    handleChangeParent(e) {
        this.setState({
            parenturl: e.target.value,
        });
    }

    handleChangethumb(e) {
        this.setState({
            thumb: e.target.value,
        });
    }

    handleChangethumbDesc(e) {
        this.setState({
            thumbDesc: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        axios
            .put(`/child/${this.props.match.params.url}`, {
                title: this.state.title,
                content: this.state.content,
                parent: this.state.parenturl,
                thumb: this.state.thumb,
                thumbDesc: this.state.thumbDesc,
            })
            .then((response) => {
                swal("Sukses!", "Data Berhasil Diubah!", "success");
                this.props.history.push("/translation/posts");
            })
            .catch((error) => {
                console.log(error.message);
            });
        // console.log(this.state);
        // console.log(this.fileInput);
    }

    onImageUpload(images, insertImage) {
        console.log("onImageUpload", images);
        /* FileList does not support ordinary array methods */
        for (let i = 0; i < images.length; i++) {
            /* Stores as bas64enc string in the text.
             * Should potentially be stored separately and include just the url
             */
            const reader = new FileReader();

            reader.onloadend = () => {
                insertImage(reader.result);
            };

            reader.readAsDataURL(images[i]);
        }
    }

    getParent() {
        axios
            .get(`/child/${this.props.match.params.url}/edit`)
            .then((response) => {
                // console.log(response);
                this.setState({
                    parents: response.data.data.parents.novel_parent,
                    parenturl: response.data.data.parent.url,
                    parentcontent: response.data.data.parent.title,
                    title: response.data.data.child.title,
                    content: response.data.data.child.content,
                    thumb: response.data.data.child.thumbnail,
                    thumbDesc: response.data.data.child.thumbnail_sidebar,
                    url: response.data.data.child.url,
                });
            });
    }

    componentDidMount() {
        this.getParent();
    }

    renderSelect() {
        return this.state.parents.map((par) => {
                return (
                    <option value={par.url} key={par.url}>
                        {par.title}
                    </option>
                );
        });
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
                            <small>Ubah posts</small>
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
                        <span>Ubah posts</span>
                    </li>
                </ul>

                {/* content */}
                <div className="content-i masariuman-minheight100vh">
                    <div className="content-box">
                        <div className="element-wrapper">
                            {/* content here */}
                            <div className="element-box">
                                <h5 className="form-header">
                                    Novel
                                </h5>
                                <div className="form-desc">
                                    Ubah posts
                                </div>
                                <form>
                                    <div className="form-group">
                                        <div>
                                            <span className="masariuman_parents-line">
                                                Novel Parent :
                                            </span>
                                            <select
                                                onChange={this.handleChangeParent}
                                                className="form-control masariuman_parents"
                                                value={this.state.parenturl}
                                            >
                                                {this.renderSelect()}
                                            </select>
                                        </div>
                                        <input
                                            onChange={this.handleChangeTitle}
                                            value={this.state.title}
                                            placeholder="Title"
                                            type="text"
                                            className="mb-2 form-control-lg form-control"
                                        />
                                        <ReactSummernote
                                            value={this.state.content}
                                            options={{
                                                lang: "ru-RU",
                                                height: 350,
                                                dialogsInBody: true,
                                                toolbar: [
                                                    ["style", ["style"]],
                                                    [
                                                        "font",
                                                        [
                                                            "bold",
                                                            "underline",
                                                            "clear",
                                                            "strikethrough",
                                                            "superscript",
                                                            "subscript",
                                                            "clear",
                                                        ],
                                                    ],
                                                    [
                                                        "fontname",
                                                        [
                                                            "fontname",
                                                            "fontsize",
                                                            "color",
                                                        ],
                                                    ],
                                                    [
                                                        "para",
                                                        [
                                                            "ul",
                                                            "ol",
                                                            "paragraph",
                                                            "height",
                                                        ],
                                                    ],
                                                    ["table", ["table"]],
                                                    [
                                                        "add",
                                                        [
                                                            "addRowDown",
                                                            "addRowUp",
                                                            "addColLeft",
                                                            "addColRight",
                                                        ],
                                                    ],
                                                    [
                                                        "delete",
                                                        [
                                                            "deleteRow",
                                                            "deleteCol",
                                                            "deleteTable",
                                                        ],
                                                    ],
                                                    [
                                                        "insert",
                                                        [
                                                            "link",
                                                            "unlink",
                                                            "picture",
                                                            "removeMedia",
                                                            "video",
                                                            "hr",
                                                        ],
                                                        [
                                                            "image",
                                                            [
                                                                "resizeFull",
                                                                "resizeHalf",
                                                                "resizeQuarter",
                                                                "resizeNone",
                                                            ],
                                                        ],
                                                    ],
                                                    [
                                                        "view",
                                                        ["fullscreen", "codeview"],
                                                    ],
                                                ],
                                            }}
                                            onChange={this.handleChangeContent}
                                            onImageUpload={this.onImageUpload}
                                        />
                                        <div className="masariuman_thumb">
                                            <input
                                                onChange={this.handleChangethumb}
                                                value={this.state.thumb}
                                                type="text"
                                                placeholder="Thumbnail Home"
                                                className="form-control-lg form-control masariuman_thumbdesc"
                                            />
                                            <input
                                                onChange={this.handleChangethumbDesc}
                                                type="text"
                                                value={this.state.thumbDesc}
                                                placeholder="Thumbnail Sidebar"
                                                className="form-control-lg form-control masariuman_desc"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={this.handleSubmit}
                                        className="btn-square btn-hover-shine btn btn-warning form-control form-control-lg masariuman_baton"
                                    >
                                        <a className="pe-7s-pen"></a> Ubah Chapter{" "}
                                        <a className="pe-7s-pen"></a>
                                    </button>
                                </form>
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

export default NovelEdit;
