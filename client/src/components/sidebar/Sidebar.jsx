import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import GridViewIcon from "@mui/icons-material/GridView";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import TodayIcon from "@mui/icons-material/Today";
import FeedIcon from "@mui/icons-material/Feed";
import PeopleIcon from "@mui/icons-material/People";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import BKCLogo from "../../assets/logo/footerLogo2.svg";
import { useAuth } from "../../AuthContext";
import "./sidebar.scss";

export default function Sidebar() {
  const { logout, getUserRole } = useAuth();
  const userRole = getUserRole();
  const navigate = useNavigate();

  // Handle sign out
  const handleSignOut = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        console.error("No token found in storage");
        return;
      }
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.post(
        "http://localhost:5000/signout",
        null,
        config
      );
      console.log("Signed out");
      logout();
      navigate("/test-signin");
    } catch (err) {
      const message = `Có lỗi xảy ra: ${err}`;
      window.alert(message);
    }
  };

  return (
    <div className="sidebar">
      <div className="top">
        <NavLink
          className="logo-link"
          to="/staff-home"
          style={{ textDecoration: "none" }}
        >
          <div className="admin-logo">
            <img src={BKCLogo} alt="" />
          </div>
        </NavLink>
      </div>

      <div className="center">
        <ul>
          <NavLink to="/dashboard" activeclassname="active">
            <li>
              <GridViewIcon className="icon" />
              <span>Tổng hợp</span>
            </li>
          </NavLink>
          <NavLink to="/symptom-table" activeclassname="active">
            <li>
              <MonitorHeartIcon className="icon" />
              <span>Triệu chứng</span>
            </li>
          </NavLink>
          <NavLink to="/disease-table" activeclassname="active">
            <li>
              <MedicalServicesIcon className="icon" />
              <span>Căn bệnh</span>
            </li>
          </NavLink>
          <NavLink to="/article-table" activeclassname="active">
            <li>
              <FeedIcon className="icon" />
              <span>Bài viết</span>
            </li>
          </NavLink>
          {userRole === "admin" && (
            <NavLink to="/appointment-table" activeclassname="active">
              <li>
                <TodayIcon className="icon" />
                <span>Đặt hẹn</span>
              </li>
            </NavLink>
          )}
          {userRole === "admin" && (
            <NavLink to="/user-table" activeclassname="active">
              <li>
                <PeopleIcon className="icon" />
                <span>Tài khoản</span>
              </li>
            </NavLink>
          )}
          <NavLink to="/notif-table" activeclassname="active">
            <li>
              <HelpCenterIcon className="icon" />
              <span>Thông báo</span>
            </li>
          </NavLink>
          <NavLink to="/blog-table" activeclassname="active">
            <li>
              <NewspaperIcon className="icon" />
              <span>Blogs</span>
            </li>
          </NavLink>
          <NavLink to="">
            <li>
              <SettingsApplicationsIcon className="icon" />
              <span>Cài đặt</span>
            </li>
          </NavLink>
          <NavLink to="" onClick={handleSignOut}>
            <li>
              <ExitToAppIcon className="icon" />
              <span>Đăng xuất</span>
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}
