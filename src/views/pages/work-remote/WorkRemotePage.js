import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import viLocale from "@fullcalendar/core/locales/vi";
import React, { useState } from "react";
import { Input, Table, Tag } from "antd";
import "./WorkRemotePage.css";

export default function WorkRemotePage(props) {
  const [isShowList, setShowList] = useState(false);

  function onViewListWorkRemote() {
    setShowList(!isShowList);
  }

  function onSubmitWorkRemote() {}

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

  const events = [{ title: "Work Remote", start: new Date() }];

  const columns = [
    {
      title: "Nhân viên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Lý do",
      dataIndex: "reason",
      key: "reason",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Ngày làm việc từ xa",
      dataIndex: "remoteDate",
      key: "remoteDate",
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
        <button
          title="Xóa"
          class="remove-dayoff-bt btn btn-icon btn-sm waves-effect waves-light btn-danger"
          type="button"
        >
          <i class="mdi mdi-delete-circle"></i>
        </button>
      ),
    },
  ];

  const listOfDisplayWorkRemoteDays = [
    {
      id: 1,
      name: props.userName,
      reason: "Làm giấy tờ",
      remoteDate: "28/02/2023",
      status: {
        key: 1,
        value: "Đã chấp nhận",
      },
    },
    {
      id: 2,
      name: props.userName,
      reason: "Làm giấy tờ",
      remoteDate: "28/02/2023",
      status: {
        key: 2,
        value: "Chờ xác nhận",
      },
    },
    {
      id: 3,
      name: props.userName,
      reason: "Làm giấy tờ",
      remoteDate: "28/02/2023",
      status: {
        key: 3,
        value: "Từ chối",
      },
    },
  ];

  return (
    <div class="row">
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
                <h4 class="card-title mb-4">Danh sách xin làm việc ở nhà</h4>

                <span class="d-flex align-items-center justify-content-end mr-0 mb-3">
                  Tìm: &nbsp;
                  <Input type="text" placeholder="'nội dung..'"></Input>
                </span>

                <div class="table-data">
                  <Table
                    columns={columns}
                    dataSource={listOfDisplayWorkRemoteDays}
                  ></Table>
                </div>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
