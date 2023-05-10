import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import viLocale from "@fullcalendar/core/locales/vi";
import React, { useState } from "react";
import ConfirmDialog from "../../dialogs/confirm/ConfirmDialog";
import COLORS from "../../../common/constants/Colors";
import Popup from "../../components/Popup";
import TextArea from "rc-textarea";
import { createEventId } from "../../../common/utils/Utils";
import './DayOff.css';
import { Checkbox } from "antd";
import { cA } from "@fullcalendar/core/internal-common";
import { event } from "jquery";
import { current } from "@reduxjs/toolkit";
import { typeDayOff } from "../../../common/constants/Constants";

export default function DayOffPage() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [info, setInfo] = useState(null);
  const [showPopupConfirm, setshowPopupConfirm] = useState(false);

  const INITIAL_EVENTS = [
    // {
    //   user: {},
    //   reason: "",
    //   start: "",
    // }
  ];

  const dayoff = {
    user: {},
    reason: "",
    dateTime: "",
  };

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
        click: () => { console.log("info: ", info); },
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

  const selectHandle = (event) => {
    let calendarApi = event.view.calendar;
    calendarApi.unselect();

    if (event) {
      const currentDate = new Date(event.start);
      const endDate = new Date(event.end);

      while (currentDate < endDate) {
        let events = calendarApi.getEvents();
        let dates = events.filter(e => {
          return e.start.getTime() === currentDate.getTime();
        });
        
        if (dates.length > 0) {
          if (dates[0].title === 'AM-OFF') {
            dates[0].setProp('title', 'PM-OFF');
            console.log("info check:", info.find(e => e.start.getTime() === dates[0].start.getTime()));
          }
          else if (dates[0].title === 'PM-OFF') {
            dates[0].setProp('title', 'DAY-OFF');
          }
          else {
            dates[0].remove();
          }
        }
        else {
          calendarApi.addEvent({
            id: createEventId(),
            start: currentDate,
            title: "AM-OFF"
          });

          if (!info) {
            setInfo([event]);
          } else {
            setInfo([...info, event]);
          }
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    // console.log(info);
  };

  const onSubmit = () => {
    let calendarApi = info.view.calendar;
    // calendarApi.unselect();

    // if (info) {
    //   const currentDate = new Date(info.start);
    //   const endDate = new Date(info.end);

    //   console.log("Type: ", info);
    //   while (currentDate < endDate) {
    //     calendarApi.addEvent({
    //       id: createEventId(),
    //       start: currentDate,
    //       allDay: false,
    //     });

    //     currentDate.setDate(currentDate.getDate() + 1);
    //   }
    // }
  };

  const renderEventContent = (eventInfo) => {
    let color = typeDayOff.find(e => e.type === eventInfo.event.title);
    return (
      <div style={ {
        display: "flex",
        width: "-webkit-fill-available",
        borderRadius: "2px",
        padding: "8px 10px",
        margin: "0 5px",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: color.bgColor
      } }>
        <i className="text-light text-center">{ eventInfo.event.title }</i>
      </div>
    );
  };

  const handleEventClick = (clickInfo) => {
    if (!alert(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const onSubmitDayOff = () => {
    setshowPopupConfirm(true);
  };

  return (
    <div class="row">
      <ConfirmDialog
        isShow={ showPopupConfirm }
        title="Xin nghỉ phép"
      ></ConfirmDialog>

      <div class="col-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <FullCalendar
              plugins={ options.plugins }
              headerToolbar={ options.header }
              footerToolbar={ options.footer }
              eventLimitText={ options.eventLimitText }
              editable={ options.editable }
              selectable={ true }
              selectMirror={ true }
              dayMaxEvents={ true }
              weekends={ true }
              select={ selectHandle }
              customButtons={ options.customButtons }
              buttonText={ options.buttonText }
              eventContent={ renderEventContent } // custom render function
              eventClick={ handleEventClick }
              height={ 800 }
              locale={ viLocale }
            />

            <Popup trigger={ buttonPopup } setTrigger={ setButtonPopup } onSubmit={ onSubmit } title="Xin nghỉ phép">
              <div className='container-dayoff'>
                <div className='content-dayoff'>
                  <div className='reason'>
                    <h5>Lý do</h5>
                    <TextArea rows={ 6 } placeholder="Lý do xin nghỉ phép"
                      style={ { backgroundColor: COLORS.graynish, maxHeight: "calc(100vh - 28rem)" } }
                      onChange={ (value) => { dayoff.contents = value; } }
                    />
                    <div className="float-right">
                      <Checkbox onChange={ onChange }>Xin nghỉ khẩn cấp</Checkbox>
                    </div>
                  </div>
                </div>
              </div>
            </Popup>

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
