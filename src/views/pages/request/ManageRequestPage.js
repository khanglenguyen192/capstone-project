import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Checkbox, Input, Select, Table, Tag, message } from "antd";
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

  const params = useParams();

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
              src={ Utils.getImageUrl(user.avatar) }
              alt="contact-img"
              title="contact-img"
              class="rounded-circle"
              style={ { width: "35px", height: "35px" } }
            />
            <span class="ml-2">{ user.name }</span>
          </div>
        );
      },
    },
    {
      title: "Lý do",
      dataIndex: "reason",
      key: "reason",
      render: (text) => <a>{ text }</a>,
    },
    {
      title: "Ngày xin nghỉ",
      dataIndex: "date",
      key: "date",
      render: (text) => <a>{ text }</a>,
    },
    {
      title: "Hình thức",
      dataIndex: "type",
      key: "type",
      render: (type) => <a>{ Utils.getDayOffTypeString(type) }</a>,
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
      render: (id, info) => {
        if (info.status === 1 || info.status === 3) {
          return null;
        }
        return (
          <div className="opt-button">
            <button
              title="Chấp nhận"
              class="remove-dayoff-bt btn btn-icon btn-sm waves-effect waves-light btn-success"
              type="button"
              onClick={ () => onSubmit(id, "Chấp nhận") }
            >
              <i class="mdi mdi-check-circle-outline"></i>
            </button>
            <button
              title="Từ chối"
              class="remove-dayoff-bt btn btn-icon btn-sm waves-effect waves-light btn-danger"
              type="button"
              onClick={ () => onSubmit(id, "Từ chối") }
            >
              <i class="mdi mdi-close-circle-outline"></i>
            </button>
          </div>
        );
      },
    },
  ];

  const optionFilter = [
    {
      value: null,
      label: 'Tất cả',
    },
    {
      value: 1,
      label: "Chấp nhận",
    },
    {
      value: 2,
      label: "Chờ xét duyệt",
    },
    {
      value: 3,
      label: "Từ chối",
    },
  ];

  const [listDayOff, setlistDayOff] = useState([]);

  const fetchData = () => {
    let searchModel = {};
    if (params.departmentId != undefined) {
      searchModel = {
        departmentId: params.departmentId,
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

  const onSubmit = (dayId, status) => {
    DayOffService.handleRequest({
      ID: dayId,
      dayOffStatus: dayOffStatus.find(x => x.status === status).value,
    }, user.token).then((res) => {
      const response = res.data;

      if (response.payload != null) {
        message.success("Thành công", 2);
        window.location.reload();
      }
    });
  };

  const selectFilter = (status) => {
    let searchModel = {
      departmentId: params.departmentId,
      dayOffStatus: status,
      pageIndex: 0,
      pageSize: 100,
    };

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
            <div class="row">
              <div class="col-md-6">
                <h4 class="card-title mb-4">Danh sách xin nghỉ</h4>
              </div>
              <div class="col-md-6">
                <div class="float-right mr-4">
                  <Select
                    labelInValue
                    defaultValue={ optionFilter[0] }
                    style={ {
                      width: 150,
                      marginBottom: 20,
                    } }
                    onChange={ (e) => selectFilter(e.value) }
                    options={ optionFilter } />
                </div>
              </div>
            </div>
            <div class="table-data">
              <Table columns={ columns } dataSource={ listDayOff }></Table>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
