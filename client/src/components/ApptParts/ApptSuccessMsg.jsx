import ApptIMG from "../../assets/appt/apptReq.jpg";
import { Link } from "react-router-dom";
import ConfirmIcon from "../../assets/appt/confirm-icon.svg";

const ApptSuccessMsg = () => {
  return (
    <>
      {/* Appointment Request Hero Image */}
      <div className="appt-img">
        <img src={ApptIMG} alt="Appointment" />
      </div>
      <div className="appt w-100">
        <div className="content-container">
          <div className="appt-success">
            <div className="appt-success-wrapper">
              <div className="appt-success-header">
                Cảm ơn quý khách đã đặt hẹn
              </div>
              <div className="appt-success-info">
                <div className="appt-success-icon">
                  <img src={ConfirmIcon} alt="Success icon" />
                </div>
                <p>
                  Tổng đài BKCare sẽ liên hệ Quý khách trong thời gian sớm nhất
                  để xác nhận lịch hẹn. <br />
                  Cảm ơn Quý khách đã lựa chọn dịch vụ của BKCare.
                </p>

                <Link to="/view-blog-list">
                  Xem tin tức mới nhất về y học và các hoạt động của bệnh viện
                </Link>
                <Link to="/symptom-checker">
                  Sử dụng dịch vụ chẩn đoán sức khoẻ trực tuyến
                </Link>
              </div>
              <hr />
              <div className="back-to-home">
                <Link to="/home" className="text-decoration-none">
                  Trở về trang chủ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApptSuccessMsg;
