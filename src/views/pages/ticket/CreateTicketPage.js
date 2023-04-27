import React, { useEffect, useState } from "react";
import { Input, Upload, Button } from "antd";
import TextEditor from "../../components/TextEditor";
import TicketService from "../../../services/TicketService";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./CreateTicketPage.css";
import useScript from "../../components/useScript";

export default function CreateTicketPage(props) {
  const params = useParams();
  useEffect(() => {
    if (params.userId !== undefined) {
      setEnableEdit(true);
      setAssigneeId(params.userId);
      setDepartmentId(params.departmentId);
    } else if (params.ticketId !== undefined) {
      setIsCreateTicket(false);
      TicketService.getTicket(params.ticketId, user.token).then((res) => {
        var response = res.data;
        if (response !== undefined && response.payload !== undefined) {
          var ticket = response.payload;
          setTitle(ticket.title);
          setContent(ticket.content);
          setAssigneeId(ticket.assigneeId);
          setEnableEdit(false);
        }
      });
    } else {
      console.log("developmentMode");
    }
  }, []);

  const user = useSelector((state) => {
    return state.AuthReducer.user;
  });
  const [fileList, setFileList] = useState([]);
  const files = fileList ? [...fileList] : [];
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [enableEdit, setEnableEdit] = useState(false);
  const [assigneeId, setAssigneeId] = useState();
  const [departmentId, setDepartmentId] = useState();
  const [isCreateTicket, setIsCreateTicket] = useState(true);

  const handleFileChange = (e) => {
    setFileList(e.target.files);
  };

  const handleUploadClick = () => {
    var formData = new FormData();
    formData.append("assignorId", user.userId);
    formData.append("assigneeId", assigneeId);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("ticketStatus", 0);
    formData.append("departmentId", departmentId);
    // formData.append("projectId", 0);

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
                  <Input
                    class="app-text"
                    size="large"
                    name="title"
                    value={title}
                    disabled={!isCreateTicket}
                  />
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
                {/* <div style={{ display: "inline-block" }}>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    multiple
                    name="files"
                  />
                </div>
                <ul>
                  {files.map((file, i) => (
                    <li key={i}>{file.name}</li>
                  ))}
                </ul>
                <br /> */}

                <form
                  action="#"
                  class="dropzone"
                  id="dropzone"
                  style={{ minHeight: "150px" }}
                  onChange={handleFileChange}
                >
                  <div class="fallback">
                    <input name="file" type="file" multiple />
                  </div>
                </form>
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
