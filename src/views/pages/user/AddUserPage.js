import React, { useState } from "react";
import NoImage from "../../../assets/images/no-image.jpg";
import { Input, Cascader, DatePicker, message } from "antd";
import viVN from "antd/lib/locale/vi_VN";
import Constants from "../../../common/constants/Constants";
import UserService from "../../../services/UserService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AddUserPage(props) {
  const user = useSelector((state) => {
    return state.AuthReducer.user;
  });

  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [userCode, setUserCode] = useState();
  const [role, setRole] = useState();
  const [fullName, setFullName] = useState();
  const [gender, setGender] = useState();
  const [dateJoinCompany, setDateJoinCompany] = useState();

  const genderModels = Constants.genders;

  const handleCreateUser = () => {
    if (email === undefined || email === null) {
      message.error("Email không được trống", 1);
      return;
    }

    var body = {
      email: email,
      userName: email,
      phone: phone,
      userCode: userCode,
      role: role,
      fullName: fullName,
      gender: gender,
      dateJoinCompany: dateJoinCompany,
    };

    console.log(body);

    UserService.createUser(body, user.token).then((res) => {
      var response = res.data;

      if (response != null && response.status == 200) {
        message.info("Thêm nhân viên thành công");
        navigate("/home");
      } else {
        message.error("Thêm nhân viên thất bại, vui lòng thử lại !!!", 1);
      }
    });
  };

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <div class="row" id="edit-user-profile">
      <div class="col-12 grid-margin stretch-card">
        <div class="card-box">
          <div class="card-body">
            <h4 class="card-title">THÔNG TIN CƠ BẢN</h4>

            <div class="row">
              <div class="col-md-6 col-xs-6 col-lg-6 col-sm-6">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label">Email</label>
                  <div class="col-sm-12">
                    <Input
                      class="app-text"
                      size="large"
                      name=""
                      onChange={(e) => setEmail(e.target.value)}
                    ></Input>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label">Mã nhân viên</label>
                  <div class="col-sm-12">
                    <Input
                      class="app-text"
                      size="large"
                      name=""
                      onChange={(e) => setUserCode(e.target.value)}
                    ></Input>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-xs-6 col-lg-6 col-sm-6">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label">Số điện thoại</label>
                  <div class="col-sm-12">
                    <Input
                      class="app-text"
                      size="large"
                      name=""
                      onChange={(e) => setPhone(e.target.value)}
                    ></Input>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label">Chức vụ</label>
                  <div class="col-sm-12">
                    <Input
                      class="app-text"
                      size="large"
                      name=""
                      onChange={(e) => setRole(e.target.value)}
                    ></Input>
                  </div>
                </div>
              </div>
            </div>

            <h4 class="card-title">THÔNG TIN CÁ NHÂN</h4>

            <div class="row">
              <div class="col-md-6 col-xs-6 col-lg-6 col-sm-6">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label">Họ và tên</label>
                  <div class="col-sm-12">
                    <Input
                      class="app-text"
                      size="large"
                      name=""
                      onChange={(e) => setFullName(e.target.value)}
                    ></Input>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label">
                    Ngày vào công ty
                  </label>
                  <div class="col-sm-12">
                    <DatePicker
                      locale={viVN}
                      format="DD/MM/YYYY"
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="DD/MM/YYYY"
                      onChange={(date, dateString) => setDateJoinCompany(date)}
                    ></DatePicker>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-xs-6 col-lg-6 col-sm-6">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label">Giới tính</label>
                  <div class="col-sm-12">
                    <Cascader
                      size="large"
                      name="genderModel"
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      placement="bottomRight"
                      options={genderModels}
                      placeholder="Chọn"
                      onChange={(value, selectedOption) =>
                        setGender(value.at(0))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group text-right m-b-0">
            <button
              class="btn btn-custom submit-btn waves-effect waves-light mr-2"
              onClick={handleCreateUser}
            >
              Xác Nhận
            </button>
            <button
              class="btn btn-icon waves-effect waves-light btn-danger"
              onClick={handleCancel}
            >
              Hủy bỏ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
