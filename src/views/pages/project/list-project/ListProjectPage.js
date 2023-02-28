import React, { useState } from "react";
import AddButton from "../../../components/AddButton";

export default function ListProjectPage(props) {
  const [isAdmin, setAdmin] = useState(true);

  const projects = [];

  const originList = [];

  return (
    <div>
      {isAdmin && (
        <div class="row">
          <div class="col-sm-4">
            <AddButton text="Thêm dự án"></AddButton>
          </div>

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
    </div>
  );
}
