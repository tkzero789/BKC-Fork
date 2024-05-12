import Footer from "../../components/ForPages/Footer";
import HeartSVG from "../../assets/home/heartSVG.svg";
import DentistSVG from "../../assets/home/dentistSVG.svg";
import LungSVG from "../../assets/home/lungSVG.svg";
import EyesSVG from "../../assets/home/eyesSVG.svg";
import BoneSVG from "../../assets/home/boneSVG.svg";
import EarSVG from "../../assets/home/earSVG.svg";
import DnaSVG from "../../assets/home/dnaSVG.svg";
import TubeSVG from "../../assets/home/tubesSVG.svg";
import { Link } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const SpecialtyPage = () => {
  return (
    <>
      <div className="content-container">
        <Breadcrumbs
          className="breadcrumbs"
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link className="text-secondary" to="/home">
            Trang chủ
          </Link>
          ,<Typography className="text-dark">Chuyên khoa</Typography>,
        </Breadcrumbs>
      </div>
      <div className="specialty-list w-100">
        <div className="content-container">
          <h1>Chuyên khoa</h1>
          <div className="specialty-list-wrapper">
            <div className="specialty-item">
              <img src={HeartSVG} alt="" />
              <div className="specialty-item-info">
                <h4>Tim mạch</h4>
                <div className="specialty-info-text">
                  <p>
                    Khoa Tim mạch, không chỉ là một ngọn hải đăng sáng chói
                    trong lĩnh vực Y học lâm sàng, mà còn là một tấm bức bình
                    phong vững chắc bảo vệ sức khỏe và nâng tầm cuộc sống cho
                    hàng triệu con người trên toàn cầu. Sở hữu kiến thức chuyên
                    môn sâu rộng về cấu trúc và hoạt động của hệ thống tuần
                    hoàn, các bác sĩ chuyên khoa Tim mạch không chỉ là những
                    chiến lược gia tài ba trong việc xây dựng các phác đồ điều
                    trị cho các bệnh lý tim mạch phức tạp, mà còn là những người
                    bạn đồng hành không thể thiếu trong việc tư vấn và giáo dục
                    cộng đồng về việc bảo vệ và duy trì sức khỏe tim mạch.
                  </p>
                </div>
                <div className="specialty-item-link">
                  <Link to="/specialty-page/tim-mach">Xem chi tiết</Link>
                </div>
              </div>
            </div>

            <div className="specialty-item">
              <img src={BoneSVG} alt="" />
              <div className="specialty-item-info">
                <h4>Cơ - xương - khớp</h4>
                <div className="specialty-info-text">
                  <p>
                    Chuyên khoa Cơ-Xương-Khớp chỉnh hình không chỉ là một ngành
                    quan trọng mà còn là trụ cột của lĩnh vực Y học lâm sàng,
                    nắm giữ vai trò không thể phủ nhận trong việc chăm sóc sức
                    khỏe và chất lượng cuộc sống của hàng triệu người trên khắp
                    thế giới. Với sự chuyên môn về cấu trúc và chức năng của cơ
                    bắp, xương và khớp, các bác sĩ chuyên khoa trong lĩnh vực
                    này không chỉ đảm nhận vai trò quan trọng trong việc khám,
                    chẩn đoán và điều trị các vấn đề về cơ-xương-khớp mà còn
                    đóng góp tích cực vào việc tư vấn và giáo dục cộng đồng về
                    việc duy trì sức khỏe và phòng tránh bệnh tật.
                  </p>
                </div>
                <div className="specialty-item-link">
                  <Link to="/specialty-page/co-xuong-khop">Xem chi tiết</Link>
                </div>
              </div>
            </div>

            <div className="specialty-item">
              <img src={LungSVG} alt="" />
              <div className="specialty-item-info">
                <h4>Nội tổng hợp</h4>
                <div className="specialty-info-text">
                  <p>
                    Nội khoa là một chuyên ngành y tế rộng lớn, tập trung vào
                    việc ngăn ngừa, chẩn đoán và điều trị các bệnh lý ảnh hưởng
                    đến các cơ quan nội tạng và hệ thống chức năng trong cơ thể
                    con người, đặc biệt ở người trưởng thành. Các bác sĩ Nội
                    khoa được đào tạo chuyên sâu để trở thành những chuyên gia
                    sở hữu kiến thức uyên thâm về các bệnh lý phức tạp và khả
                    năng điều trị toàn diện cho bệnh nhân.
                  </p>
                </div>
                <div className="specialty-item-link">
                  <Link to="/specialty-page/noi-tong-hop">Xem chi tiết</Link>
                </div>
              </div>
            </div>

            <div className="specialty-item">
              <img src={DentistSVG} alt="" />
              <div className="specialty-item-info">
                <h4>Răng - hàm - mặt</h4>
                <div className="specialty-info-text">
                  <p>
                    Chuyên khoa Răng - Hàm - Mặt giữ vị trí then chốt trong việc
                    bảo vệ sức khỏe răng miệng tổng thể. Bác sĩ chuyên khoa sẽ
                    thực hiện các biện pháp thăm khám, chẩn đoán tỉ mỉ để xác
                    định chính xác tình trạng của bạn. Quá trình này có thể bao
                    gồm kiểm tra trực tiếp răng miệng, chụp X-quang để kiểm tra
                    cấu trúc bên trong, và đôi khi cần thêm các xét nghiệm hình
                    ảnh chi tiết như CT hoặc MRI.
                  </p>
                </div>
                <div className="specialty-item-link">
                  <Link to="/specialty-page/rang-ham-mat">Xem chi tiết</Link>
                </div>
              </div>
            </div>

            <div className="specialty-item">
              <img src={EyesSVG} alt="" />
              <div className="specialty-item-info">
                <h4>Mắt</h4>
                <div className="specialty-info-text">
                  <p>
                    Chuyên khoa Mắt đóng vai trò thiết yếu trong việc chăm sóc
                    và bảo vệ "cửa sổ tâm hồn" của chúng ta. Các bác sĩ chuyên
                    khoa sẽ thực hiện các biện pháp chẩn đoán, điều trị và phòng
                    ngừa toàn diện nhằm mang lại cho bạn đôi mắt khỏe mạnh và
                    tầm nhìn rõ ràng. Phạm vi hoạt động của chuyên khoa Mắt rất
                    rộng, đáp ứng nhu cầu chăm sóc mắt của mọi lứa tuổi.
                  </p>
                </div>
                <div className="specialty-item-link">
                  <Link to="/specialty-page/mat">Xem chi tiết</Link>
                </div>
              </div>
            </div>

            <div className="specialty-item">
              <img src={TubeSVG} alt="" />
              <div className="specialty-item-info">
                <h4>Xét nghiệm</h4>
                <div className="specialty-info-text">
                  <p>
                    Xét nghiệm đóng vai trò nền tảng trong việc chẩn đoán chính
                    xác tình trạng sức khỏe của bạn. Nó giống như một công cụ
                    điều tra, giúp bác sĩ thu thập thông tin chi tiết bên trong
                    cơ thể bạn mà mắt thường không thể nhìn thấy. Xét nghiệm có
                    thể được thực hiện trên nhiều loại mẫu khác nhau, tùy thuộc
                    vào từng bệnh lý nghi ngờ. Mẫu xét nghiệm phổ biến nhất là
                    máu, cung cấp thông tin về các tế bào máu, đường huyết, mỡ
                    máu, chức năng gan thận và nhiều yếu tố khác.
                  </p>
                </div>
                <div className="specialty-item-link">
                  <Link to="/specialty-page/xet-nghiem">Xem chi tiết</Link>
                </div>
              </div>
            </div>

            <div className="specialty-item">
              <img src={EarSVG} alt="" />
              <div className="specialty-item-info">
                <h4>Tai - mũi - họng</h4>
                <div className="specialty-info-text">
                  <p>
                    Chuyên khoa Tai - Mũi - Họng đóng vai trò then chốt trong
                    việc bảo vệ sức khỏe vùng đầu cổ của chúng ta. Đây là lĩnh
                    vực y tế tập trung vào chẩn đoán, điều trị và phòng ngừa các
                    vấn đề liên quan đến tai, mũi và họng, đảm bảo chức năng
                    hoạt động hiệu quả của các cơ quan này.
                  </p>
                </div>
                <div className="specialty-item-link">
                  <Link to="/specialty-page/tai-mui-hong">Xem chi tiết</Link>
                </div>
              </div>
            </div>

            <div className="specialty-item">
              <img src={DnaSVG} alt="" />
              <div className="specialty-item-info">
                <h4>Thần kinh</h4>
                <div className="specialty-info-text">
                  <p>
                    Hệ thần kinh đóng vai trò trung tâm điều khiển, giống như
                    một bộ chỉ huy phức tạp, dẫn dắt mọi hoạt động của cơ thể
                    chúng ta. Mạng lưới này bao gồm não bộ, tủy sống, các dây
                    thần kinh lan tỏa khắp cơ thể và các thụ thể cảm giác tinh
                    nhạy. Hệ thần kinh có nhiệm vụ thu thập thông tin từ môi
                    trường xung quanh và bên trong, xử lý chúng, rồi đưa ra tín
                    hiệu điều khiển hoạt động của các cơ quan, giúp cơ thể phản
                    ứng chính xác với mọi tình huống.
                  </p>
                </div>
                <div className="specialty-item-link">
                  <Link to="/specialty-page/than-kinh">Xem chi tiết</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SpecialtyPage;
