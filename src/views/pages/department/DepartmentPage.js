import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Input, message, Upload, Dropdown, Menu, Switch } from "antd";
import { ReactComponent as Icon } from "../../../assets/iconfonts/mdi/icon/add-icon.svg";
import "./Department.css";
import Colors from "../../../common/constants/Colors";
import DepartmentService from "../../../services/DepartmentService";
import ConfirmDialog from "../../dialogs/confirm/ConfirmDialog";
import NoImage from "../../../assets/images/no-image.jpg";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

export default function DepartmentPage(props) {
  const user = useSelector((state) => {
    return state.AuthReducer.user;
  });

  const navigate = useNavigate();

  const [departmentList, setDepartmentList] = useState([]);
  const [departmentId, setDepartmentId] = useState(props.departmentId);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState();
  const { TextArea } = Input;
  const [isShowDepartmentPopup, setShowDepartmentPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    getUserDepartments();
  }, []);

  const getUserDepartments = () => {
    DepartmentService.getDepartmentsForEmployee(user.userId, user.token).then(
      (res) => {
        const response = res.data;

        if (response.payload != null) {
          var deparments = response.payload.map((item) => {
            return {
              id: item.id,
              name: item.departmentName,
              color: Colors.quite_blue,
            };
          });
          setDepartmentList(deparments);
        }
      }
    );
  };

  const onMenuItemClick = function ({ key }) {
    switch (key) {
      case "infor":
        navigate("/department-users/" + selectedDepartmentId);
        break;
      case "detail":
        handleClickDepartment(selectedDepartmentId);
        break;
    }
  };

  const menuItems = (
    <Menu onClick={onMenuItemClick}>
      <Menu.Item key="infor">
        <div class="dropdown-item" id="ticket-menu-id-1">
          <i class="mdi mdi-pencil mr-2 text-muted font-18 vertical-middle"></i>
          Thông tin
        </div>
      </Menu.Item>
      <Menu.Item key="detail">
        <div class="dropdown-item" id="ticket-menu-id-2">
          <i class="mdi mdi-check-all mr-2 text-muted font-18 vertical-middle"></i>
          Chi tiết
        </div>
      </Menu.Item>
    </Menu>
  );

  const handleClickDepartment = (departmentId) => {
    DepartmentService.getChildren(departmentId, user.token).then((res) => {
      const response = res.data;

      if (response.payload != null) {
        var deparments = response.payload.map((item) => {
          return {
            id: item.id,
            name: item.departmentName,
            color: Colors.quite_blue,
          };
        });
        setDepartmentList(deparments);
      } else {
        setDepartmentList([]);
      }

      setDepartmentId(departmentId);
    });
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon
          style={{
            fill: Colors.quite_gray,
            scale: "0.6",
          }}
        />
      </div>
    </div>
  );

  const handleAddDepartment = () => {
    var body = {
      parentId: departmentId,
      departmentName: "Phòng ban 5",
      status: 1,
      description: "Abc def",
      users: [
        {
          id: user.userId,
          roleId: 1,
        },
      ],
    };
    DepartmentService.createDepartment(body, user.token).then((res) => {
      getUserDepartments();
    });
    setShowDepartmentPopup(false);
  };

  return (
    <div>
      <div clas="row">
        <div class="row">
          <div className="col-6">
            <h4 class="card-title">Trụ sở công ty</h4>
          </div>

          <div className="col-6">
            <button
              type="button"
              class="btn btn-custom btn-rounded w-md waves-effect waves-light mb-4 float-right"
              onClick={() => setShowDepartmentPopup(true)}
            >
              <i class="mdi mdi-plus-circle"></i> Thêm phòng ban
            </button>
          </div>
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
                      src={NoImage}
                      class="rounded-circle img-thumbnail"
                      altImg="friend"
                      titleImg={item.name}
                    ></img>
                  </span>
                </p>

                <p
                  class="text-dark font-13 description-hide-overflow"
                  title={item.description}
                >
                  {"item.description"}
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
                    "employee.fullName"
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
            setShowDepartmentPopup(false);
          }}
          mainButtonText="Xác nhận"
          subButtonText="Đóng"
          mainButtonClick={handleAddDepartment}
          subButtonClick={() => {
            setShowDepartmentPopup(false);
          }}
        >
          <div className="container-department">
            <div className="row">
              <div class="col-md-6 col-xs-6 col-lg-6 col-sm-6">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </div>
              <div class="col-md-6 col-xs-6 col-lg-6 col-sm-6">
                <h5 className="name">Tên phòng ban</h5>
                <Input
                  id="input-department"
                  placeholder="Tên phòng ban của công ty"
                />
              </div>

              <div className="detail">
                <div className="address">
                  <h5>Mô tả</h5>
                  <TextArea
                    rows={6}
                    placeholder="Thêm phần mô tả cho chi nhánh"
                    style={{ backgroundColor: Colors.graynish }}
                  />
                </div>
              </div>
            </div>
          </div>
        </ConfirmDialog>
      </div>
    </div>
  );
}
