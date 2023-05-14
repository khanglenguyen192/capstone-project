import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import viLocale from "@fullcalendar/core/locales/vi";
import React, { useState } from "react";
import Popup from "../../components/Popup";
import { useDispatch } from "react-redux";

export default function MeetingPage(props) {
  const [buttonPopup, setButtonPopup] = useState(false);
  useDispatch()({
    type: "meeting",
  });

  function onSubmitDayOff() {
    return (
      <Popup
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
        title="Thêm phòng ban"
      ></Popup>
    );
  }

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
        click: () => onSubmitDayOff(),
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
  return (
    <div class="row">
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
          </div>
        </div>
      </div>
    </div>
  );
}
