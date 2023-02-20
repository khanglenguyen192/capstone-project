import React from "react";

const LoginPage = () => {
  const background = {
    backgroundImage: "../../assets/images/no-image.jpg",
  };

  return (
    <div
      className="account-pages"
      style={{
        border: "none",
        padding: 0,
        margin: 0,
        paddingBottom: "60px",
        overflowX: "hidden",
        fontSize: "14px",
        backgroundColor: "#f3f6f8",
      }}
    >
      <div
        className="accountbg"
        style={{
          backgroundImage: `url(${background.backgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="wrapper-page account-page-full">
        <div className="card">
          <div className="card-block">
            <div className="account-box">
              <div className="card-box p-5">
                <h2 className="text-uppercase text-center pb-4">
                  <a href="/" className="text-success">
                    <span>Logo</span>
                  </a>
                </h2>
              </div>

              <form autoComplete="on" action="#">
                <div className="form-group m-b-20 row">
                  <div className="col-12">
                    <label htmlFor="emailaddress">Email address</label>
                    <input
                      className="form-control"
                      type="email"
                      id="emailaddress"
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="form-group row m-b-20">
                  <div className="col-12">
                    <a
                      href="page-recoverpw.html"
                      className="text-muted float-right"
                    >
                      <small>Forgot your password?</small>
                    </a>
                    <label htmlFor="password">Password</label>
                    <input
                      className="form-control"
                      type="password"
                      required
                      id="password"
                      placeholder="Enter your password"
                    />
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
