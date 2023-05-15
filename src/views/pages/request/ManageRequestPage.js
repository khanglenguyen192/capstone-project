import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Checkbox, Input, Table, Tag, message } from "antd";
import Utils from "../../../common/utils/Utils";
import DayOffService from "../../../services/DayOffService";
import {
  typeDayOff,
  specialDayType,
  dayOffStatus,
} from "../../../common/constants/Constants";
import NoImage from "../../../assets/images/no-image.jpg";

export default function ManageRequestPage(props) {
  useDispatch()({
    type: "manage-request",
  });

  const user = useSelector((state) => {
    return state.AuthReducer.user;
  });

  const params = useParams;

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Nhân viên",
      key: "user",
      dataIndex: "user",
      render: (user) => {
        return (
          <div>
            <img
              src={Utils.getImageUrl(user.avatar)}
              alt="contact-img"
              title="contact-img"
              class="rounded-circle"
              style={{ width: "35px", height: "35px" }}
            />
            <span class="ml-2">{user.name}</span>
          </div>
        );
      },
    },
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
        switch (status) {
          case 1:
            return <span class="badge badge-success">Chấp nhận</span>;
          case 2:
            return <span class="badge badge-warning">Chờ duyệt</span>;
          case 3:
            return <span class="badge badge-secondary">Từ chối</span>;
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
            title="Chấp nhận"
            class="remove-dayoff-bt btn btn-icon btn-sm waves-effect waves-light btn-success"
            type="button"
          >
            <i class="mdi mdi-check-circle-outline"></i>
          </button>
          <button
            title="Từ chối"
            class="remove-dayoff-bt btn btn-icon btn-sm waves-effect waves-light btn-danger"
            type="button"
          >
            <i class="mdi mdi-close-circle-outline"></i>
          </button>
        </div>
      ),
    },
  ];

  const [listDayOff, setlistDayOff] = useState([]);

  const fetchData = () => {
    var searchModel = {};
    if (params.departmentId != undefined) {
      searchModel = {
        departmentId: params.departmentId,
        dayOffStatus: 2,
        pageIndex: 0,
        pageSize: 100,
      };
    }

    DayOffService.searchDayOff(searchModel, user.token).then((res) => {
      const response = res.data;

      if (response.payload != null && response.payload.data != null) {
        var result = response.payload.data.map((item) => {
          return {
            id: item.id,
            user: {
              name: item.userName,
              avatar: item.userAvatar,
            },
            reason: item.reason,
            date: new Date(item.dateTime).toLocaleDateString("vi-VN"),
            type: typeDayOff.find((x) => x.option == item.option).type,
            status: item.dayOffStatus,
          };
        });

        setlistDayOff(result);
      }
    });
  };

  return (
    <div class="row">
      <div class="col-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title mb-4">Danh sách xin nghỉ</h4>
            <div class="table-data">
              <Table columns={columns} dataSource={listDayOff}></Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
