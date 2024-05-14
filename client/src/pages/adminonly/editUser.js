import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import UserForm from "../../components/UserParts/UserForm";

export default function EditUser() {
  const [user, setUser] = useState({
    id: "",
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
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://symptom-checker-with-mern-stack.onrender.com/user/${userId}`
      )
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [userId]);

  async function confirmEdit(e) {
    const inputFullName = document.getElementById("inputFullName");
    const inputGender = document.getElementById("inputGender");
    const inputDob = document.getElementById("inputDob");
    const inputEmail = document.getElementById("inputEmail");
    const inputPhoneNumber = document.getElementById("inputPhoneNumber");
    if (!inputEmail.checkValidity()) {
      alert("Email không hợp lệ");
      return;
    } else if (!inputPhoneNumber.checkValidity()) {
      alert("Số điện thoại không hợp lệ");
      return;
    } else if (
      !inputFullName.checkValidity() ||
      !inputGender.checkValidity() ||
      !inputDob.checkValidity()
    ) {
      alert("Thông tin cá nhân không hợp lệ");
      return;
    } else {
      e.preventDefault();
      const updatedUser = { ...user };
      console.log(updatedUser);
      axios
        .post(
          `https://symptom-checker-with-mern-stack.onrender.com/user/update/${userId}`,
          updatedUser
        )
        .then((res) => {
          setUser({
            id: "",
            email: "",
            phoneNumber: "",
            password: "",
            role: "",
            userInfos: {
              fullName: "",
              gender: "",
              dob: "",
              doctorID: null,
              medSpecialty: null,
            },
            status: "",
          });
          navigate(`/user/${userId}/view`);
        })
        .catch((err) => {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        });
    }
  }

  function updateStatus(newStatus) {
    axios
      .post(
        `https://symptom-checker-with-mern-stack.onrender.com/user/update-status/${userId}`,
        {
          status: newStatus,
        }
      )
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
    setUser({ ...user, status: newStatus });
  }

  function confirmDelete() {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
      axios
        .delete(
          `https://symptom-checker-with-mern-stack.onrender.com/user/${userId}`
        )
        .catch((err) => {
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
            <UserForm user={user} setUser={setUser} editMode={true} />
            <div className="row pt-3 pb-3 justify-content-end">
              <div className="col-3 d-grid gap-2">
                <NavLink
                  className="btn btn-outline-primary"
                  to={`/user/${userId}/view`}
                >
                  QUAY LẠI
                </NavLink>
              </div>
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={(e) => confirmEdit(e)}
                >
                  XÁC NHẬN CHỈNH SỬA
                </button>
              </div>
              <div className="col-3 d-grid gap-2">
                {user.status === "Normal" && (
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    disabled={user.status === "Blocked"}
                    onClick={() => updateStatus("Blocked")}
                  >
                    CHẶN
                  </button>
                )}
                {user.status === "Blocked" && (
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    disabled={user.status === "Normal"}
                    onClick={() => updateStatus("Normal")}
                  >
                    GỠ CHẶN
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
                  XÓA
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
