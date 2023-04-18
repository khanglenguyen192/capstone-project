import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import viLocale from "@fullcalendar/core/locales/vi";
import React, { useState } from "react";
import Popup from "../../components/Popup";
import Colors from '../../../common/constants/Colors';
import TextArea from "antd/es/input/TextArea";
import './Overtime.css';
import { Cascader, Space, TimePicker, message } from "antd";
import { createEventId } from "../../../common/utils/Utils";


export default function OvertimePage(props) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [info, setInfo] = useState(null);

  const overtime = {
    projects: [],
    startTime: {},
    endTime: {},
    contents: {}
  };

  const INITIAL_EVENTS = [
    // {
    //   user: {},
    //   reason: "",
    //   start: "",
    // }
  ];

  const options = {
    eventLimitText: "Yêu cầu",
    editable: false,
    header: {
      left: "prev,next today",
      center: "title",
      right: "viewListLeaving",
    },
    customButtons: {
      // submitDayOff: {
      //   text: "Xin nghỉ phép",
      //   click: () => {
      //     setButtonPopup((buttonPopup) => !buttonPopup);
      //   },
      // },
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
    listProject: [
      {
        label: 'Project 1',
        value: 'Project 1',
      },
      {
        label: 'Project 2',
        value: 'Project 2',
      },
      {
        label: 'Project 3',
        value: 'Project 3',
      }
    ]
  };

  const popupHandle = (info) => {
    setButtonPopup(true);
    setInfo(info);
  };

  const onSubmit = () => {
    let calendarApi = info.view.calendar;

    calendarApi.unselect();
    
    if (info) {
      calendarApi.addEvent({
        id: createEventId(),
        title: overtime.projects,
        start: new Date(`${info.startStr} ${overtime.startTime.$H}:${overtime.startTime.$m}:00`)
      });
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
    return (
      <div style={ {
        display: "flex",
        width: "-webkit-fill-available",
        borderRadius: "2px",
        padding: "1px 10px",
        margin: "0 5px",
        alignItems: "center",
        backgroundColor: Colors.quite_blue
      } }>
        <b style={ { paddingRight: "6px" } }>{ formatTimeString(eventInfo.timeText) }</b>
        <i>{ eventInfo.event.title }</i>
      </div>
    );
  };

  const handleEventClick = (clickInfo) => {
    if (!alert(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };

  return (
    <div class="row">
      <div class="col-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <FullCalendar
              plugins={ options.plugins }
              headerToolbar={ options.header }
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
            <Popup trigger={ buttonPopup } setTrigger={ setButtonPopup } onSubmit={ onSubmit } title="Tăng ca">
              <div className='container-overtime'>
                <div className='content-overtime'>
                  <h5 className='name'>Dự án</h5>
                  <div className="wrap-overtime">
                    <Cascader
                      className="name-project"
                      style={ {
                        width: "100%",
                      } }
                      options={ options.listProject }
                      multiple
                      maxTagCount="responsive"
                      placeholder="Chọn dự án"
                      onChange={ (value) => { overtime.projects = value } }
                    />
                    <Space wrap>
                      <TimePicker use12Hours format="h:mm a"
                        onChange={ (value) => { overtime.startTime = value } }
                      />
                    </Space>
                  </div>
                  <div className='detail'>
                    <div className='address'>
                      <h5>Mô tả</h5>
                      <TextArea rows={ 6 } placeholder="Nội dung tăng ca"
                        style={ { backgroundColor: Colors.graynish, maxHeight: "calc(100vh - 28rem)" } }
                        onChange={ (value) => { overtime.contents = value; } }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          </div>
        </div>
      </div>
    </div>
  );
}
