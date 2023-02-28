import React from "react";
import NoImage from "../../../../assets/images/no-image.jpg";
import "./EditUserProfilePage.css";
import { Input } from "antd";

export default function EditUserProfilePage(props) {
  var isAdmin = false;
  var isSelfEditting = true;

  const genderModels = [];

  const userInfo = {
    usercode: "123456",
    numberOfDenpendents: "",
    bankAccount: "",
  };

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
                      class="'rounded-circle img-thumbnail no-border'"
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
                            value="{imageInfo}"
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
                          {/* <app-dropdown-list
                    defaultValue="1"
                    class="app-text"
                    name="salaryTypeModel"
                    [data]="salaryTypeModel"
                    [(ngModel)]="userInfo.salaryType"
                  >
                  </app-dropdown-list> */}
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
                          <app-dropdown-list
                            defaultValue="1"
                            class="app-text"
                            name="genderModel"
                            data="genderModel"
                          ></app-dropdown-list>
                        </div>
                      ) : (
                        <div>
                          {/* <div
                  *ngIf="!isSelfEditting"
                  [ngSwitch]="userInfo.genderModel?.Value"
                >
                  <label class="badge badge-info ml-3" *ngSwitchCase="1">{{
                    userInfo.genderModel.Name
                  }}</label>
                  <label class="badge-success badge ml-3" *ngSwitchCase="2">{{
                    userInfo.genderModel.Name
                  }}</label>
                  <label class="badge-danger badge ml-3" *ngSwitchCase="3">{{
                    userInfo.genderModel.Name
                  }}</label>
                </div> */}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
