import React, { useState } from "react";
import logo from "../../../assets/images/logo.png";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { message } from "antd";
import backgroundImage from "../../../assets/images/no-image.jpg";
import AuthService from "../../../services/AuthService";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import UserService from "../../../services/UserService";

const usePasswordToggle = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  let Icon, InputType;
  if (passwordVisible) {
    Icon = (
      <EyeOutlined
        id="eye-outline"
        onClick={() =>
          setPasswordVisible((passwordVisible) => !passwordVisible)
        }
      />
    );
    InputType = "text";
  } else {
    Icon = (
      <EyeInvisibleOutlined
        id="eye-outline"
        onClick={() =>
          setPasswordVisible((passwordVisible) => !passwordVisible)
        }
      />
    );
    InputType = "password";
  }

  return [Icon, InputType];
};

const ChangePasswordPage = () => {
  const user = useSelector((state) => {
    return state.AuthReducer.user;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [passCode, setPassCode] = useState("");
  const [newPassCode, setNewPassCode] = useState("");
  const [confirmPassCode, setConfirmPassCode] = useState("");
  const handleChangePassword = (e) => {
    if (passCode == "") {
      message.warning("Vui lòng nhập mật khẩu");
      return;
    }
    if (newPassCode == "") {
      message.warning("Vui lòng nhập mật khẩu mới");
      return;
    }
    if (confirmPassCode == "") {
      message.warning("Vui lòng xác nhận mật khẩu");
      return;
    }

    if (newPassCode !== confirmPassCode) {
      message.warning("Mật khẩu xác nhận không khớp");
      return;
    }

    UserService.changePassword(passCode, newPassCode, user.token).then(
      (res) => {
        var response = res.data;

        if (response != null && response.status == 200) {
          message.info("Đổi mật khẩu thành công");
          navigate("/home");
        } else {
          message.error("Đổi mật khẩu thất bại, vui lòng thử lại !!!", 1);
        }
      }
    );
  };

  const [Icon, InputType] = usePasswordToggle();

  return (
    <div className="login-pages">
      <div className="accountbg"></div>

      <div className="wrapper-page account-page-full">
        <div className="card">
          <div className="card-block">
            <div className="account-box">
              <div className="card-box p-5">
                <h2 className="text-uppercase text-center pb-4">
                  <a href="/" className="text-success">
                    <img id="logo" src={logo} alt="logo" />
                  </a>
                </h2>
              </div>

              <div className="form-group" style={{ margin: "3rem" }}>
                <div className="form-group row m-b-20">
                  <div className="col-12">
                    <label htmlFor="password">Mật khẩu hiện tại</label>
                    <div id="container-password">
                      <input
                        className="form-control"
                        type={InputType}
                        required
                        id="password"
                        placeholder="Mật khẩu hiện tại"
                        value={passCode}
                        onChange={(e) => setPassCode(e.target.value)}
                      />
                      {Icon}
                    </div>
                  </div>
                </div>

                <div className="form-group row m-b-20">
                  <div className="col-12">
                    <label htmlFor="password">Mật khẩu mới</label>
                    <div id="container-password">
                      <input
                        className="form-control"
                        type={InputType}
                        required
                        id="password"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Mật khẩu phải chứa ít nhất 8 kí tự, bao gồm: kí tự hoa, kí tự thường, chữ số và kí tự đặc biệt"
                        placeholder="Nhập mật khẩu mới"
                        value={newPassCode}
                        onChange={(e) => setNewPassCode(e.target.value)}
                      />
                      {Icon}
                    </div>
                  </div>
                </div>

                <div className="form-group row m-b-20">
                  <div className="col-12">
                    <label htmlFor="password">Xác nhận mật khẩu</label>
                    <div id="container-password">
                      <input
                        className="form-control"
                        type={InputType}
                        required
                        id="password"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Mật khẩu phải chứa ít nhất 8 kí tự, bao gồm: kí tự hoa, kí tự thường, chữ số và kí tự đặc biệt"
                        placeholder="Xác nhận mật khẩu"
                        value={confirmPassCode}
                        onChange={(e) => setConfirmPassCode(e.target.value)}
                      />
                      {Icon}
                    </div>
                  </div>
                </div>

                <div className="form-group row text-center m-t-10">
                  <div className="col-12">
                    <button
                      id="button-sign-up"
                      className="btn btn-block btn-custom waves-effect waves-light"
                      onClick={handleChangePassword}
                    >
                      Đổi mật khẩu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="m-t-40 text-center">
          <p className="account-copyright">2023 Capstone project</p>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
