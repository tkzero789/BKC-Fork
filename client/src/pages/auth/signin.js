import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";

import { useAuth } from "../../AuthContext";
import SignupLogo from "../../assets/logo/signup-logo.png";

export default function Signin() {
  const [user, setUser] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    role: "patient",
  });
  const { login } = useAuth();

  const updateEmailOrPhoneField = (event) => {
    let _user = { ...user };
    const inputValue = event.target.value.trim();
    if (inputValue.includes("@")) {
      _user["email"] = event.target.value;
    } else {
      _user["phoneNumber"] = event.target.value;
    }
    setUser(_user);
  };

  const updatePasswordField = (event) => {
    let _user = { ...user };
    _user[event.target.name] = event.target.value;
    setUser(_user);
  };

  const navigate = useNavigate();

  async function confirmSignin(e) {
    e.preventDefault();
    await axios
      .post("https://symptom-checker-with-mern-stack.onrender.com/signin", user)
      .then((res) => {
        console.log("Signed in");
        console.log(res.data);
        setUser({
          email: "",
          phoneNumber: "",
          password: "",
          role: "patient",
        });
        const token = res.data.token;
        login(token);
        navigate("/");
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          window.alert("Thông tin đăng nhập không chính xác. Vui lòng thử lại");
        } else {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        }
        return;
      });
  }

  return (
    <div className="m-5">
      <h3 className="container text-center text-primary pt-5">ĐĂNG NHẬP</h3>
      <div className="container p-5">
        <div className="card border-primary-subtle p-3 pt-4">
          <form className="needs-validation" noValidate>
            <div className="row pb-3">
              <h6 className="col-3 d-flex justify-content-end align-items-center">
                Email/Số điện thoại:
              </h6>
              <div className="col-9">
                <input
                  type="text"
                  className="form-control border-primary-subtle px-2"
                  id="inputEmailOrPhone"
                  name=""
                  required
                  onChange={(e) => updateEmailOrPhoneField(e)}
                />
              </div>
            </div>
            <div className="row pb-3">
              <h6 className="col-3 d-flex justify-content-end align-items-center">
                Mật khẩu
              </h6>
              <div className="col-9">
                <input
                  type="password"
                  className="form-control border-primary-subtle px-2"
                  id="inputPassword"
                  name="password"
                  minLength="8"
                  required
                  onChange={(e) => updatePasswordField(e)}
                />
              </div>
            </div>

            <div className="row pt-3 pb-3 justify-content-center">
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={(e) => confirmSignin(e)}
                >
                  ĐĂNG NHẬP
                </button>
              </div>
            </div>
            <div className="row pb-3 justify-content-center">
              <div className="col-12 d-flex justify-content-center">
                Bạn chưa có tài khoản? &nbsp;
                <NavLink
                  className="text-primary text-decoration-underline"
                  to="/signup"
                >
                  Đăng ký ngay
                </NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
