import React, { useState } from "react";
import { Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TextEditor from "../../components/TextEditor";
import TicketService from "../../../services/TicketService";
import { useDispatch, useSelector } from "react-redux";

export default function CreateTicketPage(props) {
  const user = useSelector((state) => {
    return state.AuthReducer.user;
  });
  const [fileList, setFileList] = useState([]);
  const files = fileList ? [...fileList] : [];
  const [content, setContent] = useState("");

  const handleFileChange = (e) => {
    setFileList(e.target.files);
  };

  const handleUploadClick = () => {
    var formData = new FormData();
    formData.set("assignorId", 1);
    formData.append("assignorId", user.userId);
    formData.append("assigneeId", 1);
    formData.append("content", content);
    formData.append("ticketStatus", 0);
    formData.append("departmentId", 1);
    formData.append("projectId", 0);

    for (var i = 0; i < fileList.length; i++) {
      formData.append("files", fileList[i]);
    }

    TicketService.createTicket(formData, user.token).then((res) => {
      console.log(res);
    });
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
                  <Input class="app-text" size="large" name="title" />
                </div>
              </div>
              <div class="form-group col-xs-6 col-md-6 col-lg-6 report-projects">
                <label
                  class="col-sm-4 col-form-label"
                  style={{ paddingLeft: "0" }}
                >
                  Người nhận
                </label>
                <div class="col-sm-12" style={{ paddingLeft: "0" }}>
                  <Input
                    class="app-text"
                    size="large"
                    name="title"
                    placeholder="Khang"
                    disabled
                  />
                </div>
              </div>
              <div class="form-group">
                <p class="label mb-1 text-dark">Nội dung công việc</p>
                <TextEditor
                  placeholder={"Nội dung ..."}
                  setContent={setContent}
                  content={content}
                />
              </div>
              <div class="form-group">
                <div style={{ display: "inline-block" }}>
                  <span>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      multiple
                      name="files"
                    />
                    <button type="button">Thêm tài liệu</button>
                  </span>
                </div>
                <ul>
                  {files.map((file, i) => (
                    <li key={i}>{file.name}</li>
                  ))}
                </ul>
              </div>
              <button
                class="btn btn-custom waves-effect waves-light float-right mt-2"
                onClick={handleUploadClick}
              >
                Tạo công việc
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
