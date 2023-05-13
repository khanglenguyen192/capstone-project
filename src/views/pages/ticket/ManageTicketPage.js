import React, { useEffect, useState } from "react";
import { Table, Tag, Dropdown, Menu, message } from "antd";
import { useSelector } from "react-redux";
import NoImage from "../../../assets/images/no-image.jpg";
import TicketService from "../../../services/TicketService";
import { useNavigate } from "react-router-dom";
import dateFormat from "dateformat";

export default function ManageTicketPage(props) {
  const user = useSelector((state) => {
    return state.AuthReducer.user;
  });

  useEffect(() => {
    if (user == null) return;

    var searchCondition = {
      pageIndex: 0,
      pageSize: 100,
      assigneeId: user.userId,
    };

    searchTicket(searchCondition);
  }, []);

  const searchTicket = (searchCondition) => {
    TicketService.searchTicket(searchCondition, user.token).then((res) => {
      var response = res.data;
      if (response != null && response.status == 200) {
        setTotalTicket(response.payload.totalSize);
        if (response.payload.data != null) {
          var totalPending = 0;
          var totalInProgress = 0;
          var totalCompleted = 0;
          var ticketModels = response.payload.data.map((item) => {
            switch (item.ticketStatus) {
              case 0:
              case 1:
              case 2:
                totalInProgress += 1;
                break;
              case 3:
                totalCompleted += 1;
                break;
              case 4:
                totalPending += 1;
                break;
            }

            return {
              id: item.id,
              status: item.ticketStatus,
              title: item.title,
              assignorName: item.assignorName,
              assigneeName: item.assigneeName,
              created: item.created,
            };
          });

          setTotalInProgress(totalInProgress);
          setTotalPending(totalPending);
          setTotalClose(totalCompleted);
          setTickets(ticketModels);
        }
      }
    });
  };

  const navigate = useNavigate();

  const [totalTicket, setTotalTicket] = useState(0);
  const [totalInProgress, setTotalInProgress] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [totalClose, setTotalClose] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [selectedTicketId, setSelectedTicketId] = useState();
  const [showAssignTickets, setShowAssignTickets] = useState(false);

  const onMenuItemClick = function ({ key }) {
    switch (key) {
      case "view":
        if (selectedTicketId != null) {
          navigate("/edit-ticket/" + selectedTicketId);
        }
        break;
      case "close":
        break;
      case "remove":
        break;
      case "create-report":
        if (selectedTicketId != null) {
          navigate("/ticket/" + selectedTicketId + "/create-report");
        }
    }
  };

  const menuItems = (
    <Menu onClick={onMenuItemClick}>
      <Menu.Item key="view">
        <div class="dropdown-item" id="ticket-menu-id-1">
          <i class=" mdi mdi-eye mr-2 text-muted font-18 vertical-middle"></i>
          View Ticket
        </div>
      </Menu.Item>
      {showAssignTickets && (
        <Menu.Item key="close">
          <div class="dropdown-item" id="ticket-menu-id-2">
            <i class="mdi mdi-close-circle-outline mr-2 text-muted font-18 vertical-middle"></i>
            Close Ticket
          </div>
        </Menu.Item>
      )}
      {!showAssignTickets && (
        <Menu.Item key="create-report">
          <div class="dropdown-item" id="ticket-menu-id-3">
            <i class="mdi mdi-pencil mr-2 text-muted font-18 vertical-middle"></i>
            Create Report
          </div>
        </Menu.Item>
      )}
    </Menu>
  );

  const changeTicketList = () => {
    if (showAssignTickets) {
      var searchCondition = {
        pageIndex: 0,
        pageSize: 100,
        assigneeId: user.userId,
      };

      searchTicket(searchCondition);
      setShowAssignTickets(false);
    } else {
      var searchCondition = {
        pageIndex: 0,
        pageSize: 100,
        assignorId: user.userId,
      };

      searchTicket(searchCondition);
      setShowAssignTickets(true);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <b>#{text}</b>,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render: (title) => <div>{title}</div>,
    },
    {
      title: "Người yêu cầu",
      key: "assignorName",
      dataIndex: "assignorName",
      render: (assignorName) => {
        return (
          <div>
            <img
              src={NoImage}
              alt="contact-img"
              title="contact-img"
              class="rounded-circle"
            />
            <span class="ml-2">{assignorName}</span>
          </div>
        );
      },
    },
    {
      title: "Người thực hiện",
      dataIndex: "assigneeName",
      key: "assigneeName",
      render: (assigneeName) => (
        <div>
          <img
            src={NoImage}
            alt="contact-img"
            title="contact-img"
            class="rounded-circle"
          />
          <span class="ml-2">{assigneeName}</span>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        switch (status) {
          case 0:
            return <span class="badge badge-success">Open</span>;
          case 1:
          case 2:
            return <span class="badge badge-warning">In Progress</span>;
          case 3:
            return <span class="badge badge-secondary">Closed</span>;
          case 4:
            return <span class="badge badge-danger">Pending</span>;
          default:
            return <span class="badge badge-success">Open</span>;
        }
      },
    },
    {
      title: "Ngày khởi tạo",
      dataIndex: "created",
      key: "created",
      render: (created) => <div>{dateFormat(created, "dd/mm/yyyy")}</div>,
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "action",
      render: (id) => {
        return (
          <Dropdown
            trigger={["click"]}
            overlay={menuItems}
            onClick={() => setSelectedTicketId(id)}
          >
            <div class="btn-group dropdown">
              <div class="table-action-btn dropdown-toggle arrow-none btn btn-light btn-sm">
                <i class="mdi mdi-dots-horizontal"></i>
              </div>
            </div>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div class="row">
      <div class="col-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Quản lý công việc</h4>

            <div class="text-center mt-4 mb-4">
              <div class="row">
                <div class="col-md-6 col-xl-3">
                  <div class="card-box card-normal widget-flat border-custom bg-custom text-white">
                    <i class="fi-head"></i>
                    <h3 class="m-b-10">{totalTicket}</h3>
                    <p class="text-uppercase m-b-5 font-13 font-600">
                      Tổng Số Công Việc
                    </p>
                  </div>
                </div>
                <div class="col-md-6 col-xl-3">
                  <div class="card-box card-normal bg-primary widget-flat border-primary text-white">
                    <i class="fi-head"></i>
                    <h3 class="m-b-10">{totalInProgress}</h3>
                    <p class="text-uppercase m-b-5 font-13 font-600">
                      Đang thực hiện
                    </p>
                  </div>
                </div>
                <div class="col-md-6 col-xl-3">
                  <div class="card-box card-normal widget-flat border-success bg-success text-white">
                    <i class="fi-head"></i>
                    <h3 class="m-b-10">{totalPending}</h3>
                    <p class="text-uppercase m-b-5 font-13 font-600">
                      Tạm dừng
                    </p>
                  </div>
                </div>
                <div class="col-md-6 col-xl-3">
                  <div class="card-box card-normal bg-danger widget-flat border-danger text-white">
                    <i class="fi-head"></i>
                    <h3 class="m-b-10">{totalClose}</h3>
                    <p class="text-uppercase m-b-5 font-13 font-600">
                      Hoàn thành
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12 col-md-6">
                <div
                  id="datatable_filter"
                  className="dataTables_filter"
                  style={{ textAlign: "left" }}
                >
                  <label
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    Search
                    <input
                      style={{ marginLeft: "10px" }}
                      type="search"
                      className="form-control form-control-sm"
                    />
                  </label>
                </div>
              </div>
              <div className="col-sm-12 col-md-6">
                <button
                  type="button"
                  class="btn btn-custom btn-rounded w-md waves-effect waves-light mb-4 float-right"
                  onClick={changeTicketList}
                  style={{ width: "170px" }}
                >
                  {!showAssignTickets
                    ? "Công việc của tôi"
                    : "Công việc được giao"}
                </button>
              </div>
            </div>

            <Table
              columns={columns}
              dataSource={tickets}
              className="tickets-list"
            ></Table>
          </div>
        </div>
      </div>
    </div>
  );
}
