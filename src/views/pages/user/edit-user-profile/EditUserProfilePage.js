import React, { useState } from "react";
import NoImage from "../../../../assets/images/no-image.jpg";
import "./EditUserProfilePage.css";
import { Input, Cascader, DatePicker } from "antd";
import viVN from "antd/lib/locale/vi_VN";
import UploadFile from "../../../components/UploadFile";
import { useSelector } from "react-redux";

export default function EditUserProfilePage(props) {
  const [isSelfEditting, setSelfEditing] = useState(true);

  const isAdmin = useSelector((state) => {
    return state.AuthReducer.isAdmin;
  });

  const genderModels = [
    {
      value: 1,
      label: "Nam",
    },
    {
      value: 2,
      label: "Nữ",
    },
    {
      value: 3,
      label: "Khác",
    },
  ];

  const salaryTypeModels = [
    {
      value: 1,
      label: "Net",
    },
    {
      value: 2,
      label: "Gross",
    },
  ];

  const userInfo = {
    usercode: "#123456",
    fullname: "Trần Văn A",
    email: "example@gmail.com",
    numberOfDenpendents: 1,
    bankAccount: "XXXX-XXXX-XXXX",
    phone: "XXXX XXX XXX",
    linkedId: "https://www.linkedin.com/in/user",
    facebookId: "https://www.facebook.com/profile.php?user",
    genderModel: {
      id: 1,
      name: "Nam",
    },
  };

  function renderGenderLabel(genderModel) {
    switch (genderModel.id) {
      case 1:
        return <label class="badge badge-info ml-3">{genderModel.name}</label>;
      case 2:
        return (
          <label class="badge-success badge ml-3">{genderModel.name}</label>
        );
      case 3:
      default:
        return (
          <label class="badge-danger badge ml-3">{genderModel.name}</label>
        );
    }
  }

  return (
    <div>
      <div class="row" id="edit-user-profile">
        <div class="col-12 grid-margin stretch-card">
          <div class="card-box">
            <form>
              <div class="card-body">
                <h4 class="card-title">CẬP NHẬT THÔNG TIN</h4>

                <div className="row">
                  <div class="col-md-6 col-xs-6 col-lg-6 col-sm-6">
                    <div class="form-group row d-flex justify-content-center align-items-center">
                      <div class="thumb-xxl member-thumb m-b-10">
                        {isSelfEditting ? (
                          <img
                            src={NoImage}
                            class="img-cover rounded-circle img-thumbnail no-border"
                          ></img>
                        ) : (
                          <img
                            src={NoImage}
                            class="img-cover rounded-circle img-thumbnail no-border"
                          ></img>
                        )}
                      </div>
                    </div>

                    <div class="form-group row d-flex justify-content-center align-items-center">
                      <div class="row justify-content-center align-items-center">
                        {isSelfEditting ? (
                          <label class="col-form-label font-weight-bold">
                            Mã nhân viên: {userInfo.usercode}
                          </label>
                        ) : (
                          <div class="col-form-label font-weight-bold">
                            {/* <app-text-box
                            class="app-text"
                            type="text"
                            name="usercode"
                          ></app-text-box> */}
                            <Input
                              class="app-text"
                              size="large"
                              name="usercode"
                            ></Input>
                          </div>
                        )}
                      </div>
                    </div>

                    <UploadFile isAdmin={ isAdmin } placeholder="Hình thẻ"></UploadFile>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">Họ và tên</label>
                      {isSelfEditting ? (
                        <div class="col-sm-8">
                          <Input
                            size="large"
                            placeholder={userInfo.fullname}
                          ></Input>
                        </div>
                      ) : (
                        <label class="col-sm-8 col-form-label font-weight-bold">
                          {userInfo.fullname}
                        </label>
                      )}
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">Email</label>
                      {isSelfEditting ? (
                        <div class="col-sm-8">
                          <Input
                            size="large"
                            type="email"
                            pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
                            placeholder={ userInfo.email }
                            style={ { fontWeight: '700' } }
                          ></Input>
                        </div>
                      ) : (
                        <label class="col-sm-8 col-form-label font-weight-bold">
                          {userInfo.email}
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                {isAdmin && (
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-4 col-form-label">
                          Loại lương
                        </label>
                        <div class="col-sm-8">
                          <Cascader
                            size="large"
                            name="genderModel"
                            style={{
                              width: "100%",
                            }}
                            options={salaryTypeModels}
                            placeholder="Loại lương"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-4 col-form-label">
                          Số người phụ thuộc
                        </label>
                        {isSelfEditting ? (
                          <label class="col-sm-8 col-form-label font-weight-bold">
                            {userInfo.numberOfDenpendents}
                          </label>
                        ) : (
                          <div class="col-sm-8">
                            <Input
                              size="large"
                              placeholder={userInfo.numberOfDenpendents}
                            ></Input>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">
                        Tài khoản ngân hàng
                      </label>
                      {isSelfEditting ? (
                        <div class="form-group col-sm-8">
                          <Input
                            size="large"
                            pattern="[0-9]{9,14}"
                            placeholder={ userInfo.bankAccount }
                            style={ { fontWeight: '700' } }
                          ></Input>
                        </div>
                      ) : (
                        <label class="form-group col-sm-8 col-form-label font-weight-bold">
                          {userInfo.bankAccount}
                        </label>
                      )}
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">
                        Số điện thoại
                      </label>
                      {isSelfEditting ? (
                        <div class="col-sm-8">
                          <Input
                            size="large"
                            pattern="(0)([0-9]{9,10})"
                            placeholder={ userInfo.phone }
                            style={ { fontWeight: '700' } }
                          ></Input>
                        </div>
                      ) : (
                        <label class="col-sm-8 col-form-label font-weight-bold">
                          {userInfo.phone}
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">Giới tính</label>
                      {isSelfEditting ? (
                        <div class="col-sm-8">
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
                          />
                        </div>
                      ) : (
                        <div>{renderGenderLabel(userInfo.genderModel)}</div>
                      )}
                    </div>
                  </div>
                  {!isAdmin && (
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-4 col-form-label">Ngày sinh</label>
                        {isSelfEditting ? (
                          <div class="col-sm-8">
                            <div class="input-group">
                              <DatePicker
                                locale={viVN}
                                format="DD/MM/YYYY"
                                size="large"
                                style={{ width: "100%" }}
                                placeholder="DD/MM/YYYY"
                              ></DatePicker>
                            </div>
                          </div>
                        ) : (
                          <label class="col-sm-8 col-form-label font-weight-bold">
                            {userInfo.birthday}
                          </label>
                        )}
                      </div>
                    </div>
                  )}
                  {isAdmin && (
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-4 col-form-label">
                          Ngày vào công ty
                        </label>
                        <div class="col-sm-8">
                          <div class="input-group">
                            <DatePicker
                              locale={viVN}
                              format="DD/MM/YYYY"
                              size="large"
                              style={{ width: "100%" }}
                              placeholder="DD/MM/YYYY"
                            ></DatePicker>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">
                        Tài khoản LinkedIn
                      </label>
                      {isSelfEditting ? (
                        <div class="col-sm-8">
                          <Input
                            size="large"
                            type="text"
                            class="form-control"
                            name="linkedId"
                            placeholder="https://www.linkedin.com/in/user/"
                          />
                        </div>
                      ) : (
                        <label class="col-sm-8 col-form-label font-weight-bold">
                          {userInfo.linkedId}
                        </label>
                      )}
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">
                        Tài khoản Facebook
                      </label>
                      {isSelfEditting ? (
                        <div class="col-sm-8">
                          <Input
                            size="large"
                            type="text"
                            class="form-control"
                            name="facebookId"
                            placeholder="https://www.facebook.com/profile.php?user"
                          />
                        </div>
                      ) : (
                        <label class="col-sm-8 col-form-label font-weight-bold">
                          {userInfo.facebookId}
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group text-right m-b-0">
                <button class="btn btn-custom submit-btn waves-effect waves-light mr-2"
                  style={ { right: '5rem' } }
                >
                  Xác Nhận
                </button>
                { isSelfEditting ? (
                  <button class="btn btn-icon waves-effect waves-light btn-danger"
                    routerLink="/"
                    style={ { right: '3rem' } }
                  >
                    Hủy bỏ
                  </button>
                ) : (
                  <button
                    class="btn btn-icon waves-effect waves-light btn-danger"
                    routerLink="/users"
                    style={ { right: '3rem' } }
                  >
                    Hủy bỏ
                  </button>
                ) }
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 grid-margin stretch-card">
          <div class="card-box">
            <form onsubmit="editUserIdentity(form)" autocomplete="on">
              <div class="card">
                <div class="card-body">
                  {isSelfEditting ? (
                    <h4 class="card-title">CẬP NHẬT THÔNG TIN CCCD</h4>
                  ) : (
                    <h4 class="card-title">THÔNG TIN CCCD</h4>
                  )}

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group row d-flex justify-content-center align-items-center flex-column containerImage">
                        <img
                          class="d-flex justify-content-center align-items-end col-form-label-lg img-cover img-fluid imageId"
                          src={NoImage}
                          altImg="image"
                          width="200"
                        ></img>
                        <div class="col-sm-8">
                          <div class="vertical-center">
                            { isSelfEditting && (
                              <UploadFile isAdmin={ isAdmin } placeholder="Mặt trước CCCD" />
                            ) }
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row d-flex justify-content-center align-items-center flex-column containerImage">
                        <img
                          class="d-flex justify-content-center align-items-end col-form-label-lg img-cover img-fluid imageId"
                          src={NoImage}
                          altImg="image"
                          width="200"
                        ></img>
                        <div class="col-sm-8">
                          <div class="vertical-center">
                            { isSelfEditting && (
                              <UploadFile isAdmin={ isAdmin } placeholder="Mặt sau CCCD"/>
                            ) }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-4 col-form-label">Số CCCD</label>
                        <div class="col-sm-8">
                          <Input
                            size="large"
                            type="text"
                            class="form-control"
                            name="userIdentity"
                            pattern="[0-9]{12}"
                            disabled={ !isSelfEditting }
                            placeholder="XXXX XXXX XXXX"
                            style={ { fontWeight: '700' } }
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-4 col-form-label">Ngày cấp</label>
                        <div class="col-sm-8">
                          <div class="input-group">
                            <DatePicker
                              locale={viVN}
                              format="DD/MM/YYYY"
                              size="large"
                              style={{ width: "100%" }}
                              placeholder="DD/MM/YYYY"
                            ></DatePicker>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-4 col-form-label">Nơi cấp</label>
                        <div class="col-sm-8">
                          <Input
                            size="large"
                            type="text"
                            class="form-control"
                            name="address"
                            disabled={!isSelfEditting}
                            placeholder=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                { isSelfEditting && (
                  <div class="form-group text-right m-b-0">
                    <button class="btn btn-custom submit-btn waves-effect waves-light mr-2"
                      style={ { right: '5rem' } }>
                      Xác Nhận
                    </button>
                    <button class="btn btn-icon waves-effect waves-light btn-danger"
                      routerLink="/"
                      style={ { right: '3rem' } }>
                      Hủy bỏ
                    </button>
                  </div>
                ) }
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
