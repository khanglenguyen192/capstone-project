import React, { useEffect, useState } from "react";
import { Input, Upload, Button, Cascader, message } from "antd";
import TextEditor from "../../components/TextEditor";
import TicketService from "../../../services/TicketService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import "./CreateTicketPage.css";
import Utils from "../../../common/utils/Utils";
import IconFile from "../../../assets/images/file_icons/icons8-file.svg";
import dateFormat from "dateformat";
import UserService from "../../../services/UserService";
import Constants from "../../../common/constants/Constants";

export default function CreateTicketPage(props) {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.userId !== undefined) {
      setEnableEdit(true);
      setIsSelfEdit(true);
      setAssigneeId(params.userId);
      setDepartmentId(params.departmentId);
      setTicketStatus(0);
      UserService.getUser(params.userId, user.token).then((res) => {
        var response = res.data;

        if (response != null && response.payload != null) {
          setAssigneeName(response.payload.fullName);
        }
      });
    } else if (params.ticketId !== undefined) {
      setIsCreateTicket(false);
      fetchTicket(params.ticketId);
    } else {
      console.log("developmentMode");
    }
  }, []);

  const user = useSelector((state) => {
    return state.AuthReducer.user;
  });

  const [content, setContent] = useState();
  const [title, setTitle] = useState();
  const [ticketStatus, setTicketStatus] = useState();
  const [enableEdit, setEnableEdit] = useState(false);
  const [assigneeId, setAssigneeId] = useState();
  const [assigneeName, setAssigneeName] = useState();
  const [departmentId, setDepartmentId] = useState();
  const [isCreateTicket, setIsCreateTicket] = useState(true);
  const [isSelfEdit, setIsSelfEdit] = useState(false);

  const [filesDisplay, setFilesDisplay] = useState([]);
  const [filesUpload, setFilesUpload] = useState([]);
  const [reports, setReports] = useState([]);

  const fetchTicket = (ticketId) => {
    TicketService.getTicket(ticketId, user.token).then((res) => {
      var response = res.data;
      if (response !== undefined && response.payload !== undefined) {
        var ticket = response.payload;
        setTitle(ticket.title);
        setContent(ticket.content);
        setAssigneeId(ticket.assigneeId);
        setAssigneeName(ticket.assigneeName);
        setDepartmentId(ticket.departmentId);
        setTicketStatus(ticket.ticketStatus);
        setEnableEdit(false);

        if (ticket.assignorId != user.userId) {
          setIsSelfEdit(false);
        } else {
          setIsSelfEdit(true);
        }

        if (ticket.ticketFiles != null) {
          var ticketFilesModel = ticket.ticketFiles.map((file) => {
            return {
              id: file.id,
              name: file.displayName,
              fileName: file.fileName,
              size: file.size,
            };
          });
          setFilesDisplay(ticketFilesModel);
        }

        if (ticket.reports != null) {
          setReports(ticket.reports);
        }
      }
    });
  };

  const handleFileChange = (e) => {
    console.log(
      "isCreateTicket " + isCreateTicket + " enableEdit " + enableEdit
    );
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
    var formData = new FormData();
    formData.append("assignorId", user.userId);
    formData.append("assigneeId", assigneeId);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("ticketStatus", ticketStatus);
    formData.append("departmentId", departmentId);

    for (var i = 0; i < filesUpload.length; i++) {
      console.log(filesUpload[i]);
      formData.append("files", filesUpload[i]);
    }

    TicketService.createTicket(formData, user.token).then((res) => {
      var response = res.data;
      if (response !== undefined && response.status == 200) {
        message.info("Create ticket successfully");
        navigate("/tickets");
      }
    });
  };

  const handleEditClick = () => {
    if (isCreateTicket == true) {
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
    formData.append("ticketStatus", 0);

    setEnableEdit(false);
  };

  const handleCancelClick = () => {
    if (isCreateTicket || params.ticketId == null) {
      return;
    }

    fetchTicket(params.ticketId);
  };

  const handleCreateReport = () => {
    if (isCreateTicket) {
      return;
    }

    navigate("/ticket/" + params.ticketId + "/create-report");
  };

  const handleViewReport = (reportId) => {
    navigate("/report/" + reportId);
  };

  const handleSelectTicketStatus = (value, selectedOption) => {
    setTicketStatus(value);
  };

  return (
    <div>
      <div class="row">
        <div class="col-12 grid-margin">
          <div class="card">
            <div class="card-body">
              <h4 class="header-title font-18">NHIỆM VỤ</h4>
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={!(isCreateTicket || enableEdit)}
                  />
                </div>
              </div>
              <div className="form-group row" style={{ paddingLeft: "15px" }}>
                <div class="form-group col-xs-6 col-md-6 col-lg-6 report-projects">
                  <label
                    class="col-sm-4 col-form-label"
                    style={{ paddingLeft: "0" }}
                  >
                    Người thực hiện
                  </label>
                  <div class="col-sm-12" style={{ paddingLeft: "0" }}>
                    <Input
                      class="app-text"
                      size="large"
                      name="title"
                      placeholder={assigneeName}
                      disabled
                    />
                  </div>
                </div>
                <div class="form-group col-xs-6 col-md-6 col-lg-6 report-projects">
                  <label
                    class="col-sm-4 col-form-label"
                    style={{ paddingLeft: "0" }}
                  >
                    Trạng thái
                  </label>
                  <div class="col-sm-12" style={{ paddingLeft: "0" }}>
                    <Cascader
                      size="large"
                      name="ticketStatus"
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      placement="bottomRight"
                      placeholder="Chọn"
                      options={Constants.ticketStatusModels}
                      onChange={handleSelectTicketStatus}
                      value={Utils.getTicketStatusLabel(ticketStatus)}
                      disabled={!enableEdit}
                    />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <p class="label mb-1 text-dark">Nội dung công việc</p>
                {enableEdit ? (
                  <TextEditor
                    placeholder={"Nội dung ..."}
                    setContent={setContent}
                    content={content}
                  />
                ) : (
                  <div class="col-12 grid-margin">
                    {ReactHtmlParser(content)}
                  </div>
                )}
              </div>
              {isCreateTicket || enableEdit ? (
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
                            <small>
                              {Utils.getFileSizeFromBytes(file.size)}
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div class="row">
                <div class="col-md-12">
                  {!isCreateTicket && enableEdit && (
                    <button
                      style={{ marginLeft: "10px" }}
                      class="btn btn-custom waves-effect waves-light btn-danger float-right mt-2"
                      onClick={handleCancelClick}
                    >
                      Hủy bỏ
                    </button>
                  )}
                  {isSelfEdit && (
                    <button
                      class="btn btn-custom waves-effect waves-light float-right mt-2"
                      onClick={
                        isCreateTicket ? handleUploadClick : handleEditClick
                      }
                    >
                      {isCreateTicket
                        ? "Tạo công việc"
                        : enableEdit
                        ? "Hoàn tất"
                        : "Chỉnh sửa"}
                    </button>
                  )}
                </div>
              </div>

              {!isCreateTicket && (
                <div>
                  <br />
                  <div class="row">
                    <div class="col-sm-12 col-md-6">
                      <h4 class="header-title font-18">BÁO CÁO</h4>
                    </div>
                    {!isSelfEdit && (
                      <div class="col-sm-12 col-md-6">
                        <button
                          class="btn btn-custom btn-rounded waves-effect waves-light float-right float-start mt-2"
                          onClick={handleCreateReport}
                        >
                          <span>
                            <i class="mdi mdi-plus-circle"></i>
                            Tạo báo cáo
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                  <div class="row">
                    {reports.length == 0 ? (
                      <div class="col-12">
                        <p class="text-muted font-18">
                          Hiện tại không có báo cáo !!!
                        </p>
                      </div>
                    ) : (
                      reports.map((report) => (
                        <div class="col-sm-6">
                          <div
                            class="card m-b-30 card-body"
                            style={{ background: "rgba(158,207,250,.3)" }}
                          >
                            <h5 class="card-title">{report.title}</h5>
                            <p class="card-text">
                              Ngày tạo:{" "}
                              {dateFormat(report.created, "HH:mm dd/mm/yyyy")}
                            </p>
                            <button
                              class="btn btn-custom waves-effect waves-light"
                              onClick={() => {
                                handleViewReport(report.id);
                              }}
                            >
                              Xem báo cáo
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
