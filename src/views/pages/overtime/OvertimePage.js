import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import viLocale from "@fullcalendar/core/locales/vi";
import React, { useState } from "react";
import Popup from "../../components/Popup";
import Colors from '../../../common/constants/Colors';
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";
import '../department/Department.css';

export default function OvertimePage(props) {
  const [buttonPopup, setButtonPopup] = useState(false);

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
        click: () => {
          setButtonPopup((buttonPopup) => !buttonPopup);
        },
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
              plugins={ options.plugins }
              events={ events }
              eventLimitText={ options.eventLimitText }
              editable={ options.editable }
              customButtons={ options.customButtons }
              buttonText={ options.buttonText }
              headerToolbar={ options.header }
              footerToolbar={ options.footer }
              height={ 800 }
              locale={ viLocale }
            />
            <Popup trigger={ buttonPopup } setTrigger={ setButtonPopup } title="Thêm phòng ban">
              <div className='container-department'>
                <div className='content-department'>
                  <h5 className='name'>Tên phòng ban</h5>
                  <Input id='input-department' placeholder="Tên phòng ban của công ty" />
                  <div className='detail'>
                    <div className='address'>
                      <h5>Mô tả</h5>
                      <TextArea rows={ 6 } placeholder="Thêm phần mô tả cho chi nhánh" style={ { backgroundColor: Colors.graynish } } />
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
