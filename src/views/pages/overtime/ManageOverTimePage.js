import React, { useState, useEffect } from "react";
import { Input, DatePicker, Table, TimePicker, message } from "antd";
import viVN from "antd/lib/locale/vi_VN";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import OverTimeService from "../../../services/OverTimeService.js";
import Utils from "../../../common/utils/Utils.js";

export default function ManageOverTimePage(props) {
  const user = useSelector((state) => {
    return state.AuthReducer.user;
  });

  useDispatch()({
    type: "overtime",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const params = useParams();
  const navigate = useNavigate();

  const [listOverTime, setListOverTime] = useState([]);

  const fetchData = () => {
    OverTimeService.getOverTimeByUserId(user.userId, user.token).then((res) => {
      var response = res.data;
      if (response != null) {
        if (response.status == 200) {
          if (response.payload == null) {
            return;
          }

          var models = response.payload.map((item) => {
            return {
              id: item.id,
              timeStart: item.timeStart,
              timeFinish: item.timeFinish,
              workTime: item.workTime,
              description: item.description,
              created: item.created,
            };
          });

          setListOverTime(models);
        } else {
          if (response.error != null) {
            message.error(response.error.message);
          }
        }
      }
    });
  };

  const handleCreateNewOverTime = () => {
    navigate("/overtime");
  };

  const handleDeleteOverTime = (overTimeId) => {
    console.log(overTimeId);
    OverTimeService.deleteOverTime(overTimeId, user.token)
      .then((res) => {
        var response = res.data;
        if (response.status == 200) {
          message.info("Xóa báo cáo tăng ca thành công", 1.5);
          fetchData();
        }
      })
      .catch((err) => {
        message.error("Xóa thất bại, vui lòng thử lại!!!");
      });
  };

  const columns = [
    {
      title: "Ngày tạo",
      key: "created",
      dataIndex: "created",
      render: (created) => <div>{Utils.formatISODateTime(created)}</div>,
    },
    {
      title: "Bắt đầu",
      key: "timeStart",
      dataIndex: "timeStart",
      render: (timeStart) => <div>{Utils.formatISODateTime(timeStart)}</div>,
    },
    {
      title: "Kết thúc",
      key: "timeFinish",
      dataIndex: "timeFinish",
      render: (timeFinish) => <div>{Utils.formatISODateTime(timeFinish)}</div>,
    },
    {
      title: "Tổng thời gian",
      key: "workTime",
      dataIndex: "workTime",
      render: (workTime) => <div>{workTime}</div>,
    },
    {
      title: "Nội dung",
      key: "description",
      dataIndex: "description",
      render: (description) => <div>{description}</div>,
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
            onClick={(e) => handleDeleteOverTime(id)}
          >
            {/* <i class="mdi mdi-close-circle-outline"></i> */}
            <i class="mdi mdi-delete-circle"></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div class="row">
      <div class="col-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Quản lý tăng ca</h4>
            <div class="d-flex justify-content-end mb-3">
              <div
                id="datatable_filter"
                className="dataTables_filter"
                style={{ textAlign: "left", marginRight: "10px" }}
              >
                <span class="d-flex align-items-center mr-2">
                  <label
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    Tìm
                  </label>
                  <input
                    style={{ marginLeft: "10px" }}
                    type="search"
                    className="form-control form-control-sm"
                    placeholder="Nội dung..."
                  />
                </span>
              </div>

              <button type="button" class="btn btn-light">
                <i class="mdi mdi-arrow-left-bold"></i>
              </button>

              <button type="button" class="btn btn-light mr-1">
                <i class="mdi mdi-arrow-right-bold"></i>
              </button>

              <button
                type="button"
                class="btn btn-custom btn-fw waves-effect float-right"
                title="Thêm giờ"
                onClick={handleCreateNewOverTime}
              >
                <i class="mdi mdi-plus"></i>
              </button>
            </div>
            <div class="table-data">
              <Table columns={columns} dataSource={listOverTime}></Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
