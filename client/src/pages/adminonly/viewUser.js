import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

import UserForm from "../../components/UserParts/UserForm";

export default function ViewUser() {
  const [user, setUser] = useState({
    email: "",
    phoneNumber: "",
    role: "",
    userInfos: {
      fullName: "",
      gender: "",
      dob: "",
      doctorID: "",
      medSpecialty: "",
    },
    status: "",
  });
  const { userId } = useParams();

  useEffect(() => {
    console.log(userId);
    axios
      .get(`http://localhost:5000/user/${userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [userId]);

  function updateStatus(newStatus) {
    axios
      .post(`http://localhost:5000/user/update-status/${userId}`, {
        status: newStatus,
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
    setUser({ ...user, status: newStatus });
  }

  function confirmDelete() {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
      axios.delete(`http://localhost:5000/user/${userId}`).catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
    }
  }

  return (
    <div>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
          <form>
            <UserForm user={user} editMode={false} />
            <div className="row pt-3 pb-3 justify-content-end">
              <div className="col-3 d-grid gap-2">
                <NavLink
                  className="btn btn-outline-secondary"
                  to={`/user-table`}
                >
                  Quay lại
                </NavLink>
              </div>
              <div className="col-3 d-grid gap-2">
                <NavLink
                  className="btn btn-warning"
                  to={`/user/${userId}/edit`}
                >
                  Chỉnh sửa
                </NavLink>
              </div>
              <div className="col-3 d-grid gap-2">
                {user.status === "Normal" && (
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    disabled={user.status === "Blocked"}
                    onClick={() => updateStatus("Blocked")}
                  >
                    Chặn
                  </button>
                )}
                {user.status === "Blocked" && (
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    disabled={user.status === "Normal"}
                    onClick={() => updateStatus("Normal")}
                  >
                    Gỡ chặn
                  </button>
                )}
              </div>
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  disabled={user.status === "Spam"}
                  onClick={() => confirmDelete()}
                >
                  Xoá
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
