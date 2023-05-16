import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import viLocale from "@fullcalendar/core/locales/vi";
import React, { useEffect, useState } from "react";
import { Input, Table, Tag, message } from "antd";
import "./WorkRemotePage.css";
import ConfirmDialog from "../../dialogs/confirm/ConfirmDialog";
import { useSelector, useDispatch } from "react-redux";
import {
  dayOffStatus,
  specialDayType,
  typeDayOff,
} from "../../../common/constants/Constants";
import DayOffService from "../../../services/DayOffService";
import Utils from "../../../common/utils/Utils";

export default function WorkRemotePage(props) {
  const [isShowList, setShowList] = useState(false);
  const [isShowConfirmPopup, setShowConfirmPopup] = useState(false);
  const [reason, setReason] = useState("");
  const [info, setInfo] = useState([]);
  const [initEvents, setInitEvents] = useState([]);
  const [listWFH, setListWFH] = useState([]);

  const isAdmin = useSelector((state) => {
    return state.AuthReducer.isAdmin;
  });

  const reduc = useSelector((state) => {
    return state.AuthReducer;
  });

  async function fetchData() {
    await DayOffService.getSpecialDays(
      reduc.user.userId,
      "Remote",
      reduc.user.token
    ).then((res) => {
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

  useDispatch()({
    type: "work-remote",
  });

  function onViewListWorkRemote() {
    fetchData();
    setShowList(!isShowList);
    DayOffService.getSpecialDays(
      reduc.user.userId,
      "Remote",
      reduc.user.token
    ).then((res) => {
      const response = res.data;

      if (response.payload != null) {
        // console.log("call api: ", response.payload);
        var listDays = response.payload.map((item) => {
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

        setListWFH(listDays);
      }
    });
  }

  function onSubmitWorkRemote() {
    setShowConfirmPopup(!isShowConfirmPopup);

    if (info == null || info.length === 0) {
      message.warning("Hãy chọn ngày xin làm việc từ xa");
      setShowConfirmPopup(!isShowConfirmPopup);
      return;
    }
  }

  function onCancelPopup() {
    setShowConfirmPopup(!isShowConfirmPopup);
  }

  function onConfirmWorkRemote() {
    if (reason == null || reason.length === 0) {
      message.error("Nhập lý do xin làm việc từ xa");
      return;
    }
    setShowConfirmPopup(!isShowConfirmPopup);
    info.forEach((e) => {
      wfh.push({
        userId: reduc.user.userId,
        dateTime: e._instance.range.start.toISOString(),
        option: typeDayOff.find((x) => x.type === e._def.title).option,
        type: specialDayType.find((x) => x.type === "Remote").value,
        reason: reason,
        isUrgent: false,
      });
    });

    DayOffService.createDayOff(wfh, reduc.user.token).then((res) => {
      const response = res.data;
      if (response.status === 200) {
        message.success("Yêu cầu xin nghỉ làm việc từ xa thành công");
        setReason("");
        setInfo([]);
        wfh = [];
        console.log(response.payload);
      }
    });
  }

  const deleteEvent = (id) => {
    DayOffService.deleteDayOff(id, reduc.user.token).then((res) => {
      const response = res.data;
      if (response.status === 200) {
        message.info("Xóa thành công", 2);
        setShowList(!isShowList);
        setReason("");
      }
    });
  };

  const options = {
    eventLimitText: "yêu cầu",
    editable: false,
    header: {
      left: "prev,next today",
      center: "title",
      right: "viewListWorkRemote",
    },
    footer: {
      center: "submitWorkRemote",
    },
    customButtons: {
      submitWorkRemote: {
        text: "Xin làm việc từ xa",
        click: () => onSubmitWorkRemote(),
      },
      viewListWorkRemote: {
        text: "Danh sách",
        icon: "mdi mdi mdi-format-line-style",
        click: () => onViewListWorkRemote(),
      },
    },
    buttonText: {
      listMonth: "Danh sách tháng",
    },
    plugins: [dayGridPlugin, interactionPlugin, listPlugin],
  };

  let wfh = [
    // { title: "Work Remote", start: new Date() }
  ];

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
      render: (type) => <a>{Utils.getDayOffTypeString(type)}</a>,
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        switch (status.key) {
          case 1:
            return <span class="badge badge-success">Chấp nhận</span>;
          case 2:
            return <span class="badge badge-warning">Chờ duyệt</span>;
          case 3:
            return (
              <span class="badge badge-secondary" style={{ width: "65px" }}>
                Từ chối
              </span>
            );
          default:
            return <span class="badge badge-warning">Chờ duyệt</span>;
        }
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

  return (
    <div class="row">
      <ConfirmDialog
        isShow={isShowConfirmPopup}
        title="Xin làm việc từ xa"
        onCancel={onCancelPopup}
        mainButtonText="Xác nhận"
        subButtonText="Đóng"
        mainButtonClick={onConfirmWorkRemote}
        subButtonClick={onCancelPopup}
      >
        <form onSubmit="" autocomplete="off">
          <div class="modal-body" style={{ padding: "0 0 10px 0" }}>
            <div class="row">
              <label class="col-sm-12 col-form-label">Lý do</label>
              <div class="col-sm-12">
                <div class="form-group">
                  <Input
                    class="form-group"
                    size="large"
                    required="true"
                    onChange={(e) => setReason(e.target.value)}
                  ></Input>
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
                  onClick={onViewListWorkRemote}
                >
                  <i class="mdi mdi-calendar-today"></i>
                </button>
                <h4 class="card-title mb-4">Danh sách xin làm việc từ xa</h4>

                <div class="table-data">
                  <Table columns={columns} dataSource={listWFH}></Table>
                </div>
              </div>
            ) : (
              <FullCalendar
                plugins={options.plugins}
                headerToolbar={options.header}
                footerToolbar={options.footer}
                eventLimitText={options.eventLimitText}
                selectable={true}
                editable={options.editable}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                events={initEvents}
                customButtons={options.customButtons}
                buttonText={options.buttonText}
                select={selectHandle}
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
