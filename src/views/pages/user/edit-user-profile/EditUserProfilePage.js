import React, { useState, useEffect } from "react";
import NoImage from "../../../../assets/images/no-image.jpg";
import "./EditUserProfilePage.css";
import { Input, Cascader, DatePicker, message } from "antd";
import viVN from "antd/lib/locale/vi_VN";
import { useSelector, useDispatch } from "react-redux";
import Constants from "../../../../common/constants/Constants";
import UserService from "../../../../services/UserService";
import { useNavigate, useParams } from "react-router-dom";
import Utils from "../../../../common/utils/Utils";
import dayjs from "dayjs";

const datePicketFormat = "DD/MM/YYYY";

export default function EditUserProfilePage(props) {
  const user = useSelector((state) => {
    return state.AuthReducer.user;
  });

  useDispatch()({
    type: "user",
  });

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.userId == undefined) {
      setSelfEditing(true);
    }
    fetchData();
  }, []);

  const isAdmin = useSelector((state) => {
    return state.AuthReducer.isAdmin;
  });

  const [isSelfEditting, setSelfEditing] = useState(false);
  const [userCode, setUserCode] = useState();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [bankAccount, setBankAccount] = useState();
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState();
  const [birthday, setBirthday] = useState("");
  const [linkedId, setLinkedId] = useState("");
  const [facebookId, setFacebookId] = useState("");
  const [numberOfDenpendents, setNumberOfDenpendents] = useState();
  const [avatarImg, setAvatarImg] = useState();
  const [avatarDisplay, setAvatarDisplay] = useState(NoImage);
  const [userIdentity, setUserIdentity] = useState();
  const [idIssueDate, setIdIssueDate] = useState();
  const [idIssuePlace, setIdIssuePlace] = useState();
  const [idFrontImage, setIdFrontImage] = useState();
  const [idBackImage, setIdBackImage] = useState();
  const [idFrontImageDisplay, setIdFrontImageDisplay] = useState(NoImage);
  const [idBackImageDisplay, setIdBackImageDisplay] = useState(NoImage);

  const genderModels = Constants.genders;

  const salaryTypeModels = Constants.salaryTypes;

  const fetchData = () => {
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
        setAvatarDisplay(Utils.getImageUrl(userModel.avatar));
        setUserIdentity(userModel.userIdentity);
        setIdIssueDate(userModel.idIssueDate);
        setIdIssuePlace(userModel.idIssuePlace);
        setIdFrontImageDisplay(Utils.getImageUrl(userModel.idFrontImage));
        setIdBackImageDisplay(Utils.getImageUrl(userModel.idBackImage));
      }
    });
  };
  
  const handleAvatarChange = (e) => {
    setAvatarImg(e.target.files[0]);
    var imgURL = URL.createObjectURL(e.target.files[0]);
    setAvatarDisplay(imgURL);
  };

  const handleFontImageChange = (e) => {
    setIdFrontImage(e.target.files[0]);
    var imgURL = URL.createObjectURL(e.target.files[0]);
    setIdFrontImageDisplay(imgURL);
  };

  const handleBackImageChange = (e) => {
    setIdBackImage(e.target.files[0]);
    var imgURL = URL.createObjectURL(e.target.files[0]);
    setIdBackImageDisplay(imgURL);
  };

  const handleSelectGender = (value, selectedOption) => {
    setGender(value);
  };

  const handleSelectBirthday = (date, dateString) => {
    setBirthday(date);
  };

  const handleSelectIdIssueDate = (date, dateString) => {
    setIdIssueDate(date);
  };

  const handleUpdateUser = () => {
    var formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("gender", gender);
    formData.append("email", email);
    formData.append("bankAccount", bankAccount);
    formData.append("phone", phone);
    formData.append("birthday", birthday);
    formData.append("linkedId", linkedId);
    formData.append("facebookId", facebookId);
    formData.append("numberOfDenpendents", setNumberOfDenpendents);
    formData.append("image", avatarImg);

    UserService.updateUser(user.userId, formData, user.token)
      .then((res) => {
        var response = res.data;
        if (response != null && response.status == 200) {
          message.info("Cập nhật thành công", 1.5);
          fetchData();
        } else {
          message.error("Cập nhật thất bại", 1.5);
        }
      })
      .catch((res) => message.error("Cập nhật thất bại", 1.5));
  };

  const handleUpdateUserIdentity = () => {
    var formData = new FormData();
    formData.append("userIdentity", userIdentity);
    formData.append("idIssueDate", idIssueDate);
    formData.append("idIssuePlace", idIssuePlace);
    formData.append("idFrontImage", idFrontImage);
    formData.append("idBackImage", idBackImage);

    UserService.updateUserIdentity(user.userId, formData, user.token)
      .then((res) => {
        var response = res.data;
        if (response != null && response.status == 200) {
          message.info("Cập nhật thành công", 1.5);
          fetchData();
        } else {
          message.error("Cập nhật thất bại", 1.5);
        }
      })
      .catch((res) => message.error("Cập nhật thất bại", 1.5));
  };

  const handleCancel = () => {
    navigate("/home");
  };

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
                        <img
                          src={ avatarDisplay }
                          style={ { width: "175px", height: "175px" } }
                          class="img-cover rounded-circle img-thumbnail no-border"
                        ></img>
                      </div>
                    </div>

                    <div class="form-group row d-flex justify-content-center align-items-center">
                      <div class="row justify-content-center align-items-center">
                        { isSelfEditting ? (
                          <label class="col-form-label font-weight-bold">
                            Mã nhân viên: #{ userCode }
                          </label>
                        ) : (
                          <div class="col-form-label font-weight-bold">
                            <Input
                              class="app-text"
                              size="large"
                              name="userCode"
                              value={ userCode }
                              onChange={ (e) => setUserCode(e.target.value) }
                            ></Input>
                          </div>
                        ) }
                      </div>
                    </div>

                    <div class="form-group row d-flex justify-content-center align-items-center">
                      <div class="vertical-center">
                        <button
                          type="button"
                          class="btn btn-custom btn-file w-md waves-effect waves-light float-left"
                          style={ {
                            marginLeft: "20px",
                          } }
                        >
                          <span>
                            <i class="mdi mdi-upload"></i> Hình đại diện
                          </span>
                          <span>
                            <input
                              name="file"
                              type="file"
                              accept="image/*"
                              class="btn btn-custom w-md waves-effect waves-light float-left"
                              onChange={ handleAvatarChange }
                              style={ {
                                position: "absolute",
                                top: "0",
                                right: "0",
                                margin: "0",
                                opacity: "0",
                              } }
                            />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">Họ và tên</label>
                      { isSelfEditting ? (
                        <div class="col-sm-8">
                          <Input
                            size="large"
                            value={ fullName }
                            onChange={ (e) => setFullName(e.target.value) }
                          ></Input>
                        </div>
                      ) : (
                        <label class="col-sm-8 col-form-label font-weight-bold">
                          { fullName }
                        </label>
                      ) }
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">Email</label>
                      { isSelfEditting ? (
                        <div class="col-sm-8">
                          <Input
                            size="large"
                            type="email"
                            pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
                            value={ email }
                            onChange={ (e) => setEmail(e.target.value) }
                            style={ { fontWeight: "700" } }
                          ></Input>
                        </div>
                      ) : (
                        <label class="col-sm-8 col-form-label font-weight-bold">
                          { email }
                        </label>
                      ) }
                    </div>
                  </div>
                </div>

                { isAdmin && (
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-4 col-form-label">
                          Loại lương
                        </label>
                        <div class="col-sm-8">
                          <Cascader
                            size="large"
                            style={ {
                              width: "100%",
                            } }
                            options={ salaryTypeModels }
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
                        { isSelfEditting ? (
                          <label class="col-sm-8 col-form-label font-weight-bold">
                            { numberOfDenpendents }
                          </label>
                        ) : (
                          <div class="col-sm-8">
                            <Input
                              size="large"
                              value={ numberOfDenpendents }
                              onChange={ (e) =>
                                setNumberOfDenpendents(e.target.value)
                              }
                            ></Input>
                          </div>
                        ) }
                      </div>
                    </div>
                  </div>
                ) }

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">
                        Tài khoản ngân hàng
                      </label>
                      { isSelfEditting ? (
                        <div class="form-group col-sm-8">
                          <Input
                            size="large"
                            type="number"
                            value={ bankAccount }
                            onChange={ (e) => setBankAccount(e.target.value) }
                            style={ { fontWeight: "700" } }
                          ></Input>
                        </div>
                      ) : (
                        <label class="form-group col-sm-8 col-form-label font-weight-bold">
                          { bankAccount }
                        </label>
                      ) }
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">
                        Số điện thoại
                      </label>
                      { isSelfEditting ? (
                        <div class="col-sm-8">
                          <Input
                            size="large"
                            pattern="(0)([0-9]{9,10})"
                            value={ phone }
                            onChange={ (e) => setPhone(e.target.value) }
                            style={ { fontWeight: "700" } }
                          ></Input>
                        </div>
                      ) : (
                        <label class="col-sm-8 col-form-label font-weight-bold">
                          { phone }
                        </label>
                      ) }
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
                          style={ {
                            width: "100%",
                            height: "100%",
                          } }
                          placement="bottomRight"
                          options={ genderModels }
                          onChange={ handleSelectGender }
                          value={ Utils.getGenderString(gender) }
                          disabled={ !isSelfEditting }
                          placeholder="Chọn"
                        />
                      </div>
                    </div>
                  </div>
                  { !isAdmin && (
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-4 col-form-label">Ngày sinh</label>
                        { isSelfEditting ? (
                          <div class="col-sm-8">
                            <div class="input-group">
                              <DatePicker
                                locale={ viVN }
                                format={ datePicketFormat }
                                defaultValue={ Utils.convertToDayJs(
                                  birthday,
                                  "DD/MM/YYY"
                                ) }
                                size="large"
                                style={ { width: "100%" } }
                                placeholder="Ngày sinh"
                                onChange={ handleSelectBirthday }
                              ></DatePicker>
                            </div>
                          </div>
                        ) : (
                          <label class="col-sm-8 col-form-label font-weight-bold">
                            { birthday }
                          </label>
                        ) }
                      </div>
                    </div>
                  ) }
                  { isAdmin && (
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-4 col-form-label">
                          Ngày vào công ty
                        </label>
                        <div class="col-sm-8">
                          <div class="input-group">
                            <DatePicker
                              locale={ viVN }
                              format="DD/MM/YYYY"
                              size="large"
                              style={ { width: "100%" } }
                              // defaultValue={ Utils.convertToDayJs(
                              //   ,
                              //   "DD/MM/YYY"
                              // ) }
                              placeholder="DD/MM/YYYY"
                            ></DatePicker>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) }
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">
                        Tài khoản LinkedIn
                      </label>
                      { isSelfEditting ? (
                        <div class="col-sm-8">
                          <Input
                            size="large"
                            type="text"
                            class="form-control"
                            name="linkedId"
                            value={ linkedId }
                            onChange={ (e) => setLinkedId(e.target.value) }
                          />
                        </div>
                      ) : (
                        <label class="col-sm-8 col-form-label font-weight-bold">
                          { linkedId }
                        </label>
                      ) }
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">
                        Tài khoản Facebook
                      </label>
                      { isSelfEditting ? (
                        <div class="col-sm-8">
                          <Input
                            size="large"
                            type="text"
                            class="form-control"
                            name="facebookId"
                            value={ facebookId }
                            onChange={ (e) => setFacebookId(e.target.value) }
                          />
                        </div>
                      ) : (
                        <label class="col-sm-8 col-form-label font-weight-bold">
                          { facebookId }
                        </label>
                      ) }
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group text-right m-b-0">
                <button
                  class="btn btn-custom submit-btn waves-effect waves-light mr-2"
                  type="button"
                  onClick={ handleUpdateUser }
                >
                  Xác Nhận
                </button>
                <button
                  class="btn btn-icon waves-effect waves-light btn-danger"
                  type="button"
                  onClick={ handleCancel }
                >
                  Hủy bỏ
                </button>
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
                  { isSelfEditting ? (
                    <h4 class="card-title">CẬP NHẬT THÔNG TIN CCCD</h4>
                  ) : (
                    <h4 class="card-title">THÔNG TIN CCCD</h4>
                  ) }

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group row d-flex justify-content-center align-items-center flex-column containerImage">
                        <img
                          class="d-flex justify-content-center align-items-end col-form-label-lg img-cover img-fluid imageId"
                          src={ idFrontImageDisplay }
                          altImg="image"
                          style={ { width: "200px", height: "200px" } }
                        ></img>
                        <div class="col-sm-8">
                          <div class="form-group row d-flex justify-content-center align-items-center">
                            <div class="vertical-center">
                              <button
                                type="button"
                                class="btn btn-custom btn-file w-md waves-effect waves-light float-left"
                                style={ {
                                  marginLeft: "20px",
                                } }
                              >
                                <span>
                                  <i class="mdi mdi-upload"></i> Mặt trước CCCD
                                </span>
                                <span>
                                  <input
                                    name="file"
                                    type="file"
                                    accept="image/*"
                                    onChange={ handleFontImageChange }
                                    class="btn btn-custom w-md waves-effect waves-light float-left"
                                    style={ {
                                      position: "absolute",
                                      top: "0",
                                      right: "0",
                                      margin: "0",
                                      opacity: "0",
                                    } }
                                  />
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row d-flex justify-content-center align-items-center flex-column containerImage">
                        <img
                          class="d-flex justify-content-center align-items-end col-form-label-lg img-cover img-fluid imageId"
                          src={ idBackImageDisplay }
                          altImg="image"
                          style={ { width: "200px", height: "200px" } }
                        ></img>
                        <div class="col-sm-8">
                          <div class="form-group row d-flex justify-content-center align-items-center">
                            <div class="vertical-center">
                              <button
                                type="button"
                                class="btn btn-custom btn-file w-md waves-effect waves-light float-left"
                                style={ {
                                  marginLeft: "20px",
                                } }
                              >
                                <span>
                                  <i class="mdi mdi-upload"></i> Mặt sau CCCD
                                </span>
                                <span>
                                  <input
                                    name="file"
                                    type="file"
                                    accept="image/*"
                                    class="btn btn-custom w-md waves-effect waves-light float-left"
                                    onChange={ handleBackImageChange }
                                    style={ {
                                      position: "absolute",
                                      top: "0",
                                      right: "0",
                                      margin: "0",
                                      opacity: "0",
                                    } }
                                  />
                                </span>
                              </button>
                            </div>
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
                            class="form-control"
                            name="userIdentity"
                            type="number"
                            disabled={ !isSelfEditting }
                            value={ userIdentity }
                            onChange={ (e) => setUserIdentity(e.target.value) }
                            style={ { fontWeight: "700" } }
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
                              locale={ viVN }
                              format="DD/MM/YYYY"
                              size="large"
                              style={ { width: "100%" } }
                              placeholder="DD/MM/YYYY"
                              defaultValue={ Utils.convertToDayJs(
                                idIssueDate,
                                "DD/MM/YYY"
                              ) }
                              onChange={ handleSelectIdIssueDate }
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
                            disabled={ !isSelfEditting }
                            value={ idIssuePlace }
                            onChange={ (e) => setIdIssuePlace(e.target.value) }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                { isSelfEditting && (
                  <div class="form-group text-right m-b-0">
                    <button
                      class="btn btn-custom submit-btn waves-effect waves-light mr-2"
                      type="button"
                      onClick={ handleUpdateUserIdentity }
                    >
                      Xác Nhận
                    </button>
                    <button
                      class="btn btn-icon waves-effect waves-light btn-danger"
                      type="button"
                      onClick={ handleCancel }
                    >
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
