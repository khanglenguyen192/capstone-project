import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddButton from "../../../components/AddButton";
import NoImage from "../../../../assets/images/no-image.jpg";
import { ReactComponent as Icon } from "../../../../assets/iconfonts/mdi/icon/add-icon.svg";
import Colors from "../../../../common/constants/Colors";
import { useSelector } from "react-redux";

export default function ListProjectPage(props) {
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => {
    console.log(state);
    return state.AuthReducer.isAdmin;
  });

  const hardcodeProjectEmployees = [
    {
      id: 1,
      fullName: "Nguyễn Văn A",
      avatar: NoImage,
      isLeader: true,
    },
    {
      id: 2,
      fullName: "Lê Văn B",
      avatar: NoImage,
      isLeader: false,
    },
    {
      id: 3,
      fullName: "Trần Văn C",
      avatar: NoImage,
      isLeader: false,
    },
    {
      id: 4,
      fullName: "Vũ Văn D",
      avatar: NoImage,
      isLeader: false,
    },
  ];

  const projects = [
    {
      id: 1,
      projectLogo: "",
      description: "Description for project A",
      name: "Project A",
      customerName: "Scott Lang",
      statusModel: {
        id: 1,
        name: "Sẵn sàng",
      },
      employees: hardcodeProjectEmployees,
    },
    {
      id: 2,
      projectLogo: "",
      description: "Description for project B",
      name: "Project B",
      customerName: "Scott Lang",
      statusModel: {
        id: 2,
        name: "Đang hoạt động",
      },
      employees: hardcodeProjectEmployees,
    },
    {
      id: 3,
      projectLogo: "",
      description: "Description for project C",
      name: "Project C",
      customerName: "Scott Lang",
      statusModel: {
        id: 3,
        name: "Đang kiểm thử",
      },
      employees: hardcodeProjectEmployees,
    },
    {
      id: 4,
      projectLogo: "",
      description: "Description for project D",
      name: "Project D",
      customerName: "Scott Lang",
      statusModel: {
        id: 4,
        name: "Đã hoàn thành",
      },
      employees: hardcodeProjectEmployees,
    },
  ];

  const originList = [];

  function renderProjectStatus(statusModel) {
    switch (statusModel.id) {
      case 1:
        return (
          <div class="ribbon-two ribbon-two-custom">
            <span>{statusModel.name}</span>
          </div>
        );
      case 2:
        return (
          <div class="ribbon-two ribbon-two-warning">
            <span>{statusModel.name}</span>
          </div>
        );
      case 3:
        return (
          <div class="ribbon-two ribbon-two-danger">
            <span>{statusModel.name}</span>
          </div>
        );
      case 4:
      default:
        return (
          <div class="ribbon-two ribbon-two-success">
            <span>{statusModel.name}</span>
          </div>
        );
    }
  }

  function isAllowModify(projectId) {
    return projectId % 2 == 0;
  }

  function goToAddProject() {
    navigate("/add-project");
  }

  return (
    <div>
      {isAdmin && (
        <div
          class="row"
          style={{ margin: "2rem 0", position: "relative", left: "20rem" }}
        >
          <div class="col-sm-8">
            <div class="project-sort float-right">
              <div class="project-sort-item">
                <form class="form-inline">
                  <div class="form-group">
                    <label for="phase-select">Tình trạng :</label>
                    <select
                      class="form-control ml-2 form-control-sm"
                      id="phase-select"
                      onChange="getProjectByStatus($event.target.value)"
                    >
                      <option value="0">
                        Tất cả dự án(
                        {originList?.length > 0 ? originList.length : 0})
                      </option>
                      <option value="1">Sẵn sàng</option>
                      <option value="2">Đang hoạt động</option>
                      <option value="3">Đang kiểm thử</option>
                      <option value="4">Hoàn thành</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="sort-select">Sắp xếp :</label>
                    <select
                      class="form-control ml-2 form-control-sm"
                      id="sort-select"
                      onChange="sortListProject($event.target.value)"
                    >
                      <option value="byProjectName">Tên dự án</option>
                      <option value="byStatus">Trạng thái</option>
                      <option value="byCustomerName">Khách hàng</option>
                    </select>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {projects.length == 0 && (
        <div class="row">
          <p class="text-muted font-18">Hiện tại không có dự án nào !!!</p>
        </div>
      )}

      {projects && (
        <div class="row">
          {projects.map((proj) => {
            return (
              <div class="col-md-6 col-lg-4">
                <div class="card-box project-box ribbon-box">
                  {renderProjectStatus(proj.statusModel)}
                  {isAllowModify(proj.id) ? (
                    <div class="dropdown float-right">
                      <a
                        class="dropdown-toggle card-drop arrow-none"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <h3 class="m-0 text-muted">
                          <i class="mdi mdi-dots-horizontal"></i>
                        </h3>
                      </a>
                      <div
                        class="dropdown-menu dropdown-menu-right"
                        aria-labelledby="btnGroupDrop1"
                      >
                        <a class="dropdown-item" href="/edit-project">
                          <span class="mdi mdi-table-edit"></span> Chỉnh sửa
                        </a>
                        <a class="dropdown-item">
                          <span class="mdi mdi-timetable"></span> Rooms
                        </a>
                        {isAdmin && (
                          <a
                            class="dropdown-item"
                            onClick="deleteProject(proj.id)"
                          >
                            <span class="mdi mdi-delete-circle"></span> Xóa
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div class="dropdown float-right">
                      <a
                        class="dropdown-toggle card-drop arrow-none"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <h3 class="m-0 text-muted">
                          <i class="mdi mdi-dots-horizontal"></i>
                        </h3>
                      </a>
                      <div
                        class="dropdown-menu dropdown-menu-right"
                        aria-labelledby="btnGroupDrop1"
                      >
                        <a class="dropdown-item" href="/view-project">
                          <span class="mdi mdi-information-outline"></span> Xem
                          thông tin
                        </a>
                        <a class="dropdown-item">
                          <span class="mdi mdi-timetable"></span> Rooms
                        </a>
                      </div>
                    </div>
                  )}

                  <p class="project-hide-overflow ml-3">
                    <span class="thumb-lg member-thumb mr-15 m-b-10 d-inline-block">
                      <img
                        src={NoImage}
                        class="rounded-circle img-thumbnail"
                        altImg="friend"
                        titleImg={proj.name}
                      ></img>
                    </span>
                    <span class="projectNameDisplay mt-4">
                      <p class="text-dark font-15 text-bold">{proj.name}</p>
                      <p class="text-dark font-13 text-uppercase">
                        {proj.customerName}
                      </p>
                    </span>
                  </p>

                  <p
                    class="text-dark font-13 description-hide-overflow"
                    title={proj.description}
                  >
                    {proj.description}
                  </p>

                  <div class="project-members mt-4 memnber-hide-overflow">
                    <label class="mr-3">Leader: </label>
                    {proj.employees.map((employee) => {
                      if (employee.isLeader) {
                        return (
                          <div>
                            <a
                              href="/user-profile"
                              data-toggle="tooltip"
                              data-placement="top"
                              title={employee.fullName}
                              style={{
                                marginRight: "5px",
                              }}
                            >
                              <div class="thumb-md member-thumb">
                                <img
                                  src={employee.avatar}
                                  class="img-thumbnail project-leader-mark rounded-circle"
                                  alt="friend"
                                ></img>
                              </div>
                            </a>
                            {employee.fullName}
                          </div>
                        );
                      } else {
                        return <div></div>;
                      }
                    })}
                  </div>
                </div>
              </div>
            );
          })}
          <div
            class="col-md-6 col-lg-4"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button id="add-department" onClick={goToAddProject}>
              <div className="add-icon" style={{ height: "200px" }}>
                <Icon
                  style={{
                    fill: Colors.quite_blue,
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      )}

      <div class="row">
        <div class="col-12">
          <div class="text-center mb-3">
            <a
              class="btn btn-info btn-lg waves-effect waves-light"
              onClick="loadMoreProjects()"
            >
              <i class="mdi mdi-refresh"></i>Tải thêm dự án
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
