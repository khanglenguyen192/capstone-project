import React, { useState } from "react";
import NoImage from "../../../../assets/images/no-image.jpg";
import "./EditUserProfilePage.css";
import { Input, Cascader, DatePicker } from "antd";
import viVN from "antd/lib/locale/vi_VN";
import UploadFile from "../../../components/UploadFile";
import { useSelector } from "react-redux";
import Constants from "../../../../common/constants/Constants";
import { useEffect } from "react";
import UserService from "../../../../services/UserService";

export default function EditUserProfilePage(props) {
  const user = useSelector((state) => {
    return state.AuthReducer.user;
  });

  useEffect(() => {
    UserService.getUser(user.userId, user.token).then((res) => {
      var response = res.data;
      if (response != null && response.payload != null) {
        var userModel = response.payload;
        setUserCode(userModel.userCode);
        setFullName(userModel.fullName);
        setEmail(userModel.email);
        setBankAccount(userModel.bankAccount);
        setPhone(userModel.phone);
        setGender(userModel.gender);
        setBirthday(userModel.birthday);
        setLinkedId(userModel.linkedId);
        setFacebookId(userModel.facebookId);
        setNumberOfDenpendents(userModel.numberOfDenpendents);
      }
    });
  }, []);

  const isAdmin = useSelector((state) => {
    return state.AuthReducer.isAdmin;
  });

  const [isSelfEditting, setSelfEditing] = useState(true);
  const [userCode, setUserCode] = useState();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [bankAccount, setBankAccount] = useState();
  const [phone, setPhone] = useState();
  const [gender, setGender] = useState();
  const [birthday, setBirthday] = useState();
  const [linkedId, setLinkedId] = useState();
  const [facebookId, setFacebookId] = useState();
  const [numberOfDenpendents, setNumberOfDenpendents] = useState();

  const genderModels = Constants.genders;

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

  return (
    <div>
      <div class="row" id="edit-user-profile">
        <div class="col-12 grid-margin stretch-card">
          <div class="card-box">
            <form>
              <div class="card-body">
                <h4 class="card-title">CẬP NHẬT THÔNG TIN</h4>

                <div className="row">
                  <div class="col-12">
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
                            Mã nhân viên: #{userCode}
                          </label>
                        ) : (
                          <div class="col-form-label font-weight-bold">
                            <Input
                              class="app-text"
                              size="large"
                              name="userCode"
                              value={userCode}
                              onChange={(e) => setUserCode(e.target.value)}
                            ></Input>
                          </div>
                        )}
                      </div>
                    </div>

                    <UploadFile placeholder="Hình thẻ"></UploadFile>
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
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                          ></Input>
                        </div>
                      ) : (
                        <label class="col-sm-8 col-form-label font-weight-bold">
                          {fullName}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ fontWeight: "700" }}
                          ></Input>
                        </div>
                      ) : (
                        <label class="col-sm-8 col-form-label font-weight-bold">
                          {email}
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
                            {numberOfDenpendents}
                          </label>
                        ) : (
                          <div class="col-sm-8">
                            <Input
                              size="large"
                              value={numberOfDenpendents}
                              onChange={(e) =>
                                setNumberOfDenpendents(e.target.value)
                              }
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
                            value={bankAccount}
                            onChange={(e) => setBankAccount(e.target.value)}
                            style={{ fontWeight: "700" }}
                          ></Input>
                        </div>
                      ) : (
                        <label class="form-group col-sm-8 col-form-label font-weight-bold">
                          {bankAccount}
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
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{ fontWeight: "700" }}
                          ></Input>
                        </div>
                      ) : (
                        <label class="col-sm-8 col-form-label font-weight-bold">
                          {phone}
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">Giới tính</label>
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
                          disabled={!isSelfEditting}
                          placeholder="Chọn"
                        />
                      </div>
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
                            {birthday}
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
                            value={linkedId}
                            onChange={(e) => setLinkedId(e.target.value)}
                          />
                        </div>
                      ) : (
                        <label class="col-sm-8 col-form-label font-weight-bold">
                          {linkedId}
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
                            value={facebookId}
                            onChange={(e) => setFacebookId(e.target.value)}
                          />
                        </div>
                      ) : (
                        <label class="col-sm-8 col-form-label font-weight-bold">
                          {facebookId}
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group text-right m-b-0">
                <button class="btn btn-custom submit-btn waves-effect waves-light mr-2">
                  Xác Nhận
                </button>
                {isSelfEditting ? (
                  <button class="btn btn-icon waves-effect waves-light btn-danger">
                    Hủy bỏ
                  </button>
                ) : (
                  <button class="btn btn-icon waves-effect waves-light btn-danger">
                    Hủy bỏ
                  </button>
                )}
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
                            {isSelfEditting && (
                              <UploadFile
                                isAdmin={isAdmin}
                                placeholder="Mặt trước CCCD"
                              />
                            )}
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
                            {isSelfEditting && (
                              <UploadFile
                                isAdmin={isAdmin}
                                placeholder="Mặt sau CCCD"
                              />
                            )}
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
                            disabled={!isSelfEditting}
                            placeholder="XXXX XXXX XXXX"
                            style={{ fontWeight: "700" }}
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
                {isSelfEditting && (
                  <div class="form-group text-right m-b-0">
                    <button
                      class="btn btn-custom submit-btn waves-effect waves-light mr-2"
                      type="button"
                    >
                      Xác Nhận
                    </button>
                    <button
                      class="btn btn-icon waves-effect waves-light btn-danger"
                      type="button"
                    >
                      Hủy bỏ
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
