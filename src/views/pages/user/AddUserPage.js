import React, { useState } from "react";
import NoImage from "../../../assets/images/no-image.jpg";
import { Input, Cascader, DatePicker, message } from "antd";
import viVN from "antd/lib/locale/vi_VN";
import Constants from "../../../common/constants/Constants";
import UserService from "../../../services/UserService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Utils from "../../../common/utils/Utils";
import dateFormat from "dateformat";
import { useDispatch } from "react-redux";

export default function AddUserPage(props) {
  const user = useSelector((state) => {
    return state.AuthReducer.user;
  });

  useDispatch()({
    type: "add-user",
  });

  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [userCode, setUserCode] = useState();
  const [role, setRole] = useState(3);
  const [fullName, setFullName] = useState();
  const [gender, setGender] = useState();
  const [dateJoinCompany, setDateJoinCompany] = useState();
  const [basicSalary, setBasicSalary] = useState(0);
  const [lunchMoney, setLunchMoney] = useState(0);
  const [petrolMoney, setPetrolMoney] = useState(0);
  const [housingSupport, setHousingSupport] = useState(0);
  const [hourSalary, setHourSalary] = useState(0);
  const [telephoneFee, setTelephoneFee] = useState(0);
  const [salaryType, setSalaryType] = useState(1);
  const [reduceYourself, setReduceYourself] = useState(0);

  const genderModels = Constants.genders;

  const roleModels = Constants.roles;

  const salaryTypeModels = Constants.salaryTypes;

  const handleCreateUser = () => {
    if (email === undefined || email === null) {
      message.error("Email không được trống", 1.5);
      return;
    }

    if (gender == null || gender.length == 0) {
      message.error("Vui lòng chọn giới tính", 1.5);
      return;
    }

    if (role == null || role.length == 0) {
      setRole(3);
    }

    if (salaryType == null || salaryType.length == 0) {
      setSalaryType(2);
    }

    var body = {
      userId: 0,
      email: email,
      userName: email,
      userName: email,
      phone: phone,
      userCode: userCode,
      role: role,
      fullName: fullName,
      gender: gender,
      dateJoinCompany: dateFormat(dateJoinCompany, "dd/mm/yyyy"),
      basicSalary: Number(basicSalary),
      lunchMoney: Number(lunchMoney),
      petrolMoney: Number(petrolMoney),
      housingSupport: Number(housingSupport),
      hourSalary: Number(hourSalary),
      telephoneFee: Number(telephoneFee),
      salaryType: salaryType,
      reduceYourself: Number(reduceYourself),
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
                  <label class="col-sm-4 col-form-label">Vai trò</label>
                  <div class="col-sm-12">
                    <Cascader
                      size="large"
                      name="roleModels"
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      placement="bottomRight"
                      options={roleModels}
                      placeholder="Chọn"
                      onChange={(value, selectedOption) => {
                        if (value != null && value.length > 0)
                          setRole(value.at(0));
                      }}
                    />
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
                      onChange={(value, selectedOption) => {
                        if (value != null && value.length > 0)
                          setGender(value.at(0));
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <h4 class="card-title">THÔNG TIN LIÊN QUAN</h4>
            <div class="row">
              <div class="col-md-6 col-xs-6 col-lg-6 col-sm-6">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label">Lương cơ bản</label>
                  <div class="col-sm-12">
                    <Input
                      class="app-text"
                      size="large"
                      name=""
                      type="number"
                      step="any"
                      value={basicSalary}
                      onChange={(e) => setBasicSalary(e.target.value)}
                    ></Input>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label">Tiền ăn trưa</label>
                  <div class="col-sm-12">
                    <Input
                      class="app-text"
                      size="large"
                      name=""
                      type="number"
                      step="any"
                      value={lunchMoney}
                      onChange={(e) => setLunchMoney(e.target.value)}
                    ></Input>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label">Phí xăng xe</label>
                  <div class="col-sm-12">
                    <Input
                      class="app-text"
                      size="large"
                      name=""
                      type="number"
                      step="any"
                      value={petrolMoney}
                      onChange={(e) => setPetrolMoney(e.target.value)}
                    ></Input>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-6 col-form-label">
                    Khấu trừ bản thân
                  </label>
                  <div class="col-sm-12">
                    <Input
                      class="app-text"
                      size="large"
                      name=""
                      type="number"
                      step="any"
                      value={reduceYourself}
                      onChange={(e) => setReduceYourself(e.target.value)}
                    ></Input>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-xs-6 col-lg-6 col-sm-6">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label">Lương theo giờ</label>
                  <div class="col-sm-12">
                    <Input
                      class="app-text"
                      size="large"
                      name=""
                      type="number"
                      step="any"
                      value={hourSalary}
                      onChange={(e) => setHourSalary(e.target.value)}
                    ></Input>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label">Loại lương</label>
                  <div class="col-sm-12">
                    <Cascader
                      size="large"
                      name="salaryTypeModels"
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      placement="bottomRight"
                      options={salaryTypeModels}
                      placeholder="Chọn"
                      onChange={(value, selectedOption) => {
                        if (value != null && value.length > 0)
                          setSalaryType(value.at(0));
                      }}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label">Phí điện thoại</label>
                  <div class="col-sm-12">
                    <Input
                      class="app-text"
                      size="large"
                      name=""
                      type="number"
                      step="any"
                      value={telephoneFee}
                      onChange={(e) => setTelephoneFee(e.target.value)}
                    ></Input>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label">Hỗ trợ tiền nhà</label>
                  <div class="col-sm-12">
                    <Input
                      class="app-text"
                      size="large"
                      name=""
                      type="number"
                      step="any"
                      value={housingSupport}
                      onChange={(e) => setHousingSupport(e.target.value)}
                    ></Input>
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
