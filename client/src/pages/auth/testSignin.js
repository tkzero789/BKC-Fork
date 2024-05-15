import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useAuth } from "../../AuthContext";
import axios from "axios";
import BKCsvg from "../../assets/logo/bkcaresvg.svg";
import { Toaster, toast } from "sonner";

export default function TestSignin() {
  // User
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

  // Confirm Sign In
  async function confirmSignin(e) {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/signin", user)
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
          toast.error("Thông tin đăng nhập không chính xác. Vui lòng thử lại");
        } else {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        }
        return;
      });
  }

  // Check for empty input
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  const checkInputEmpty = () => {
    const isEmpty = (!user.email && !user.phoneNumber) || !user.password;
    setIsInputEmpty(isEmpty);
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Đăng nhập</title>
        </Helmet>
      </HelmetProvider>

      <div className="signin-bg">
        <div className="signin">
          <NavLink to="/home">
            <img src={BKCsvg} alt="BKCare logo"></img>
          </NavLink>
          <div className="shape r-shape"></div>
          <div className="shape l-shape"></div>
          <div className="signin-wrapper zi">
            <div className="content-container">
              <div className="signin-box">
                <div className="c-6 md-12 signin-left">
                  <div className="signin-left-container">
                    <div className="signin-left-header">
                      <span>Chức năng tài khoản</span>
                    </div>
                    <div className="signin-left-body">
                      <span>
                        Bằng cách tạo một tài khoản, bạn sẽ có thể:
                        <br />
                      </span>
                      <ul className="signin-left-list">
                        <li>
                          Sử dụng dịch vụ chẩn đoán trực tuyến của chúng tôi mọi
                          lúc, mọi nơi.
                        </li>
                        <li>
                          Xem lại kết quả chẩn đoán của bạn một cách dễ dàng và
                          nhanh chóng.
                        </li>
                        <li>
                          Nhận thông tin cập nhật và hỗ trợ từ đội ngũ chuyên
                          gia của chúng tôi.
                        </li>
                      </ul>
                    </div>
                    <div className="signin-left-btn">
                      <NavLink to="/signup">
                        <button type="button">Đăng ký tài khoản</button>
                      </NavLink>
                    </div>
                  </div>
                </div>
                <div className="c-6 md-12 signin-right">
                  <div className="signin-right-container">
                    <div className="signin-right-header">
                      <span>Đăng nhập</span>
                    </div>
                    <div className="signin-right-form">
                      <form>
                        <label htmlFor="username">Tài khoản</label>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          required
                          onChange={(e) => updateEmailOrPhoneField(e)}
                          className={`${
                            !user.email && !user.phoneNumber && isInputEmpty
                              ? "empty"
                              : ""
                          }`}
                        ></input>
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          required
                          onChange={(e) => updatePasswordField(e)}
                          className={`${
                            !user.password && isInputEmpty ? "empty" : ""
                          }`}
                        ></input>
                      </form>
                    </div>
                    <div className="signin-right-btn">
                      <Toaster
                        toastOptions={{
                          className: "toast-noti",
                        }}
                        position="top-center"
                        richColors
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          checkInputEmpty();
                          if (!isInputEmpty) {
                            confirmSignin(e);
                          }
                        }}
                      >
                        Đăng nhập
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="signin-footer zi text-center">
            <span className="text-white">
              Copyright © 2024 BKC. All rights reserved.
            </span>
            <div>
              <NavLink className="text-decoration-none ">
                <span>Điều khoản</span>
              </NavLink>
              <NavLink className="text-decoration-none ">
                <span>Chính sách</span>
              </NavLink>
              <NavLink className="text-decoration-none ">
                <span>Trợ giúp</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
