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
        click: (info) => this.popupHandle(info),
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

  const popupHandle = (info) => {
    setButtonPopup(true);
    setInfo(info);

    // const selectedEvent = {
    //   title: 'New Event',
    //   start: info.start,
    //   end: info.end,
    //   backgroundColor: 'yellow', // change the background color here
    //   textColor: 'black' // change the text color here
    // };
    // setEvents([...events, selectedEvent]);
    // console.log(info);
  };

  const onSubmit = () => {
    let calendarApi = info.view.calendar;
    // calendarApi.unselect();

    if (info) {
      const currentDate = new Date(info.start);
      const endDate = new Date(info.end);

      console.log("Type: ", info)
      while (currentDate < endDate) {
        calendarApi.addEvent({
          id: createEventId(),
          start: currentDate,
          allDay: false,
        });
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
  };

  function formatTimeString(timeString) {
    if (timeString.length === 1) {
      timeString = `0${timeString}:00`;
    } else if (timeString.length === 2) {
      timeString = `${timeString}:00`;
    } else if (timeString.length === 4) {
      timeString = `0${timeString}`;
    }
    return timeString;
  }

  const renderEventContent = (eventInfo) => {
    // how to set value red for backgroundColor of eventInfo
    // console.log(eventInfo);
    return (
      <div style={ {
        display: "flex",
        width: "-webkit-fill-available",
        borderRadius: "2px",
        padding: "1px 10px",
        margin: "0 5px",
        alignItems: "center",
        backgroundColor: COLORS.quite_blue
      } }>
        <b className="text-light" style={ { paddingRight: "6px" } }>{ formatTimeString(eventInfo.timeText) }</b>
        <i className="text-light">{ eventInfo.event.title }</i>
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
            {/* <FullCalendar
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
            /> */}

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
              initialEvents={ INITIAL_EVENTS }
              select={ popupHandle }
              customButtons={ options.customButtons }
              buttonText={ options.buttonText }
              eventContent={ renderEventContent } // custom render function
              eventClick={ handleEventClick }
              // eventsSet={ this.handleEvents }
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
