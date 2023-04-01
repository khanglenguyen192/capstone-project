import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import viLocale from "@fullcalendar/core/locales/vi";
import React, { useState } from "react";
import ConfirmDialog from "../../dialogs/confirm/ConfirmDialog";

export default function DayOffPage() {
  const [showPopupConfirm, setshowPopupConfirm] = useState(false);

  const dayoff = {
    user: {},
    reason: "",
    dateTime: "",
  };

  const date = "19/02/2023";

  const options = {
    eventLimitText: "yêu cầu",
    editable: false,
    header: {
      left: "prev,next today",
      center: "title",
      right: "viewListLeaving",
    },
    footer: {
      center: "submitDayOff",
    },
    customButtons: {
      submitDayOff: {
        text: "Xin nghỉ phép",
        click: () => this.onSubmitDayOff(),
      },
      viewListLeaving: {
        text: "Danh sách",
        icon: "mdi mdi mdi-format-line-style",
        click: () => this.onViewListLeaving(),
      },
    },
    buttonText: {
      listMonth: "Danh sách tháng",
    },
    plugins: [dayGridPlugin, interactionPlugin, listPlugin],
  };

  const events = [{ title: "Meeting", start: new Date() }];

  const onSubmitDayOff = () => {
    setshowPopupConfirm(true);
  };

  return (
    <div class="row">
      <ConfirmDialog
        isShow={showPopupConfirm}
        title="Xin nghỉ phép"
      ></ConfirmDialog>

      <div class="col-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <FullCalendar
              plugins={options.plugins}
              events={events}
              eventLimitText={options.eventLimitText}
              editable={options.editable}
              customButtons={options.customButtons}
              buttonText={options.buttonText}
              headerToolbar={options.header}
              footerToolbar={options.footer}
              height={800}
              locale={viLocale}
            />
            {/* <div>
              <button
                type="button"
                class="fc-viewListLeaving-button fc-button fc-button-primary float-right"
              >
                <i class="mdi mdi-calendar-today"></i>
              </button>
              <h4 class="card-title mb-4">Danh sách xin nghỉ phép</h4>

              <span class="d-flex align-items-center justify-content-end mr-0 mb-3">
                Tìm: &nbsp;
                <app-text-box type="text"></app-text-box>
              </span>

              <div class="table-data">
                <table nzShowPagination nzShowSizeChanger nzPageSize="50">
                  <thead nzSingleSort>
                    <tr>
                      <th nzShowSort nzSortKey="user.userName">
                        Nhân viên
                      </th>
                      <th nzShowSort nzSortKey="reason">
                        Lý do nghỉ
                      </th>
                      <th nzShowSort nzSortKey="dateTime">
                        Ngày nghỉ
                      </th>
                      <th nzShowSort nzSortKey="option">
                        Thời gian nghỉ
                      </th>
                      <th nzShowSort nzSortKey="dayOffStatus">
                        Trạng thái
                      </th>
                      <th>Tác vụ</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>
                        <app-shared-image></app-shared-image>
                        <label class="ml-2">{dayoff.user.userName}</label>
                      </td>
                      <td>{dayoff.reason}</td>
                      <td>{dayoff.dateTime | date}</td>
                      <td>
                        <span class="badge badge-success font-13">Cả ngày</span>
                        <span class="badge badge-danger font-13">
                          Buổi sáng
                        </span>
                        <span class="badge badge-warning font-13">
                          Buổi chiều
                        </span>
                      </td>
                      <td>
                        <span class="badge badge-success font-13">
                          Đã chấp nhận
                        </span>
                        <span class="badge badge-danger font-13">
                          Đã từ chối
                        </span>
                        <span class="badge badge-warning font-13">
                          Chờ xác nhận
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          class="leving-detail-bt btn btn-icon btn-sm waves-effect waves-light btn-custom mr-2"
                          title="Chấp nhận"
                        >
                          {" "}
                          <i class="fa fa-check"></i>
                        </button>
                        <button
                          class="leving-detail-bt btn btn-icon btn-sm waves-effect waves-light btn-danger"
                          title="Từ chối"
                        >
                          {" "}
                          <i class="fa fa-times"></i>
                        </button>
                        <button
                          title="Xóa"
                          class="remove-dayoff-bt btn btn-icon btn-sm waves-effect waves-light btn-danger"
                          type="button"
                        >
                          <i class="mdi mdi-delete-circle"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
