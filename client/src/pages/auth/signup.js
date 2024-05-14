import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Signup() {
  const [user, setUser] = useState({
    id: uuidv4(),
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
    status: "Normal",
  });

  const updateUserField = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const updateInfoField = (event) => {
    setUser({
      ...user,
      userInfos: {
        ...user.userInfos,
        [event.target.name]: event.target.value,
      },
    });
  };

  const navigate = useNavigate();

  async function confirmSignup(e) {
    const inputFullName = document.getElementById("inputFullName");
    const inputGender = document.getElementById("inputGender");
    const inputDob = document.getElementById("inputDob");
    const inputDoctorID = document.getElementById("inputDoctorID");
    const inputMedSpecialty = document.getElementById("inputMedSpecialty");
    const inputRole = document.getElementById("inputRole");
    const inputEmail = document.getElementById("inputEmail");
    const inputPhoneNumber = document.getElementById("inputPhoneNumber");
    const inputPassword = document.getElementById("inputPassword");
    if (!inputEmail.checkValidity()) {
      alert("Email không hợp lệ");
      return;
    } else if (!inputPhoneNumber.checkValidity()) {
      alert("Số điện thoại không hợp lệ");
      return;
    } else if (!inputPassword.checkValidity()) {
      alert("Mật khẩu phải có ít nhất 8 ký tự");
      return;
    } else if (
      !inputFullName.checkValidity() ||
      !inputGender.checkValidity() ||
      !inputDob.checkValidity() ||
      !inputDoctorID.checkValidity() ||
      !inputMedSpecialty.checkValidity() ||
      !inputRole.checkValidity()
    ) {
      alert("Thông tin cá nhân không hợp lệ");
      return;
    } else {
      e.preventDefault();
      const newUser = { ...user };
      console.log(newUser);
      axios
        .post(
          "https://symptom-checker-with-mern-stack.onrender.com/signup",
          newUser
        )
        .then((res) => {
          console.log("User created");
          console.log(res.data);
          setUser({
            id: uuidv4(),
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
            status: "Normal",
          });
          navigate("/signin");
        })
        .catch((err) => {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        });
    }
  }

  return (
    <div>
      <h3 className="container text-center text-primary pt-5">
        ĐĂNG KÝ TÀI KHOẢN
      </h3>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
          <form className="needs-validation" noValidate>
            <div className="row">
              <div className="col-12 p-0">
                <div className="row pb-5">
                  <h6 className="col-2 d-flex justify-content-end align-items-center">
                    Họ và tên:
                  </h6>
                  <div className="col-10">
                    <input
                      type="text"
                      className="form-control border-primary-subtle px-2"
                      id="inputFullName"
                      name="fullName"
                      value={user.userInfos.fullName}
                      required
                      onChange={(e) => updateInfoField(e)}
                    />
                  </div>
                </div>
                <div className="row pb-5">
                  <h6 className="col-2 d-flex justify-content-end align-items-center">
                    Giới tính:
                  </h6>
                  <div className="col-10">
                    <select
                      type="text"
                      className="form-control border-primary-subtle px-2"
                      id="inputGender"
                      name="gender"
                      value={user.userInfos.gender}
                      onChange={(e) => updateInfoField(e)}
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>
                </div>
                <div className="row pb-5">
                  <h6 className="col-2 d-flex justify-content-end align-items-center">
                    Ngày sinh:
                  </h6>
                  <div className="col-10">
                    <input
                      type="text"
                      className="form-control border-primary-subtle px-2"
                      placeholder="dd/mm/yyyy"
                      id="inputDob"
                      name="dob"
                      value={user.userInfos.dob}
                      pattern="^\d{2}\/\d{2}\/\d{4}$"
                      onChange={(e) => updateInfoField(e)}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 p-0">
                <div className="row pb-5">
                  <h6 className="col-2 d-flex justify-content-end align-items-center">
                    Email:
                  </h6>
                  <div className="col-10">
                    <input
                      type="email"
                      className="form-control border-primary-subtle px-2"
                      id="inputEmail"
                      name="email"
                      value={user.email}
                      placeholder="abc@gmail.com"
                      required
                      onChange={(e) => updateUserField(e)}
                    />
                  </div>
                </div>
                <div className="row pb-5">
                  <h6 className="col-2 d-flex justify-content-end align-items-center">
                    Số điện thoại:
                  </h6>
                  <div className="col-10">
                    <input
                      type="tel"
                      className="form-control border-primary-subtle px-2"
                      id="inputPhoneNumber"
                      name="phoneNumber"
                      value={user.phoneNumber}
                      pattern="[0-9]{10}"
                      required
                      onChange={(e) => updateUserField(e)}
                    />
                  </div>
                </div>
                <div className="row pb-5">
                  <h6 className="col-2 d-flex justify-content-end align-items-center">
                    Mật khẩu:
                  </h6>
                  <div className="col-10">
                    <input
                      type="password"
                      className="form-control border-primary-subtle px-2"
                      id="inputPassword"
                      name="password"
                      value={user.password}
                      minLength="8"
                      placeholder="Ít nhất 8 ký tự"
                      required
                      onChange={(e) => updateUserField(e)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row pt-3 pb-3 justify-content-center">
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={confirmSignup}
                >
                  XÁC NHẬN ĐĂNG KÝ
                </button>
              </div>
            </div>
            <div className="row pb-3 justify-content-center">
              <div className="col-12 pb-3 d-flex justify-content-center">
                Bạn đã có tài khoản? &nbsp;
                <NavLink
                  className="text-primary text-decoration-underline"
                  to="/signin"
                >
                  Đăng nhập ngay
                </NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
