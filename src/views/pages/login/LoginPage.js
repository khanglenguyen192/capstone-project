import React, { useState } from "react";
import "./LoginPage.css";
import logo from "../../../assets/images/logo.png";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const updateField = e => {
    setForm({
      ...form,
      [e.target.type]: e.target.value
    });
  };

  return (
    <div
      className="login-pages">

      <div className="accountbg"></div>

      <div className="wrapper-page account-page-full">
        <div className="card">
          <div className="card-block">
            <div className="account-box">
              <div className="card-box p-5">
                <h2 className="text-uppercase text-center pb-4">
                  <a href="/" className="text-success">
                    <img id="logo" src={ logo } alt="logo" />
                  </a>
                </h2>
              </div>

              <form autoComplete="on" action="#" style={ { margin: "3rem" } }>
                <div className="form-group m-b-20 row">
                  <div className="col-12">
                    <label htmlFor="emailaddress">Email address</label>
                    <input
                      className="form-control"
                      type="email"
                      id="email-address"
                      required
                      pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
                      placeholder="Enter your email"
                      onChange={ updateField }
                    />
                  </div>
                </div>

                <div className="form-group row m-b-20">
                  <div className="col-12">
                    <label htmlFor="password">Password</label>
                    <input
                      className="form-control"
                      type="password"
                      required
                      id="password"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Mật khẩu phải chứa ít nhất 8 kí tự, bao gồm: kí tự hoa, kí tự thường, chữ số và kí tự đặc biệt"
                      placeholder="Enter your password"
                      onChange={ updateField }
                    />
                    <a
                      id="forgot-password"
                      href="home"
                      className="text-muted float-right">
                      <small>Forgot your password?</small>
                    </a>
                  </div>
                </div>

                <div className="form-group row text-center m-t-10">
                  <div className="col-12">
                    <button
                      className="btn btn-block btn-custom waves-effect waves-light"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="m-t-40 text-center">
          <p className="account-copyright">
            2022 Capstone project - created by Khang
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
