import React from "react";
import { NavLink } from "react-router-dom";
// import BKCsvg from "../../assets/logo/footerLogo.svg";
import BKCsvg from "../../assets/logo/footerLogo2.svg";

const footerLinks1 = [
  { name: "Trang chủ", link: "/" },
  { name: "Giới thiệu", link: "/" },
  { name: "Đối tác", link: "/" },
  { name: "Dự án", link: "/" },
  { name: "Đội ngũ", link: "/" },
  { name: "Tuyển dụng", link: "/" },
];

const footerLinks2 = [
  { name: "Dịch vụ", link: "/" },
  { name: "Tư vấn", link: "/" },
  { name: "Chuyên khoa", link: "/" },
  { name: "Đặt lịch khám", link: "/" },
  { name: "Viện nghiên cứu", link: "/" },
  { name: "Thông tin Dược", link: "/" },
];

export default function Footer() {
  return (
    <footer className="footer w-100 footer-bg">
      <div className="content-container">
        <div className="footer-wrapper">
          <div className="c-3 md-12">
            <div className="footer-logo-wrapper">
              <img className="footer-logo" src={BKCsvg} alt="Footer logo"></img>
            </div>
            <div className="footer-logo-header">
              <span>Công ty cổ phần bệnh viện Đa khoa BKCare</span>
            </div>
            <div className="footer-logo-address">
              <span>Khu túc xá Đại Học Quốc Gia thành phố Hồ Chí Minh</span>
            </div>
          </div>
          <div className="c-3 md-6">
            <div className="footer-header">Liên kết nhanh</div>
            <ul className="footer-list">
              {footerLinks1.map((e) => (
                <li className="footer-item" key={e.name}>
                  <NavLink className="footer-item__link" to={e.link}>
                    {e.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="c-3 md-6">
            <div className="footer-header">Hỗ trợ khách hàng</div>
            <ul className="footer-list">
              {footerLinks2.map((link) => (
                <li className="footer-item" key={link.name}>
                  <NavLink className="footer-item__link" to={link.link}>
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="c-3 md-12">
            <div className="footer-header">Mạng xã hội</div>
            <div className="footer-socials">
              <NavLink className="footer-socials__link">
                <div className="footer-socials-icon">
                  <span>
                    <i className="bi bi-facebook"></i>
                  </span>
                </div>
              </NavLink>
              <NavLink className="footer-socials__link">
                <div className="footer-socials-icon">
                  <span>
                    <i className="bi bi-youtube"></i>
                  </span>
                </div>
              </NavLink>
            </div>
            <div className="footer-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125424.37507381833!2d106.57549990679829!3d10.772064120329766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ec3c161a3fb%3A0xef77cd47a1cc691e!2sHo%20Chi%20Minh%20City%20University%20of%20Technology%20(HCMUT)!5e0!3m2!1sen!2sus!4v1712861600232!5m2!1sen!2sus"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="footer-copyright">
          <div className="copyright-header">
            <span>Copyright © 2024 BKCare. All rights reserved.</span>
          </div>
          <div className="copyright-body">
            <span>
              Các thông tin trên website BKCare.com chỉ dành cho mục đích tham
              khảo, tra cứu, khuyến nghị. Quý khách hàng không tự ý áp dụng.
              BKCare không chịu trách nhiệm về những trường hợp tự ý áp dụng mà
              không có chỉ định của bác sĩ.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
