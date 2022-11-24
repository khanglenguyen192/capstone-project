import React from "react";
const LoginPage = () => {
  const background = {
    backgroundImage: "",
  };

  return (
    <div
      class="account-pages"
      style={{
        border: "none",
        padding: 0,
        margin: 0,
        "padding-bottom": "60px",
        " overflow-x": "hidden",
        "font-size": "14px",
        "background-color": "#f3f6f8",
      }}
    >
      <div
        class="accountbg"
        style={{
          "background-image": "url(" + background.backgroundImage + ")",
          "background-repeat": "no-repeat",
          "background-size": "cover",
          "background-position": "center",
        }}
      ></div>

      <div class="wrapper-page account-page-full">
        <div class="card">
          <div class="card-block">
            <div class="account-box">
              <div class="card-box p-5">
                <h2 class="text-uppercase text-center pb-4">
                  <a href="" class="text-success">
                    <span>Logo</span>
                  </a>
                </h2>
              </div>

              <form autocomplete="on" class="" action="#">
                <div class="form-group m-b-20 row">
                  <div class="col-12">
                    <label for="emailaddress">Email address</label>
                    <input
                      class="form-control"
                      type="email"
                      id="emailaddress"
                      required=""
                      placeholder="Enter your email"
                    ></input>
                  </div>
                </div>

                <div class="form-group row m-b-20">
                  <div class="col-12">
                    <a
                      href="page-recoverpw.html"
                      class="text-muted float-right"
                    >
                      <small>Forgot your password?</small>
                    </a>
                    <label for="password">Password</label>
                    <input
                      class="form-control"
                      type="password"
                      required=""
                      id="password"
                      placeholder="Enter your password"
                    ></input>
                  </div>
                </div>

                <div class="form-group row text-center m-t-10">
                  <div class="col-12">
                    <button
                      class="btn btn-block btn-custom waves-effect waves-light"
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

        <div class="m-t-40 text-center">
          <p class="account-copyright">
            2022 Capstone project - created by Khang
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
