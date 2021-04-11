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

class TocNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            genres: [],
            tags: [],
            thumb: "",
            thumbDesc: "",
        };
        this.onImageUpload = this.onImageUpload.bind(this);
        this.removeTag = this.removeTag.bind(this);
        this.inputKeyDown = this.inputKeyDown.bind(this);
        this.removeGenre = this.removeGenre.bind(this);
        this.inputKeyDownGenre = this.inputKeyDownGenre.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        // this.handleChangethumb = this.handleChangethumb.bind(this);
        // this.handleChangethumbDesc = this.handleChangethumbDesc.bind(this);
        // this.fileInput = React.createRef();
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

    // handleChangethumb(e) {
    //     this.setState({
    //         thumb: this.fileInput.current.files[0].name,
    //     });
    // }

    // handleChangethumbDesc(e) {
    //     this.setState({
    //         thumbDesc: e.target.value,
    //     });
    // }

    handleSubmit(e) {
        e.preventDefault();
        axios
            .post("/parent", {
                title: this.state.title,
                content: this.state.content,
                genres: this.state.genres,
                tags: this.state.tags,
                thumb: this.state.thumb,
                thumbDesc: this.state.thumbDesc,
            })
            .then((response) => {
                swal("Sukses!", "Data Baru Berhasil Ditambahkan!", "success");
                this.props.history.push("/translation/toc");
            })
            .catch((error) => {
                console.log(error.message);
            });
        // console.log(this.state);
        // console.log(this.fileInput);
    }

    removeGenre(i) {
        const newGenres = [...this.state.genres];
        newGenres.splice(i, 1);
        this.setState({ genres: newGenres });
    }

    inputKeyDownGenre(e) {
        const val = e.target.value;
        if (e.key === "Enter" && val) {
            if (
                this.state.genres.find(
                    (genre) => genre.toLowerCase() === val.toLowerCase()
                )
            ) {
                return;
            }
            this.setState({ genres: [...this.state.genres, val] });
            this.genreInput.value = null;
        } else if (e.key === "Backspace" && !val) {
            this.removeGenre(this.state.genres.length - 1);
        }
    }

    removeTag(i) {
        const newTags = [...this.state.tags];
        newTags.splice(i, 1);
        this.setState({ tags: newTags });
    }

    inputKeyDown(e) {
        const val = e.target.value;
        if (e.key === "Enter" && val) {
            if (
                this.state.tags.find(
                    (tag) => tag.toLowerCase() === val.toLowerCase()
                )
            ) {
                return;
            }
            this.setState({ tags: [...this.state.tags, val] });
            this.tagInput.value = null;
        } else if (e.key === "Backspace" && !val) {
            this.removeTag(this.state.tags.length - 1);
        }
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

    render() {
        return (
            this.state.loading === true ? <Loading /> :
            <div className="content-w">
                {/* title content */}
                <div className="top-bar color-scheme-transparent masariuman-height103px">
                    <div className="top-menu-controls masariuman-marginleft30px">
                        <div className="icon-w top-icon masariuman-titlecontent">
                        <div className="os-icon os-icon-book-open"></div>
                        </div>
                        <div className="masariuman-textleft">
                            <span className="masariuman-bold">Table of Content</span> <br/>
                            <small>New Novel</small>
                        </div>
                    </div>
                    <div className="top-menu-controls">
                        <button className="mr-2 mb-2 btn btn-outline-primary" type="button" id="petunjuk"><i className="batch-icon-bulb-2"></i> PETUNJUK <i className="batch-icon-bulb"></i></button>
                    </div>
                </div>
                <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a>Table of Content</a>
                    </li>
                    <li className="breadcrumb-item">
                        <span>New Novel</span>
                    </li>
                </ul>

                {/* content */}
                <div className="content-i masariuman-minheight100vh">
                    <div className="content-box">
                        <div className="element-wrapper">
                            {/* content here */}
                            <div className="element-box">
                                <h5 className="form-header">
                                    New Table of Content
                                </h5>
                                <div className="form-desc">
                                    New Novel
                                </div>
                                <form>
                                    <div className="form-group">
                                        <input
                                            onChange={this.handleChangeTitle}
                                            value={this.state.title}
                                            placeholder="Title"
                                            type="text"
                                            className="mb-2 form-control-lg form-control"
                                        />
                                        <ReactSummernote
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
                                                            "italic",
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
                                                    ['help', ['help']],
                                                ],
                                            }}
                                            onChange={this.handleChangeContent}
                                            onImageUpload={this.onImageUpload}
                                        />
                                        <div className="masariuman_input-tag">
                                            <ul className="masariuman_input-tag__tags">
                                                {this.state.tags.map((tag, i) => (
                                                    <li key={tag}>
                                                        {tag}
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                this.removeTag(i);
                                                            }}
                                                        >
                                                            +
                                                        </button>
                                                    </li>
                                                ))}
                                                <li className="masariuman_input-tag__tags__input">
                                                    <input
                                                        className="form-control masariuman_boxShadowNone"
                                                        type="text"
                                                        placeholder="Tags"
                                                        onKeyDown={this.inputKeyDown}
                                                        ref={(c) => {
                                                            this.tagInput = c;
                                                        }}
                                                    />
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="masariuman_input-tag">
                                            <ul className="masariuman_input-tag__tags">
                                                {this.state.genres.map((genre, i) => (
                                                    <li key={genre}>
                                                        {genre}
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                this.removeGenre(i);
                                                            }}
                                                        >
                                                            +
                                                        </button>
                                                    </li>
                                                ))}
                                                <li className="masariuman_input-tag__tags__input">
                                                    <input
                                                        className="form-control masariuman_boxShadowNone"
                                                        type="text"
                                                        placeholder="Genres"
                                                        onKeyDown={
                                                            this.inputKeyDownGenre
                                                        }
                                                        ref={(c) => {
                                                            this.genreInput = c;
                                                        }}
                                                    />
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={this.handleSubmit}
                                        className="btn-square btn-hover-shine btn btn-primary form-control form-control-lg baton"
                                    >
                                        <a className="pe-7s-plus"></a> Novel Baru{" "}
                                        <a className="pe-7s-plus"></a>
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

export default TocNew;
