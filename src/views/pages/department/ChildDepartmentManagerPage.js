import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NoImage from "../../../assets/images/no-image.jpg";
import {
  Input,
  Cascader,
  Table,
  Tag,
  Menu,
  Dropdown,
  message,
  Button,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import DepartmentService from "../../../services/DepartmentService";
import Utils from "../../../common/utils/Utils";

export default function ChildDepartmentManagerPage(props) {
  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => {
    return state.AuthReducer.user;
  });
  const isAdmin = useSelector((state) => {
    console.log(state.AuthReducer);
    return state.AuthReducer.isAdmin;
  });

  useDispatch()({
    type: "department",
  });

  useEffect(() => {
    getDepartmentManagers();
    getDepartment();
  }, []);

  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(0);
  const [departmentName, setDepartmentName] = useState("");

  const handleAddTicketUser = (userId) => {
    navigate(
      "/department/" + params.departmentId + "/user/" + userId + "/add-ticket"
    );
  };

  const handleViewTicketsUser = (userId) => {
    navigate(
      "/department/" + params.departmentId + "/user/" + userId + "/tickets"
    );
  };

  const getDepartmentManagers = () => {
    DepartmentService.getDepartmentManagers(
      params.departmentId,
      user.token
    ).then((res) => {
      const response = res.data;

      if (response.payload != null) {
        var users = response.payload.map((item) => {
          var model = {
            id: item.id,
            employeeCode: "#" + item.id,
            name: item.fullName,
            role: Utils.getDepartmentRoleString(item.departmentRole),
            status: "Trực tuyến",
            email: item.email,
            departmentName: item.departmentName,
          };

          return model;
        });

        setEmployees(users);
      }
    });
  };

  const getDepartment = () => {
    DepartmentService.getDepartment(params.departmentId, user.token).then(
      (res) => {
        var response = res.data;
        if (
          response != null &&
          response != undefined &&
          response.status == 200
        ) {
          var department = response.payload;
          setDepartmentName(department.departmentName);
        }
      }
    );
  };

  const columns = [
    {
      title: "Mã nhân viên",
      dataIndex: "employeeCode",
      key: "employeeCode",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Nơi làm việc",
      dataIndex: "departmentName",
      key: "departmentName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let color = status.length % 2 == 0 ? "green" : "red";
        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Tác vụ",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Dropdown
          trigger={["click"]}
          overlay={itemMenu}
          onClick={() => {
            setSelectedEmployeeId(id);
          }}
        >
          <div class="btn-group dropdown">
            <div class="table-action-btn dropdown-toggle arrow-none btn btn-light btn-sm">
              <i class="mdi mdi-format-list-bulleted-type"></i>
            </div>
          </div>
        </Dropdown>
      ),
    },
  ];

  const onItemMenuClick = ({ key }) => {
    switch (key) {
      case "add-ticket":
        handleAddTicketUser(selectedEmployeeId);
        break;
      case "view-tickets":
        handleViewTicketsUser(selectedEmployeeId);
        break;
      case "remove-permission":
        if (user.userId != 1) {
          return;
        }
        var body = {
          departmentId: params.departmentId,
          userId: parseInt(selectedEmployeeId),
          roleId: 3,
        };
        DepartmentService.updateUser(body, user.token)
          .then((res) => {
            var response = res.data;
            if (response == null || response == undefined) {
              message.error("Có lỗi xảy ra, vui lòng thử lại!!!");
              return;
            }

            if (response.status == 200) {
              message.info("Cập nhật thành công");
              getDepartmentManagers();
            } else {
              message.error("Lỗi: " + response.error.message);
            }
          })
          .catch((res) => {
            message.error("Có lỗi xảy ra, vui lòng thử lại!!!");
          });
        break;
      case "requests":
        navigate("/user/" + selectedEmployeeId + "/requests");
        break;
    }
  };

  const itemMenu = (
    <Menu onClick={onItemMenuClick}>
      <Menu.Item key="user-info">
        <div class="dropdown-item" id="ticket-menu-id-1">
          <i class="mdi mdi-account-circle menu-icon mr-2 text-muted font-18 vertical-middle"></i>
          Thông tin nhân sự
        </div>
      </Menu.Item>
      <Menu.Item key="view-tickets">
        <div class="dropdown-item" id="ticket-menu-id-1">
          <i class="mdi mdi-note-text menu-icon mr-2 text-muted font-18 vertical-middle"></i>
          Công việc
        </div>
      </Menu.Item>
      <Menu.Item key="add-ticket">
        <div class="dropdown-item" id="ticket-menu-id-1">
          <i class="mdi mdi-plus-circle menu-icon mr-2 text-muted font-18 vertical-middle"></i>
          Tạo công việc
        </div>
      </Menu.Item>
      <Menu.Item key="requests">
        <div class="dropdown-item" id="ticket-menu-id-1">
          <i class=" mdi mdi-calendar-today menu-icon mr-2 text-muted font-18 vertical-middle"></i>
          Yêu cầu
        </div>
      </Menu.Item>
      {isAdmin && (
        <Menu.Item key="remove-permission">
          <div class="dropdown-item" id="ticket-menu-id-1">
            <i class="mdi mdi-account-key menu-icon mr-2 text-muted font-18 vertical-middle"></i>
            Thu hồi quyền
          </div>
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <div class="row">
      <div class="col-12 grid-margin">
        <div class="card">
          <form>
            <div class="card-body">
              <h4 class="card-title">{departmentName} - Danh sách quản lý</h4>

              <Table
                size="large"
                columns={columns}
                dataSource={employees}
              ></Table>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
