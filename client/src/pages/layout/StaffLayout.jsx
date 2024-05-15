import "./list.scss";
import Sidebar from "../../components/Sidebar/SidebarTemp";
import Navbar from "../../components/adminNav/AdminNav";

export default function NavbarLayout({ title, children }) {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
