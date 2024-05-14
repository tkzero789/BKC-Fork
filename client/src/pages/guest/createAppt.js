import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import ApptForm from "../../components/ApptParts/ApptForm";
import Footer from "../../components/ForPages/Footer";

export default function CreateAppt() {
  const [appt, setAppt] = useState({
    id: uuidv4(),
    fullName: "",
    phoneNumber: "",
    email: "",
    dob: "",
    gender: "",
    need: "",
    date: "",
    reason: "",
    createdAt: null,
    status: "Pending",
  });
  const [otp, setOtp] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  async function sendOTP(e) {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/appointment/send-otp", {
        phoneNumber: "+84" + appt.phoneNumber.slice(-9),
      })
      .then((res) => {
        window.alert("Đã gửi mã xác thực, vui lòng kiểm tra tin nhắn");
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }

  async function confirmSetAppt(e) {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/appointment/verify-otp", {
        phoneNumber: "+84" + appt.phoneNumber.slice(-9),
        otp: otp,
      })
      .then((res) => {
        if (res.data && res.data.message === "OTP expired") {
          window.alert("Mã xác thực đã hết hiệu lực, vui lòng nhận mã khác");
          return;
        } else if (res.data && res.data.message === "Incorrect OTP") {
          window.alert("Mã xác thực không chính xác, vui lòng nhập lại");
          return;
        }
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
    const updatedAppt = {
      ...appt,
      createdAt: new Date().toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    };

    await axios
      .post("http://localhost:5000/appointment/add", updatedAppt)
      .then((res) => {
        console.log("Appointment set", res.data);
        setAppt({
          fullName: "",
          phoneNumber: "",
          email: "",
          dob: "",
          gender: "",
          need: "",
          date: "",
          reason: "",
          createdAt: null,
        });
        navigate("/");
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="appt-req-body">
      <ApptForm
        appt={appt}
        setAppt={setAppt}
        showModal={showModal}
        setShowModal={setShowModal}
        editMode={true}
        closeModal={closeModal}
        confirmSetAppt={confirmSetAppt}
        otp={otp}
        setOtp={setOtp}
        sendOTP={sendOTP}
      />
      <Footer />
    </div>
  );
}
