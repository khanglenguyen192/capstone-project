import React, { useState } from "react";
import "./LoginPage.css";
import logo from "../../../assets/images/logo.png";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { message } from "antd";
import backgroundImage from "../../../assets/images/no-image.jpg";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/AuthService";
import { useSelector, useDispatch } from "react-redux";

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

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const updateField = (e) => {
    setForm({
      ...form,
      [e.target.type]: e.target.value,
    });
  };
  const dispatch = useDispatch();
  const [email, setEmail] = useState("root@gmail.com");
  const [passCode, setPassCode] = useState("123456x@X");
  const handleLogin = (e) => {
    AuthService.login(email, passCode)
      .then((res) => {
        const response = res.data;
        if (response.status === 200) {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { user: response.payload },
          });
        } else {
          message.error("Đăng nhập thất bại");
        }
      })
      .catch((res) => {
        message.error("Đăng nhập thất bại");
      });
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
                <div className="form-group m-b-20 row">
                  <div className="col-12">
                    <label htmlFor="emailaddress">Email address</label>
                    <input
                      className="form-control"
                      type="email"
                      id="email-address"
                      required
                      pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
                      title="Tài khoản gmail cá nhân đã được cung cấp"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group row m-b-20">
                  <div className="col-12">
                    <label htmlFor="password">Password</label>
                    <div id="container-password">
                      <input
                        className="form-control"
                        type={InputType}
                        required
                        id="password"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Mật khẩu phải chứa ít nhất 8 kí tự, bao gồm: kí tự hoa, kí tự thường, chữ số và kí tự đặc biệt"
                        placeholder="Enter your password"
                        value={passCode}
                        onChange={(e) => setPassCode(e.target.value)}
                      />
                      {Icon}
                    </div>
                    <a
                      id="forgot-password"
                      href="forgot-password"
                      className="text-muted float-right"
                    >
                      <small>Forgot your password?</small>
                    </a>
                  </div>
                </div>

                <div className="form-group row text-center m-t-10">
                  <div className="col-12">
                    <button
                      id="button-sign-up"
                      className="btn btn-block btn-custom waves-effect waves-light"
                      onClick={handleLogin}
                    >
                      Sign In
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

export default LoginPage;
