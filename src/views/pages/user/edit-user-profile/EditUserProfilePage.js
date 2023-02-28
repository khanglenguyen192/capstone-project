import React from "react";
import NoImage from "../../../../assets/images/no-image.jpg";
import "./EditUserProfilePage.css";
import { Input, Cascader, DatePicker } from "antd";

export default function EditUserProfilePage(props) {
  var isAdmin = true;
  var isSelfEditting = true;

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
    numberOfDenpendents: 1,
    bankAccount: "",
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

                <div class="row d-flex justify-content-center align-items-center">
                  <div class="thumb-xl member-thumb m-b-10">
                    <img
                      class="rounded-circle img-thumbnail no-border"
                      src={NoImage}
                    ></img>
                  </div>
                  {isSelfEditting && (
                    <div>
                      <div class="col-sm-12">
                        <input
                          type="file"
                          class="file-upload-default"
                          onChange="onChange($event)"
                          hidden
                        />
                        <div class="input-group">
                          <input
                            type="text"
                            value={userInfo.imageInfo}
                            class="form-control file-upload-info"
                            disabled
                            placeholder="Tải ảnh lên"
                          />
                          <span class="input-group-append">
                            <button
                              class="btn btn-info"
                              type="button"
                              onClick="imageUpload.click()"
                            >
                              Tải Lên
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">
                        Mã nhân viên
                      </label>

                      {isSelfEditting ? (
                        <label class="col-sm-8 col-form-label font-weight-bold">
                          {userInfo.usercode}
                        </label>
                      ) : (
                        <div class="col-sm-8">
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
                  <div class="col-md-6"></div>
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
                            placeholder={userInfo.email}
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
                        <div class="col-sm-8">
                          <Input
                            size="large"
                            placeholder={userInfo.bankAccount}
                          ></Input>
                        </div>
                      ) : (
                        <label class="col-sm-8 col-form-label font-weight-bold">
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
                            placeholder={userInfo.phone}
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
                            options={genderModels}
                            placeholder="Giới tính"
                          />
                        </div>
                      ) : (
                        <div>{renderGenderLabel(userInfo.genderModel)}</div>
                      )}
                    </div>
                  </div>
                  {isAdmin && (
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-4 col-form-label">
                          Ngày vào công ty
                        </label>
                        <div class="col-sm-8">
                          <div class="input-group">
                            <DatePicker
                              size="large"
                              style={{ width: "100%" }}
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

                {!isAdmin && (
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-4 col-form-label">Ngày sinh</label>
                        {isSelfEditting ? (
                          <div class="col-sm-8">
                            <div class="input-group">
                              <DatePicker
                                size="large"
                                style={{ width: "100%" }}
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
                  </div>
                )}

                <div class="form-group text-right m-b-0">
                  <button class="btn btn-custom submit-btn waves-effect waves-light mr-2">
                    Xác Nhận
                  </button>
                  {isSelfEditting ? (
                    <button
                      class="btn btn-icon waves-effect waves-light btn-danger"
                      routerLink="/"
                    >
                      Hủy
                    </button>
                  ) : (
                    <button
                      class="btn btn-icon waves-effect waves-light btn-danger"
                      routerLink="/users"
                    >
                      Hủy
                    </button>
                  )}
                </div>
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
                    <h4 class="card-title">CẬP NHẬT THÔNG TIN CMND</h4>
                  ) : (
                    <h4 class="card-title">THÔNG TIN CMND</h4>
                  )}

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group row d-flex justify-content-center align-items-center flex-column">
                        <img
                          class="d-flex justify-content-center align-items-end col-form-label-lg img-cover img-fluid"
                          src={NoImage}
                          altImg="image"
                          width="250"
                        ></img>
                        <div class="col-sm-8">
                          <div class="vertical-center">
                            {isSelfEditting && (
                              <div class="input-group">
                                <input
                                  type="file"
                                  name="idFrontImageInfo"
                                  value={userInfo.idFrontImageInfo}
                                  class="form-control file-upload-info"
                                  placeholder="Tải lên ảnh mặt trước CCCD"
                                />
                                <span class="input-group-append">
                                  <button
                                    class="btn btn-info"
                                    type="button"
                                    onClick="idFrontImageUpload.click()"
                                  >
                                    Tải lên
                                  </button>
                                  <button
                                    class="btn btn-danger"
                                    type="button"
                                    onClick="deleteIdFrontImage()"
                                  >
                                    Xóa
                                  </button>
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row d-flex justify-content-center align-items-center flex-column">
                        <img
                          class="d-flex justify-content-center align-items-end col-form-label-lg img-cover img-fluid"
                          src={NoImage}
                          altImg="image"
                          width="250"
                        ></img>
                        <div class="col-sm-8">
                          <div class="vertical-center">
                            {isSelfEditting && (
                              <div class="input-group">
                                <input
                                  type="file"
                                  name="idFrontImageInfo"
                                  value={userInfo.idBackImageInfo}
                                  class="form-control file-upload-info"
                                  placeholder="Tải lên ảnh mặt sau CCCD"
                                />
                                <span class="input-group-append">
                                  <button
                                    class="btn btn-info"
                                    type="button"
                                    onClick="idFrontImageUpload.click()"
                                  >
                                    Tải lên
                                  </button>
                                  <button
                                    class="btn btn-danger"
                                    type="button"
                                    onClick="deleteIdFrontImage()"
                                  >
                                    Xóa
                                  </button>
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-4 col-form-label">Số CMND</label>
                        <div class="col-sm-8">
                          <Input
                            size="large"
                            type="text"
                            class="form-control"
                            name="userIdentity"
                            disabled={!isSelfEditting}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-4 col-form-label">
                          Ngày cấp CMND
                        </label>
                        <div class="col-sm-8">
                          <div class="input-group">
                            <DatePicker
                              size="large"
                              style={{ width: "100%" }}
                            ></DatePicker>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-4 col-form-label">
                          Nơi cấp CMND
                        </label>
                        <div class="col-sm-8">
                          <Input
                            size="large"
                            type="text"
                            class="form-control"
                            name="address"
                            disabled={!isSelfEditting}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {isSelfEditting && (
                    <div class="form-group text-right m-b-0">
                      <button class="btn btn-custom submit-btn waves-effect waves-light mr-2">
                        Xác Nhận
                      </button>
                      <button
                        class="btn btn-icon waves-effect waves-light btn-danger"
                        routerLink="/"
                      >
                        Hủy
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
