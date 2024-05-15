import React from "react";
import { NavLink } from "react-router-dom";

export default function Options() {
  return (
    <>
      {/* OPTIONS SECTION */}
      <section className="options w-100">
        <div className="content-container">
          <div className="opt-big-header">
            <div className="opt-big-header-text">Dịch vụ trực tuyến</div>
          </div>
          <div className="options-wrapper">
            <div className="c-6 md-12">
              <div className="opt-section">
                <div className="opt-header">
                  <div className="opt-header-text">Tiện ích</div>
                </div>
                <div className="opt-box">
                  <div className="opt-title">Chẩn đoán sức khoẻ trực tuyến</div>
                  <div className="opt-body">
                    Với phòng khám online, bạn có thể tiếp cận các dịch vụ y tế
                    chất lượng mà không cần ra khỏi nhà.
                  </div>
                  <div className="opt-btn-wrapper">
                    <NavLink className="opt-btn-link" to="/symptom-checker">
                      Chẩn đoán
                    </NavLink>
                  </div>
                </div>
                <div className="opt-box">
                  <div className="opt-title">Đăng ký lịch khám</div>
                  <div className="opt-body">
                    Đăng ký dịch vụ khám bệnh của chúng tôi để nhận được sự chăm
                    sóc y tế chất lượng cao mà bạn xứng đáng.
                  </div>
                  <div className="opt-btn-wrapper">
                    <NavLink className="opt-btn-link" to="/appt-request">
                      Đăng ký
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="c-6 md-12">
              <div className="opt-section">
                <div className="opt-header">
                  <div className="opt-header-text">Thông tin</div>
                </div>
                <div className="big-opt-box">
                  <div className="box-select">
                    <NavLink className="box-select-link">
                      <div className="box-icon">
                        <i className="bi bi-question-circle"></i>
                      </div>
                      <div className="box-text">Tư vấn</div>
                    </NavLink>
                  </div>
                  <div className="box-select">
                    <NavLink className="box-select-link">
                      <div className="box-icon">
                        <i className="bi bi-lungs"></i>
                      </div>
                      <div className="box-text">Chuyên khoa</div>
                    </NavLink>
                  </div>
                  <div className="box-select">
                    <NavLink className="box-select-link">
                      <div className="box-icon">
                        <i className="bi bi-calendar-heart"></i>
                      </div>
                      <div className="box-text">Lịch làm việc</div>
                    </NavLink>
                  </div>
                  <div className="box-select">
                    <NavLink className="box-select-link">
                      <div className="box-icon">
                        <i className="bi bi-file-earmark-medical"></i>
                      </div>
                      <div className="box-text">Bảng giá</div>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
