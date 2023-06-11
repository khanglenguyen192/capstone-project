import React, { useEffect, useState } from "react";
import NoImage from "../../../assets/images/no-image.jpg";
import "./SalaryDetailPage.css";
import { useSelector, useDispatch } from "react-redux";
import dateFormat from "dateformat";
import SalaryService from "../../../services/SalaryService";

export default function SalaryDetailPage(props) {
  const isAdmin = useSelector((state) => {
    return state.AuthReducer.isAdmin;
  });

  const user = useSelector((state) => {
    return state.AuthReducer.user;
  });

  useDispatch()({
    type: "salary",
  });

  const [salary, setSalary] = useState({});

  const date = dateFormat(new Date(), "mm/yyyy");

  useEffect(() => {
    getSalary();
  }, []);

  const getSalary = () => {
    SalaryService.getSalary(user.userId, user.token).then((res) => {
      var response = res.data;

      if (response != null && response.payload != null) {
        setSalary(response.payload);
      }
    });
  };

  return (
    <div class="row">
      <div class="col-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <div class="fixed-img-name">
              <div class="header-salary">
                <span class="mb-2">Bảng lương tháng {date}</span>
                <div class="text-dark font-18 font-600 mb-2">
                  <button
                    type="button"
                    class="btn btn-light"
                    onClick="updateMonth('previous')"
                  >
                    <i class="mdi mdi-arrow-left-bold"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-light mr-1"
                    onClick="updateMonth('next')"
                  >
                    <i class="mdi mdi-arrow-right-bold"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-custom"
                    onClick="updateMonth('today')"
                  >
                    Hôm nay
                  </button>
                  {isAdmin && (
                    <button
                      type="button"
                      class="{
                    salary.isApprove || salary.isEmptySalary
                      ? 'approve btn btn-light '
                      : 'btn btn-light'
                  }"
                      onClick="lockSalary()"
                    >
                      Khóa sổ
                    </button>
                  )}
                  <button
                    type="button"
                    class="btn btn-light"
                    onClick="exportSalaryForCurrentUser()"
                  >
                    Trích xuất
                  </button>
                </div>
              </div>
            </div>

            <div
              class="btn-group text-right fixed-btn-group"
              role="group"
              aria-label="salary button"
            >
              <span class="badge badge-custom">
                <img
                  src={NoImage}
                  class="img-cover img-xs rounded-circle mt-2"
                  width="55"
                  height="55"
                ></img>
                <span class="salaryNameDisplay mt-3 ml-3">
                  <p
                    class="text-dark font-15 text-uppercase text-bold"
                    style={{
                      marginBottom: "-2px",
                    }}
                  >
                    {user.fullName}
                  </p>
                  <p class="text-dark font-13 text-uppercase">{user.role}</p>
                </span>
              </span>
            </div>

            <div class="table-layout-adm">
              <table class="table table-striped table-bordered">
                <tbody>
                  <tr>
                    <th colspan="2">Lương cơ bản</th>
                    <td>{salary.basicSalary}</td>
                  </tr>

                  <tr>
                    <th rowspan="4">Phụ cấp không đóng BH</th>
                    <th>Ăn trưa</th>
                    <td>{salary.lunchMoney}</td>
                  </tr>

                  <tr>
                    <th>Điện thoại</th>
                    <td>{salary.telephoneFee}</td>
                  </tr>

                  <tr>
                    <th>Xăng xe</th>
                    <td>{salary.petrolMoney}</td>
                  </tr>

                  <tr>
                    <th>Nhà ở</th>
                    <td>{salary.housingSupport}</td>
                  </tr>

                  <tr>
                    <th colspan="2">Hiệu suất làm việc</th>
                    <td>{salary.salaryPerformance}</td>
                  </tr>

                  <tr>
                    <th colspan="2">Tiền thưởng lễ</th>
                    <td>{salary.holidayBonus}</td>
                  </tr>

                  <tr>
                    <th rowspan="3">Chi tiết tăng ca</th>
                    <th>Tổng số giờ đã tăng ca</th>
                    <td>{salary.totalOTHours}</td>
                  </tr>

                  <tr>
                    <th>Số tiền quy đổi cho một giờ tăng ca</th>
                    <td>{salary.otRate}</td>
                  </tr>

                  <tr>
                    <th>Tổng tiền tăng ca</th>
                    <td>{salary.otSalary}</td>
                  </tr>

                  <tr>
                    <th colspan="2">Tổng phụ cấp, thưởng</th>
                    <td>{salary.totalAllowance}</td>
                  </tr>

                  <tr class="minus-salary">
                    <th>Khấu trừ ngày nghỉ</th>
                    <td>{salary.paidDayOff}</td>
                  </tr>

                  <tr>
                    <th colspan="2">Tổng thu nhập</th>
                    <td>{salary.totalIncome}</td>
                  </tr>

                  <tr>
                    <th colspan="2">Lương tính đóng BHXH, BHYT</th>
                    <td>{salary.salaryCalculatedForBHXHnBHYT}</td>
                  </tr>

                  <tr>
                    <th colspan="2">Lương tính đóng BHTN</th>
                    <td>{salary.salaryCalculatedForBHTN}</td>
                  </tr>

                  <tr>
                    <th rowspan="5">Khoản trích tính vào CP</th>
                    <th>BHXH</th>
                    <td>{salary.bhxh}</td>
                  </tr>
                  <tr>
                    <th>BHYT</th>
                    <td>{salary.bhyt}</td>
                  </tr>
                  <tr>
                    <th>BHTN</th>
                    <td>{salary.bhtn}</td>
                  </tr>
                  <tr>
                    <th>KPCĐ</th>
                    <td>{salary.kpcd}</td>
                  </tr>
                  <tr>
                    <th>Cộng</th>
                    <td>{salary.totalCP}</td>
                  </tr>

                  <tr>
                    <th rowspan="4">Bảo hiểm bắt buộc</th>
                    <th>BHXH</th>
                    <td>{salary.bhxhCompulsory}</td>
                  </tr>

                  <tr>
                    <th>BHYT</th>
                    <td>{salary.bhytCompulsory}</td>
                  </tr>

                  <tr>
                    <th>BHTN</th>
                    <td>{salary.bhtnCompulsory}</td>
                  </tr>

                  <tr>
                    <th>Cộng</th>
                    <td>{salary.totalCompulsoryInsurance}</td>
                  </tr>

                  <tr>
                    <th rowspan="9"></th>
                    <th>Giảm trừ bản thân</th>
                    <td>{salary.reduceYourself}</td>
                  </tr>

                  <tr>
                    <th>Thu nhập miễn thuế TNCN</th>
                    <td>{salary.net}</td>
                  </tr>

                  <tr>
                    <th>TNCN chưa bao gồm tiền thuê nhà</th>
                    <td>{salary.pitExcludingRent}</td>
                  </tr>

                  <tr>
                    <th>TN làm căn cứ quy đổi(bao gồm tiền thuê nhà)</th>
                    <td>{salary.tnConversionIncludingRent}</td>
                  </tr>

                  <tr>
                    <th>Thu nhập tính thuế</th>
                    <td>{salary.taxableIncome}</td>
                  </tr>

                  <tr>
                    <th>Thuế TNCN</th>
                    <td>{salary.pit}</td>
                  </tr>

                  <tr class="minus-salary">
                    <th>Thuế TNCN khấu trừ từ tăng ca</th>
                    <td>{salary.pitByEmployee}</td>
                  </tr>

                  <tr>
                    <th>Tổng thu nhập chịu thuế</th>
                    <td>{salary.totalTaxableIncome}</td>
                  </tr>

                  <tr class="minus-salary">
                    <th>Tạm ứng</th>
                    <td>{salary.cashAdvance}</td>
                  </tr>

                  <tr>
                    <th colspan="2">Tổng cộng</th>
                    <td>{salary.totalTax}</td>
                  </tr>

                  <tr>
                    <th colspan="2">Thực lĩnh</th>
                    <td>{salary.realSalary}</td>
                  </tr>
                </tbody>
              </table>

              {salary.isEmptySalary && (
                <h3 class="text-dark font-16">
                  Không có dữ liệu bảng lương của tháng này
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
