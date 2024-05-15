import React from "react";
import HospitalImg from "../assets/home/hospitalBuilding.jpg";

export default function About() {
  return (
    <>
      {/* ABOUT SECTION */}
      <section className="about w-100">
        <div className="content-container">
          <div className="about-wrapper">
            <div className="c-6 md-12">
              <div className="about-section">
                <div className="about-header">
                  BKCare - Nơi gửi gắm niềm tin sức khỏe
                </div>
                <div className="about-body">
                  <span>
                    Chào mừng bạn đến với Bệnh viện BKC, nơi cung cấp dịch vụ
                    chăm sóc sức khỏe chất lượng cao với sự tận tâm và chuyên
                    nghiệp. BKCare tự hào là một trong những bệnh viện uy tín
                    tại Việt Nam, với đội ngũ y bác sĩ giàu kinh nghiệm và trang
                    thiết bị hiện đại.
                  </span>
                  <br />
                  <br />
                  <span>
                    BKCare luôn chú trọng đến việc tạo dựng môi trường y tế thân
                    thiện, ấm áp, giúp người bệnh cảm thấy thoải mái và an tâm
                    khi điều trị. Chúng tôi tự tin là điểm đến lý tưởng cho bạn
                    khi cần chăm sóc sức khỏe bản thân và gia đình.
                  </span>
                </div>
              </div>
            </div>
            <div className="c-6 md-12">
              <div className="about-img">
                <img
                  className="hospital-img"
                  src={HospitalImg}
                  alt="Hospital Building About Section"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
