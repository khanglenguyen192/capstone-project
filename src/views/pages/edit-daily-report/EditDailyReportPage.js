import React from "react";
import "./EditDailyReportPage.css";

export default function EditDailyReportPage(props) {
  var isAdd = true;
  const currDate = "dd/MM/yyyy";

  return (
    <div>
      <div class="row">
        <div class="col-12 grid-margin">
          <div class="card">
            <div class="card-body">
              <h4 class="header-title font-18">DAILY REPORT</h4>
              <p class="text-muted font-13 mb-3">{currDate}</p>
              <div class="form-group col-xs-6 col-md-6 col-lg-6 report-projects">
                {/* <app-dropdown-list required class="app-text" name="projects" [data]="projects" [(ngModel)]="projectId" title="Chọn dự án">
                            </app-dropdown-list> */}
              </div>
              <div class="form-group">
                <p class="label mb-1 text-dark">Nội dung</p>
                <div id="summernote" class="summernote"></div>
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
