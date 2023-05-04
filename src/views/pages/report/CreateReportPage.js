import React, { useEffect, useState } from "react";
import { Input, Upload, Button, message } from "antd";
import TextEditor from "../../components/TextEditor";
import TicketService from "../../../services/TicketService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import Utils from "../../../common/utils/Utils";
import IconFile from "../../../assets/images/file_icons/icons8-file.svg";

export default function CreateReportPage(props) {
  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => {
    return state.AuthReducer.user;
  });

  useEffect(() => {
    if (params.ticketId != null && params.ticketId !== undefined) {
      setEnableEdit(true);
      setIsCreate(true);
    } else if (params.reportId != null && params.reportId !== undefined) {
      setIsCreate(false);
      TicketService.getReport(params.reportId, user.token).then((res) => {
        var response = res.data;
        if (response != null && response.payload != null) {
          var report = response.payload;
          setTitle(report.title);
          setContent(report.content);
          if (report.reportFiles != null) {
            var reportFilesModel = report.reportFiles.map((file) => {
              return {
                id: file.id,
                name: file.displayName,
                fileName: file.fileName,
                size: file.size,
              };
            });
            setFilesDisplay(reportFilesModel);
          }
          setEnableEdit(false);
        }
      });
    }
  }, []);

  const [content, setContent] = useState();
  const [title, setTitle] = useState();
  const [enableEdit, setEnableEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  const [filesDisplay, setFilesDisplay] = useState([]);
  const [filesUpload, setFilesUpload] = useState([]);

  const handleFileChange = (e) => {
    setFilesUpload([...e.target.files]);
    console.log(filesUpload);
  };

  const removeUploadFile = (file) => {
    var index = filesUpload.indexOf(file);
    console.log(filesUpload);
    console.log("remove index: " + index);
    if (index > -1) {
      var newList = [];

      for (var i = 0; i < filesUpload.length; i++) {
        if (i != index) {
          newList.push(filesUpload[i]);
        }
      }
      setFilesUpload(newList);
    }
  };

  const removeDisplayFile = (file) => {
    var index = filesDisplay.indexOf(file);
    if (index > -1) {
      var newList = [];

      for (var i = 0; i < filesDisplay.length; i++) {
        if (i != index) {
          newList.push(filesDisplay[i]);
        }
      }
      setFilesDisplay(newList);
    }
  };

  const handleDownloadFile = (fileName, savedFileName) => {
    TicketService.downloadFile(fileName, savedFileName, user.token);
  };

  const handleUploadClick = () => {
    if (!isCreate) return;

    var formData = new FormData();
    formData.append("ticketId", params.ticketId);
    formData.append("title", title);
    formData.append("content", content);

    for (var i = 0; i < filesUpload.length; i++) {
      console.log(filesUpload[i]);
      formData.append("files", filesUpload[i]);
    }

    TicketService.createReport(formData, user.token).then((res) => {
      var response = res.data;
      if (response !== undefined && response.status == 200) {
        message.info("Create report successfully");
        navigate("/edit-ticket/" + params.ticketId);
      }
    });
  };

  const handleEditClick = () => {
    if (isCreate == true) {
      return;
    }

    if (enableEdit == false) {
      setEnableEdit(true);
      return;
    }

    var formData = new FormData();
    formData.append("ticketId", params.ticketId);
    formData.append("title", title);
    formData.append("content", content);

    setEnableEdit(false);
  };

  return (
    <div class="row">
      <div class="col-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <h4 class="header-title font-18">BÁO CÁO</h4>
            <div class="form-group col-xs-6 col-md-6 col-lg-6 report-projects">
              <label
                class="col-sm-4 col-form-label"
                style={{ paddingLeft: "0" }}
              >
                Tiêu đề
              </label>
              <div class="col-sm-12" style={{ paddingLeft: "0" }}>
                <Input
                  class="app-text"
                  size="large"
                  name="title"
                  placeholder={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={!(isCreate || enableEdit)}
                />
              </div>
            </div>

            <div class="form-group">
              <p class="label mb-1 text-dark">Nội dung báo cáo</p>
              {enableEdit ? (
                <TextEditor
                  placeholder={"Nội dung ..."}
                  setContent={setContent}
                  content={content}
                />
              ) : (
                <div class="col-12 grid-margin">{ReactHtmlParser(content)}</div>
              )}
            </div>

            {isCreate || enableEdit ? (
              <div class="row">
                <div class="form-group">
                  <button
                    type="button"
                    class="btn btn-custom btn-file btn-rounded w-md waves-effect waves-light float-left"
                    style={{
                      marginLeft: "20px",
                    }}
                  >
                    <span>
                      <i class="mdi mdi-upload"></i> Upload Files
                    </span>
                    <span>
                      <input
                        name="file"
                        type="file"
                        multiple
                        class="btn btn-custom btn-rounded w-md waves-effect waves-light float-left"
                        onChange={handleFileChange}
                        style={{
                          position: "absolute",
                          top: "0",
                          right: "0",
                          margin: "0",
                          opacity: "0",
                        }}
                      />
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <div> </div>
            )}

            <div class="row">
              {enableEdit ? (
                <div class="row col-12">
                  {filesDisplay.map((file) => (
                    <div class="col-lg-3 col-xl-2">
                      <div class="file-man-box">
                        <div
                          class="file-close"
                          onClick={() => removeDisplayFile(file)}
                        >
                          <i class="mdi mdi-close-circle"></i>
                        </div>
                        <div class="file-img-box">
                          <img src={IconFile} alt="icon" />
                        </div>
                        <div class="file-man-title">
                          <h5 class="mb-0 text-overflow">{file.name}</h5>
                          <p class="mb-0">
                            <small>
                              {Utils.getFileSizeFromBytes(file.size)}
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filesUpload.map((file) => (
                    <div class="col-lg-3 col-xl-2">
                      <div class="file-man-box">
                        <div
                          class="file-close"
                          onClick={() => removeUploadFile(file)}
                        >
                          <i class="mdi mdi-close-circle"></i>
                        </div>
                        <div class="file-img-box">
                          <img src={IconFile} alt="icon" />
                        </div>
                        <div class="file-man-title">
                          <h5 class="mb-0 text-overflow">{file.name}</h5>
                          <p class="mb-0">
                            <small>
                              {Utils.getFileSizeFromBytes(file.size)}
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                filesDisplay.map((file) => (
                  <div class="col-lg-3 col-xl-2">
                    <div class="file-man-box">
                      <div class="file-img-box">
                        <img src={IconFile} alt="icon" />
                      </div>
                      <div
                        class="file-download"
                        onClick={() =>
                          handleDownloadFile(file.fileName, file.name)
                        }
                      >
                        <i class="mdi mdi-download"></i>
                      </div>
                      <div class="file-man-title">
                        <h5 class="mb-0 text-overflow">{file.name}</h5>
                        <p class="mb-0">
                          <small>{Utils.getFileSizeFromBytes(file.size)}</small>
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <button
              class="btn btn-custom waves-effect waves-light float-right mt-2"
              onClick={isCreate ? handleUploadClick : handleEditClick}
            >
              {isCreate ? "Tạo báo cáo" : enableEdit ? "Hoàn tất" : "Chỉnh sửa"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
