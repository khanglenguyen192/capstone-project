import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Input, message, Dropdown, Menu } from "antd";
import Colors from "../../../common/constants/Colors";
import DepartmentService from "../../../services/DepartmentService";
import ConfirmDialog from "../../dialogs/confirm/ConfirmDialog";
import NoImage from "../../../assets/images/no-image.jpg";
import Utils from "../../../common/utils/Utils";

export default function DepartmentPage(props) {
  const user = useSelector((state) => {
    return state.AuthReducer.user;
  });

  const isAdmin = useSelector((state) => {
    console.log(state.AuthReducer);
    return state.AuthReducer.isAdmin;
  });

  useDispatch()({
    type: "department",
  });

  const navigate = useNavigate();
  const params = useParams();

  const [departmentList, setDepartmentList] = useState([]);
  const [departmentId, setDepartmentId] = useState();
  const [selectedDepartmentId, setSelectedDepartmentId] = useState();
  const [isShowDepartmentPopup, setShowDepartmentPopup] = useState(false);

  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [newDepartmentDescription, setNewDepartmentDescription] = useState("");
  const [newDepartmentImage, setNewDepartmentImage] = useState();
  const [newDepartmentImageDisplay, setNewDepartmentImageDisplay] =
    useState(NoImage);

  const [departmentStack, setDepartmentStack] = useState(new Array());

  useEffect(() => {
    if (params.departmentId === undefined || params.departmentId === null) {
      getRootDepartments();
    } else {
      getChildDepartments(params.departmentId);
    }
  }, []);

  const getRootDepartments = () => {
    DepartmentService.getRootDepartments(user.token).then((res) => {
      const response = res.data;

      if (response.payload != null) {
        var deparments = response.payload.map((item) => {
          return {
            id: item.id,
            name: item.departmentName,
            color: Colors.quite_blue,
            description: item.description,
            logo: item.departmentLogo,
          };
        });
        setDepartmentList(deparments);
      }

      setDepartmentId();
    });
  };

  const getChildDepartments = (departmentId) => {
    DepartmentService.getChildren(departmentId, user.token).then((res) => {
      const response = res.data;

      if (response.payload != null) {
        var deparments = response.payload.map((item) => {
          return {
            id: item.id,
            name: item.departmentName,
            color: Colors.quite_blue,
            description: item.description,
            logo: item.departmentLogo,
          };
        });
        setDepartmentList(deparments);
      } else {
        setDepartmentList([]);
      }

      setDepartmentId(departmentId);
    });
  };

  const onMenuItemClick = function ({ key }) {
    switch (key) {
      case "infor":
        DepartmentService.getAccess(selectedDepartmentId, user.token).then(
          (res) => {
            var response = res.data;
            if (response != null && response.status == 200) {
              navigate("/department-users/" + selectedDepartmentId);
            } else {
              message.warning("Bạn không có quyền truy cập phòng ban này", 1.5);
            }
          }
        );

        break;
      case "detail":
        getChildDepartments(selectedDepartmentId);
        var newStack = departmentStack;
        newStack.push(selectedDepartmentId);
        setDepartmentStack(newStack);
        break;
    }
  };

  const menuItems = (
    <Menu onClick={onMenuItemClick}>
      <Menu.Item key="infor">
        <div class="dropdown-item" id="ticket-menu-id-1">
          <i class="mdi mdi-home-outline mr-2 text-muted font-18 vertical-middle"></i>
          Thông tin
        </div>
      </Menu.Item>
      <Menu.Item key="detail">
        <div class="dropdown-item" id="ticket-menu-id-2">
          <i class="mdi mdi-sitemap menu-icon mr-2 text-muted font-18 vertical-middle"></i>
          Chi tiết
        </div>
      </Menu.Item>
    </Menu>
  );

  const handleAddDepartment = () => {
    if (newDepartmentName == null || newDepartmentName.length == 0) {
      message.warning("Tên phòng ban không được trống", 1.5);
      return;
    }

    var formData = new FormData();
    if (departmentId != undefined) {
      formData.append("parentId", departmentId);
    }
    formData.append("departmentName", newDepartmentName);
    formData.append("status", 1);
    formData.append("description", newDepartmentDescription);
    formData.append("image", newDepartmentImage);

    DepartmentService.createDepartment(formData, user.token)
      .then((res) => {
        message.info("Tạo phòng ban thành công");
        if (departmentId != null && departmentId != undefined) {
          getChildDepartments(departmentId);
        } else {
          getRootDepartments();
        }

        resetPopupField();
        setShowDepartmentPopup(false);
      })
      .catch((res) => {
        message.error("Đã có lỗi xảy ra!!!");
      });
  };

  const resetPopupField = () => {
    setNewDepartmentName("");
    setNewDepartmentDescription("");
    setNewDepartmentImage();
    setNewDepartmentImageDisplay(NoImage);
  };

  const handleNewDeparmentImageChange = (e) => {
    if (e.target.files == null) {
      return;
    }
    setNewDepartmentImage(e.target.files[0]);
    var imgURL = URL.createObjectURL(e.target.files[0]);
    setNewDepartmentImageDisplay(imgURL);
  };

  const handleBack = (e) => {
    if (departmentStack != null && departmentStack.length != 0) {
      var newStack = departmentStack;
      console.log(newStack);
      newStack.pop();
      setDepartmentStack(newStack);
      if (newStack.length == 0) {
        getRootDepartments();
      } else {
        getChildDepartments(newStack[newStack.length - 1]);
      }
    }
  };

  return (
    <div className="department-page">
      <div clas="row">
        <div class="row">
          <div className="col-6">
            {!(departmentStack == null || departmentStack.length == 0) && (
              <button
                type="button"
                class="btn"
                onClick={handleBack}
                style={{ marginBottom: "10px" }}
              >
                <i class="mdi mdi-arrow-left-bold"></i>
              </button>
            )}
          </div>

          {isAdmin && (
            <div className="col-6">
              <button
                type="button"
                class="btn btn-custom btn-rounded w-md waves-effect waves-light mb-4 float-right"
                onClick={() => setShowDepartmentPopup(true)}
              >
                <i class="mdi mdi-plus-circle"></i> Thêm phòng ban
              </button>
            </div>
          )}
        </div>
      </div>

      <div class="row">
        {departmentList.length != 0 ? (
          departmentList.map((item) => (
            <div
              class="col-md-6 col-lg-4"
              onClick={() => {
                setSelectedDepartmentId(item.id);
              }}
            >
              <div class="card-box project-box ribbon-box">
                <div class="dropdown float-right">
                  <Dropdown
                    placement={"bottom"}
                    trigger={["click"]}
                    overlay={menuItems}
                    onClick={() => setSelectedDepartmentId(item.id)}
                  >
                    <div class="dropdown-toggle card-drop arrow-none">
                      <h3 class="m-0 text-muted">
                        <i class="mdi mdi-dots-horizontal"></i>
                      </h3>
                    </div>
                  </Dropdown>
                </div>

                <p class="project-hide-overflow ml-3">
                  <span class="thumb-lg member-thumb mr-15 m-b-10 d-inline-block">
                    <img
                      src={Utils.getImageUrl(item.logo)}
                      style={{ width: "85px", height: "85px" }}
                      class="rounded-circle img-thumbnail"
                      altImg="friend"
                      titleImg={item.name}
                    ></img>
                  </span>
                  <span class="projectNameDisplay mt-4">
                    <p class="text-dark font-15 text-bold">{item.name}</p>
                  </span>
                </p>

                <p
                  class="text-dark font-13 description-hide-overflow"
                  title={item.description}
                >
                  Mô tả: {item.description}
                </p>

                <div class="project-members mt-4 memnber-hide-overflow">
                  <label class="mr-3">Manager: </label>
                  <div>
                    <a
                      data-toggle="tooltip"
                      data-placement="top"
                      style={{
                        marginRight: "5px",
                      }}
                    >
                      <div class="thumb-md member-thumb">
                        <img
                          src={NoImage}
                          class="img-thumbnail project-leader-mark rounded-circle"
                          alt="friend"
                        ></img>
                      </div>
                    </a>
                    Lê Nguyên Khang
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div class="col-12">
            <p class="text-muted font-18">
              Hiện tại không có phòng ban nào !!!
            </p>
          </div>
        )}

        <ConfirmDialog
          isShow={isShowDepartmentPopup}
          title="Thêm phòng ban"
          onCancel={() => {
            resetPopupField();
            setShowDepartmentPopup(false);
          }}
          mainButtonText="Xác nhận"
          subButtonText="Đóng"
          mainButtonClick={handleAddDepartment}
          subButtonClick={() => {
            resetPopupField();
            setShowDepartmentPopup(false);
          }}
        >
          <div className="container-department">
            <div className="row">
              <div class="col-12">
                <div class="form-group row d-flex justify-content-center align-items-center">
                  <div class="thumb-xxl member-thumb m-b-10">
                    <img
                      style={{ width: "165px", height: "165px" }}
                      src={newDepartmentImageDisplay}
                      class="img-cover rounded-circle img-thumbnail no-border"
                    ></img>
                  </div>
                </div>

                <div class="form-group row d-flex justify-content-center align-items-center">
                  <div class="vertical-center">
                    <button
                      type="button"
                      class="btn btn-custom btn-file w-md waves-effect waves-light float-left"
                      style={{
                        marginLeft: "20px",
                      }}
                    >
                      <span>
                        <i class="mdi mdi-upload"></i> Thêm hình
                      </span>
                      <span>
                        <input
                          name="file"
                          type="file"
                          accept="image/*"
                          onChange={handleNewDeparmentImageChange}
                          class="btn btn-custom w-md waves-effect waves-light float-left"
                          style={{
                            position: "absolute",
                            top: "0",
                            right: "0",
                            margin: "0",
                            opacity: "0",
                          }}
                        />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div class="col-12">
                <h5 className="name">Tên phòng ban</h5>
                <Input
                  id="input-department"
                  placeholder="Tên phòng ban của công ty"
                  value={newDepartmentName}
                  onChange={(e) => setNewDepartmentName(e.target.value)}
                />
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <h5 className="name">Mô tả</h5>
                <textarea
                  class="form-group col-md-12 textArea"
                  name="jobDescription"
                  rows="3"
                  value={newDepartmentDescription}
                  onChange={(e) => setNewDepartmentDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        </ConfirmDialog>
      </div>
    </div>
  );
}
