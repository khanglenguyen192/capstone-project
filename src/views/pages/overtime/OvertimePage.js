import React, { useState, useEffect } from "react";
import "./Overtime.css";
import { Input, DatePicker, TimePicker, message } from "antd";
import viVN from "antd/lib/locale/vi_VN";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import OverTimeService from "../../../services/OverTimeService.js";

const timePickerFormat = "HH:mm";
const datePickerFormat = "DD/MM/YYYY";
const isoDateFormat = "YYYY-MM-DDTHH:mm:ss";

export default function OvertimePage(props) {
  useDispatch()({
    type: "overtime",
  });

  useEffect(() => {
    var date = dayjs();
    setStartDate(date.format(datePickerFormat));
    setStartTime(date.format(timePickerFormat));
    setEndDate(date.format(datePickerFormat));
    setEndTime(date.format(timePickerFormat));
  }, []);

  const user = useSelector((state) => {
    return state.AuthReducer.user;
  });

  const navigate = useNavigate();

  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endDate, setEndDate] = useState();
  const [endTime, setEndTime] = useState();
  const [workTime, setWorkTime] = useState();
  const [description, setDescription] = useState("");

  const handleSelectStartDate = (date, dateString) => {
    setStartDate(dateString);
  };

  const handleSelectEndDate = (date, dateString) => {
    setEndDate(dateString);
  };

  const handleSelectStartTime = (time, timeString) => {
    setStartTime(timeString);
  };

  const handleSelectEndTime = (time, timeString) => {
    setStartTime(timeString);
  };

  const handleSubmitOvertime = () => {
    if (workTime == null) {
      message.error("Vui lòng nhập số giờ làm việc");
      return;
    } else if (description == null || description.length == 0) {
      message.error("Vui lòng nhập nội dung công việc");
      return;
    }

    var timeStart = dayjs(
      startDate + " " + startTime,
      "DD/MM/YYYY HH:mm"
    ).format(isoDateFormat);

    var timeFinish = dayjs(endDate + " " + endTime, "DD/MM/YYYY HH:mm").format(
      isoDateFormat
    );

    var body = {
      workTime: workTime,
      description: description,
      userId: user.userId,
      timeStart: timeStart,
      timeFinish: timeFinish,
    };

    OverTimeService.createOverTime(body, user.token)
      .then((res) => {
        var response = res.data;
        if (response.status == 200) {
          message.info("Đăng ký tăng ca thành công");
          navigate("/home");
        } else {
          if (response.error != null) {
            message.error(response.error.message);
          } else {
            message.error("Đăng ký tăng ca thất bại");
          }
        }
      })
      .catch((res) => message.error("Đăng ký tăng ca thất bại"));
  };

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card-box">
          <div class="card-body">
            <div class="row">
              <label class="textbox-title col-md-6">Thời gian bắt đầu</label>
              <label class="textbox-title col-md-6 col-xs-6 col-lg-6">
                Thời gian kết thúc
              </label>
            </div>

            <div class="row">
              <div class="form-group col-md-2">
                <DatePicker
                  locale={viVN}
                  format={datePickerFormat}
                  size="large"
                  defaultValue={dayjs()}
                  onChange={handleSelectStartDate}
                ></DatePicker>
              </div>
              <div class="form-group col-md-4">
                <TimePicker
                  size="large"
                  format={timePickerFormat}
                  onChange={handleSelectStartTime}
                  showNow={false}
                  defaultValue={dayjs()}
                />
              </div>
              <div class="form-group col-md-2">
                <DatePicker
                  locale={viVN}
                  format={datePickerFormat}
                  onChange={handleSelectEndDate}
                  size="large"
                  defaultValue={dayjs()}
                ></DatePicker>
              </div>
              <div class="form-group col-md-4">
                <TimePicker
                  size="large"
                  format={timePickerFormat}
                  onChange={handleSelectEndTime}
                  showNow={false}
                  defaultValue={dayjs()}
                />
              </div>
            </div>

            <div class="row">
              <label class="textbox-title col-md-6">
                Số giờ (Không bao gồm thời gian làm việc riêng)
              </label>
            </div>

            <div class="row">
              <div class="form-group col-md-6">
                <Input
                  size="large"
                  class="form-control col-md-12"
                  type="number"
                  placeholder="1..."
                  value={workTime}
                  onChange={(e) => setWorkTime(e.target.value)}
                  style={{ fontWeight: "700" }}
                />
              </div>
            </div>

            <div class="row">
              <label class="textbox-title col-md-6">Nội dung công việc</label>
            </div>

            <div class="row">
              <div class="form-group col-md-12">
                <textarea
                  class="form-group col-md-12 textArea"
                  name="jobDescription"
                  rows="6"
                  value={description}
                  placeholder="Chi tiết công việc"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
          <div
            class="form-group text-right m-b-0"
            style={{ paddingRight: "20px" }}
          >
            <button
              class="btn btn-custom submit-btn waves-effect waves-light mr-2"
              type="button"
              onClick={handleSubmitOvertime}
            >
              Xác Nhận
            </button>
            <button
              class="btn btn-icon waves-effect waves-light btn-danger"
              onClick={handleCancel}
              type="button"
            >
              Hủy bỏ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
