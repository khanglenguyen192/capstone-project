import React from "react";
import "./DailyReportPage.css";
import { useSelector } from "react-redux";

export default function DailyReportPage() {
  const isAdmin = useSelector((state) => {
    console.log(state);
    return state.AuthReducer.isAdmin;
  });

  const report = {};

  const employee = {};

  const date = "";

  const targetDate = "";

  return (
    <div>
      <div class="row mb-4">
        <div class="col-12 grid-margin">
          <div class="card">
            <div class="card-body">
              <div class="fc-toolbar fc-header-toolbar">
                <div class="fc-left">
                  <div class="fc-button-group">
                    <button
                      type="button"
                      class="fc-prev-button fc-button fc-button-primary"
                      aria-label="prev"
                    >
                      <span class="fc-icon fc-icon-chevron-left"></span>
                    </button>
                    <button
                      type="button"
                      class="fc-today-button fc-button fc-button-primary"
                    >
                      Hôm nay
                    </button>
                    <button
                      type="button"
                      class="fc-next-button fc-button fc-button-primary"
                      aria-label="next"
                    >
                      <span class="fc-icon fc-icon-chevron-right"></span>
                    </button>
                  </div>
                </div>
                <div class="fc-center">
                  <h2>
                    Tháng {targetDate | date} năm {targetDate | date}
                  </h2>
                </div>
                <div class="fc-right">
                  {/* {if (!isAdmin) {
                            <button routerLink="/add-daily-report" type="button" class="btn btn-custom btn-fw waves-effect" title="Tạo mới">
                            <i class="mdi mdi-plus"></i>
                            Tạo mới
                        </button>
                        }} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        {!isAdmin ? (
          <div class="row mb-4">
            <div class="col-12 grid-margin">
              <div class="card">
                <div class="card-body">
                  <div class="report-header">
                    <p class="font-18">
                      {report.created | date}
                      <span class="font-18 float-right">
                        Chỉnh sửa lúc: {report.modified | date}
                        <button
                          type="button"
                          class="btn btn-danger ml-2"
                          disabled
                        >
                          {report.successfully}%
                        </button>
                      </span>
                    </p>
                    <p class="font-18">Dự án: {report.projectName}</p>
                  </div>
                  <div class="report-body straight-line">
                    <p class="font-18"></p>
                  </div>
                  <div class="report-footer">
                    <button class="btn btn-custom waves-effect waves-light float-right mt-1">
                      Cập nhật
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div class="row">
            <div class="col-3 grid-margin">
              <div class="card">
                <div class="card-body">
                  <div>
                    <button
                      type="button"
                      class="fc-prev-button fc-button fc-button-primary report-user-list mb-2"
                    >
                      {employee.fullName}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-9 ">
              <div class="row mb-4">
                <div class="col-12 grid-margin">
                  <div class="card">
                    <div class="card-body">
                      <div class="report-header">
                        <p class="font-18">
                          {report.created | date}
                          <span class="font-18 float-right">
                            Chỉnh sửa lúc: {report.modified | date}
                            {/* <button *ngIf="report.successfully < 31" type="button" class="btn btn-danger ml-2" disabled>{{report.successfully}}%</button>
                            <button *ngIf="report.successfully > 79"type="button" class="btn btn-success ml-2" disabled>{{report.successfully}}%</button>
                            <button *ngIf="report.successfully > 30 && report.successfully < 80" type="button" class="btn btn-warning ml-2" disabled>{{report.successfully}}%</button> */}
                          </span>
                        </p>
                        <p class="font-18">Dự án: {report.projectName}</p>
                      </div>
                      <div class="report-body straight-line">
                        <p class="font-18"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
