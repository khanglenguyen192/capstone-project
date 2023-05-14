import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import viLocale from "@fullcalendar/core/locales/vi";
import React, { useEffect, useState } from "react";
import ConfirmDialog from "../../dialogs/confirm/ConfirmDialog";
import COLORS from "../../../common/constants/Colors";
import "./DayOff.css";
import { Checkbox, Input, Table, Tag, message } from "antd";
import {
  typeDayOff,
  specialDayType,
  dayOffStatus,
} from "../../../common/constants/Constants";
import DayOffService from "../../../services/DayOffService";
import { useSelector } from "react-redux";
import { event } from "jquery";
import { useDispatch } from "react-redux";

export default function DayOffPage() {
  useDispatch()({
    type: "day-off",
  });

  const [buttonPopup, setButtonPopup] = useState(false);
  const [info, setInfo] = useState([]);
  const [showPopupConfirm, setShowPopupConfirm] = useState(false);
  const [urgent, setUrgent] = useState(false);
  const [reason, setReason] = useState("");
  const [isShowList, setShowList] = useState(false);
  const [initEvents, setInitEvents] = useState([]);
  const [listDayOff, setlistDayOff] = useState([]);

  const user = useSelector((state) => {
    return state.AuthReducer.user;
  });

  async function fetchData() {
    await DayOffService.getDayOff(user.userId, user.token).then((res) => {
      const data = res.data;
      // console.log("data: ", data);
      if (data.payload != null) {
        const init = data.payload.map((item) => ({
          title: typeDayOff.find((x) => x.option === item.option).type,
          start: item.dateTime,
          id: item.id,
        }));
        setInitEvents(init);
      } else setInitEvents(null);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  function onViewListDayOff() {
    fetchData();
    setShowList(!isShowList);
    DayOffService.getDayOff(user.userId, user.token).then((res) => {
      const response = res.data;

      if (response.payload != null) {
        // console.log("call api: ", response.payload);
        var dayoff = response.payload.map((item) => {
          return {
            id: item.id,
            reason: item.reason,
            date: new Date(item.dateTime).toLocaleDateString("vi-VN"),
            type: typeDayOff.find((x) => x.option == item.option).type,
            status: {
              key: item.dayOffStatus,
              value: dayOffStatus.find((x) => x.value === item.dayOffStatus)
                .status,
            },
          };
        });

        setlistDayOff(dayoff);
      }
    });
  }

  function onCancelPopup() {
    setShowPopupConfirm(false);
  }

  function onConfirmDayOff() {
    setShowPopupConfirm(false);
    info.forEach((e) => {
      dayoff.push({
        userId: user.userId,
        dateTime: e._instance.range.start.toISOString(),
        option: typeDayOff.find((x) => x.type === e._def.title).option,
        type: specialDayType.find((x) => x.type === "DayOff").value,
        reason: reason,
        isUrgent: urgent,
      });
    });

    DayOffService.createDayOff(dayoff, user.token).then((res) => {
      const response = res.data;
      if (response.status === 200) {
        console.log(response.payload);
      }
    });
  }

  const deleteEvent = (id) => {
    // console.log("Id: ", id);
    DayOffService.deleteDayOff(id, user.token).then((res) => {
      const response = res.data;
      if (response.status === 200) {
        message.info("Xóa thành công", 2);
        setShowList(!isShowList);
        onViewListDayOff();
        console.log(response.payload);
      }
    });
  };

  const dayoff = [];

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
          console.log("info: ", info);
          setShowPopupConfirm(!showPopupConfirm);
        },
      },
      viewListLeaving: {
        text: "Danh sách",
        icon: "mdi mdi mdi-format-line-style",
        click: () => onViewListDayOff(),
      },
    },
    buttonText: {
      listMonth: "Danh sách tháng",
    },
    plugins: [dayGridPlugin, interactionPlugin, listPlugin],
  };

  const columns = [
    {
      title: "Lý do",
      dataIndex: "reason",
      key: "reason",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Ngày xin nghỉ",
      dataIndex: "date",
      key: "date",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Hình thức",
      dataIndex: "type",
      key: "type",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let color = "green";
        switch (status.key) {
          case 1:
            color = "green";
            break;
          case 2:
            color = "volcano";
            break;
          case 3:
            color = "red";
            break;
        }
        return (
          <Tag color={color} key={status.key}>
            {status.value}
          </Tag>
        );
      },
    },
    {
      title: "Tác vụ",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <div className="opt-button">
          <button
            title="Xóa"
            class="remove-dayoff-bt btn btn-icon btn-sm waves-effect waves-light btn-danger"
            type="button"
            onClick={() => deleteEvent(id)}
          >
            <i class="mdi mdi-delete-circle"></i>
          </button>
        </div>
      ),
    },
  ];

  const selectHandle = (event) => {
    let calendarApi = event.view.calendar;
    calendarApi.unselect();

    if (event) {
      let currentDate = new Date(event.start);
      const endDate = new Date(event.end);
      let result = info;

      while (currentDate < endDate) {
        if (initEvents != null) {
          let findInit = initEvents.find(
            (x) =>
              new Date(x.start).getTime() === new Date(currentDate).getTime()
          );
          if (findInit != null) {
            currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
            continue;
          }
        }

        const events = calendarApi.getEvents();
        let opt = events.find(
          (x) => new Date(x.start).getTime() === new Date(currentDate).getTime()
        );
        let ind = result.findIndex(
          (x) => new Date(x.start).getTime() === new Date(currentDate).getTime()
        );

        if (ind !== -1) {
          if (opt.title === "SA") {
            opt.setProp("title", "CH");
            result[ind] = opt;
          } else if (opt.title === "CH") {
            opt.setProp("title", "NG");
            result[ind] = opt;
          } else {
            opt.remove();
            result.splice(ind, 1);
            ind = -1;
          }
        } else {
          calendarApi.addEvent({
            start: currentDate,
            title: "SA",
          });

          let e = calendarApi
            .getEvents()
            .find(
              (x) =>
                new Date(x.start).getTime() === new Date(currentDate).getTime()
            );
          result.push(e);
        }
        currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
      }

      setInfo(result);
    }
  };

  const renderEventContent = (eventInfo) => {
    let color = typeDayOff.find((e) => e.type === eventInfo.event.title);
    return (
      <div
        style={{
          display: "flex",
          width: "-webkit-fill-available",
          borderRadius: "2px",
          padding: "8px 10px",
          margin: "0 5px",
          alignItems: "center",
          justifyContent: "center",
          cursor: "auto",
          backgroundColor: color.bgColor,
        }}
      >
        <i className="text-light text-center">{eventInfo.event.title}</i>
      </div>
    );
  };

  const handleEventClick = (clickInfo) => {
    if (initEvents != null) {
      let findInit = initEvents.find(
        (x) =>
          new Date(x.start).getTime() ===
          new Date(clickInfo.event.start).getTime()
      );
      if (findInit != null) {
        return;
      }
    }

    let ind = info.findIndex(
      (x) =>
        new Date(x.start).getTime() ===
        new Date(clickInfo.event.start).getTime()
    );

    if (clickInfo.event.title === "SA") {
      clickInfo.event.setProp("title", "CH");
    } else if (clickInfo.event.title === "CH") {
      clickInfo.event.setProp("title", "NG");
    } else {
      clickInfo.event.remove();
      info.splice(ind, 1);
      setInfo(info);
      return;
    }

    info[ind] = clickInfo.event;
    setInfo(info);
  };

  const onChange = (e) => {
    setUrgent(!urgent);
  };

  return (
    <div class="row">
      <ConfirmDialog
        isShow={showPopupConfirm}
        title="Xin nghỉ phép"
        onCancel={onCancelPopup}
        mainButtonText="Xác nhận"
        subButtonText="Đóng"
        mainButtonClick={onConfirmDayOff}
        subButtonClick={onCancelPopup}
      >
        <form onSubmit="submitWorkRemoteDate()" autocomplete="off">
          <div class="modal-body" style={{ padding: "0 0 10px 0" }}>
            <div class="row">
              <label class="col-sm-12 col-form-label">Lý do</label>
              <div class="col-sm-12">
                <div class="form-group">
                  <Input
                    class="form-group"
                    size="large"
                    required="true"
                    onChange={(e) => {
                      setReason(e.target.value);
                    }}
                  ></Input>
                </div>
                <div className="pt-3 float-right">
                  <Checkbox onChange={onChange}>Xin nghỉ khẩn cấp</Checkbox>
                </div>
              </div>
            </div>
          </div>
        </form>
      </ConfirmDialog>

      <div class="col-12 grid-margin">
        <div class="card">
          <div class="card-body">
            {isShowList ? (
              <div>
                <button
                  type="button"
                  class="fc-viewListLeaving-button fc-button fc-button-primary float-right"
                  onClick={onViewListDayOff}
                >
                  <i class="mdi mdi-calendar-today"></i>
                </button>
                <h4 class="card-title mb-4">Danh sách xin nghỉ</h4>

                {/* <span class="d-flex align-items-center justify-content-end mr-0 mb-3">
                  Tìm: &nbsp;
                  <Input type="text" placeholder="nội dung..."></Input>
                </span> */}

                <div class="table-data">
                  <Table columns={columns} dataSource={listDayOff}></Table>
                </div>
              </div>
            ) : (
              <FullCalendar
                plugins={options.plugins}
                headerToolbar={options.header}
                footerToolbar={options.footer}
                eventLimitText={options.eventLimitText}
                editable={options.editable}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                events={initEvents}
                select={selectHandle}
                customButtons={options.customButtons}
                buttonText={options.buttonText}
                eventContent={renderEventContent} // custom render function
                eventClick={handleEventClick}
                height={800}
                locale={viLocale}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
