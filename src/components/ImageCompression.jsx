import React, { createRef } from "react";
import ReactDOM from "react-dom";

import brokenImage from "./images/broken.png";

import imageCompression from "browser-image-compression";

import "./ImageCompressionStyle.css";

class ImageCompression extends React.Component {
  constructor() {
    super();
    this.fileElem = createRef();
    this.filename = createRef();
    this.image = createRef();
    this.compress = createRef();
    this.download = createRef();
    this.fileSelect = this.fileSelect.bind(this);
    this.compressClicked = false;
    // this.fileElem = this.fileElem.bind(this);

    this.state = {
      fileSelect: false,
      broken: true,
      toggle: true,
      compressBtn: false,
      downloadLink: "",
      fileName: "",
      compressClicked: false,
    };
  }

  fileSelect(e) {
    e.preventDefault();
    this.fileElem.current.click();
    // console.log(this.fileElem.current.value);
  }

  render() {
    return (
      <div className="container">
        <div className="box">
          <div className="left-box">
            <h1 className="heading">Image Compressor</h1>
            <span>
              <i>compress the image using 3 steps.</i>
            </span>

            <div className="list">
              <ol>
                <li>Choose an image.</li>
                <li>Press Compress.</li>
                <li>Download the Image.</li>
              </ol>
            </div>

            <div className="file-container">
              <input
                type="file"
                id="fileElem"
                accept="image/*"
                className="fileElem"
                ref={this.fileElem}
                onChange={(e) => {
                  this.setState({
                    fileSelect: false,
                    broken: true,
                    toggle: true,
                    compressBtn: false,
                    downloadLink: "",
                    fileName: "",
                    compressClicked: false,
                  });
                  let path = URL.createObjectURL(e.target.files[0]);
                  this.setState({
                    fileName: e.target.files[0].name,
                    imageFile: e.target.files[0],
                    imagePath: path,
                    broken: false,
                    compressBtn: true,
                    imageSize: e.target.files[0].size,
                  });
                  let compressBtn = true;
                  this.filename.current.value = e.target.files[0].name;
                  this.image.current.src = path;
                  this.filename.current.disabled = true;
                  if (this.state.compressBtn || compressBtn) {
                    this.compress.current.style.display = "block";
                    this.download.current.style.display = "none";
                    this.image.current.style = "filter: blur(0px); opacity: ;";
                  } else {
                    this.download.current.style.display = "none";
                  }

                  // URL.revokeObjectURL(path);
                }}
              />
              <input
                type="text"
                name="filename"
                id="filename"
                placeholder="No files are Selected"
                ref={this.filename}
              />
              <a
                href="#"
                onClick={this.fileSelect}
                id="fileSelect"
                className="fileSelect"
              >
                Choose a File
              </a>
            </div>
            <div className="compress">
              <a
                className="compressBtn"
                ref={this.compress}
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({ compressClicked: true, toggle: false });
                  this.compressClicked = true;
                  if (this.compressClicked) {
                    this.download.current.style.display = "block";
                    this.image.current.style =
                      "filter: blur(1px); opacity: 0.5;";
                  } else {
                    this.download.current.style.display = "none";
                    this.image.current.style = "filter: blur(0px); opacity: ;";
                  }

                  let targ = e.target;
                  console.log(this.state);
                  const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 500,
                    useWebWorker: true,
                  };

                  if (options.maxSizeMB >= this.state.imageSize / 1024) {
                    alert("Image is too small.");
                  } else {
                    let output;
                    // console.log(this.state.imageFile);
                    imageCompression(this.state.imageFile, options).then(
                      (x) => {
                        output = x;
                        const downloadLink = URL.createObjectURL(output);
                        console.log(downloadLink);
                        this.setState({ downloadLink: downloadLink });
                        this.image.current.src = downloadLink;
                        targ.href = downloadLink;
                      }
                    );
                  }
                }}
                id="compressBtn"
              >
                <span>Compress</span>
              </a>
            </div>
          </div>
          <div className="right-box">
            <div className="download">
              <a
                href={this.state.downloadLink}
                download={this.state.fileName}
                on
                onClick={(e) => {
                  // e.preventDefault();
                }}
                className="downloadBtn"
                id="downloadBtn"
                ref={this.download}
              >
                Download
              </a>
            </div>
            <img
              ref={this.image}
              onChange={(e) => {}}
              src={brokenImage}
              className="image"
              id="imageHolder"
              alt=""
              width="60"
              onClick={(e) => {
                // URL.revokeObjectURL(this.state.imagePath);
                console.log(this.state);
                if (!this.state.broken && this.state.toggle) {
                  e.target.classList.toggle("active");
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ImageCompression;
