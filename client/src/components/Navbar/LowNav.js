import React from "react";
import { NavLink } from "react-router-dom";

export default function LowNav() {
  const navLinks = [
    { link: "/view-blog-list", text: "Tin tức" },
    { link: "/specialty-page", text: "Chuyên khoa" },
    { link: "/symptom-checker", text: "Chẩn đoán" },
    { link: "/work-schedule", text: "Lịch làm việc" },
  ];

  return (
    <>
      {/* LOWER NAVBAR */}
      <div className="w-100 low-nav-bg border-top">
        <div className="nav-container">
          <nav className="low-nav-bg py-0 d-none d-lg-block d-xl-block">
            <ul className="low-nav-list">
              {navLinks.map((link) => (
                <li key={link.link} className="low-nav-item">
                  <NavLink to={link.link}>
                    <div className="low-nav-text">{link.text}</div>
                  </NavLink>
                </li>
              ))}
              {/* DROPDOWN  */}
              <li className="low-nav-item dropdown-list-item">
                <div className="dropdown-list-box">
                  <div className="low-nav-text">Khác</div>
                  <div className="dropdown-content">
                    <NavLink to="/work-schedule">Lịch làm việc</NavLink>
                    <NavLink>Bảo hiểm</NavLink>
                    <NavLink>Tra cứu</NavLink>
                    <NavLink>Thông tin Dược</NavLink>
                    <NavLink>Bảng giá dịch vụ</NavLink>
                    <NavLink>Viện nghiên cứu</NavLink>
                    <NavLink>Hoạt động vì cộng đồng</NavLink>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
