import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Input, Cascader, Table, Tag } from "antd";

import "./EditDailyReportPage.css";

export default function EditDailyReportPage(props) {
  var isAdd = true;
  const currDate = "02/03/2023";

  const listProject = [];

  return (
    <div>
      <div class="row">
        <div class="col-12 grid-margin">
          <div class="card">
            <div class="card-body">
              <h4 class="header-title font-18">DAILY REPORT</h4>
              <p class="text-muted font-13 mb-3">{currDate}</p>
              <div class="form-group col-xs-6 col-md-6 col-lg-6 report-projects">
                <label
                  class="col-sm-4 col-form-label"
                  style={{ paddingLeft: "0" }}
                >
                  Chọn dự án
                </label>
                <div class="col-sm-12" style={{ paddingLeft: "0" }}>
                  <Cascader
                    size="large"
                    name="projectStatusModels"
                    style={{
                      width: "100%",
                    }}
                    options={listProject}
                  />
                </div>
              </div>
              <div class="form-group">
                <p class="label mb-1 text-dark">Nội dung</p>
                <CKEditor editor={ClassicEditor}></CKEditor>
              </div>
              {!isAdd ? (
                <div>
                  <div class="form-group">
                    <label class="label">Tiến độ hoàn thành</label>
                    <input
                      type="text"
                      value="model.successfully"
                      id="completionRate"
                    ></input>
                  </div>
                  <button class="btn btn-custom waves-effect waves-light float-right mt-2">
                    Lưu
                  </button>
                </div>
              ) : (
                <button
                  class="btn btn-custom waves-effect waves-light float-right mt-2"
                  onclick="addReport()"
                >
                  Lưu
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
