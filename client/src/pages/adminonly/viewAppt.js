import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

export default function ViewAppt() {
  const [appt, setAppt] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    dob: "",
    gender: "",
    need: "",
    date: "",
    reason: "",
    createdAt: null,
    status: "",
  });
  const { apptId } = useParams();

  useEffect(() => {
    console.log(apptId);
    axios
      .get(
        `https://symptom-checker-with-mern-stack.onrender.com/appointment/${apptId}`
      )
      .then((res) => {
        setAppt(res.data);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [apptId]);

  function updateStatus(newStatus) {
    console.log(newStatus);
    axios
      .post(
        `https://symptom-checker-with-mern-stack.onrender.com/appointment/update/${apptId}`,
        {
          status: newStatus,
        }
      )
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
    setAppt({ ...appt, status: newStatus });
  }

  return (
    <div>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
          <form>
            <div>
              <div className="form-group row pb-5">
                <h4 className="text-blue-2 col-3">Họ tên</h4>
                <input
                  type="text"
                  className="form-control border-primary-subtle col"
                  name="fullName"
                  value={appt.fullName}
                  readOnly
                />
              </div>
              <div className="form-group row pb-5">
                <h4 className="text-blue-2 col-3">SĐT</h4>
                <input
                  type="text"
                  className="form-control border-primary-subtle col"
                  name="phoneNumber"
                  value={appt.phoneNumber}
                  readOnly
                />
              </div>
              <div className="form-group row pb-5">
                <h4 className="text-blue-2 col-3">Email</h4>
                <input
                  type="text"
                  className="form-control border-primary-subtle col"
                  name="email"
                  value={appt.email}
                  readOnly
                />
              </div>
              <div className="form-group row pb-5">
                <h4 className="text-blue-2 col-3">Ngày sinh</h4>
                <input
                  type="text"
                  className="form-control border-primary-subtle col"
                  name="dob"
                  value={appt.dob}
                  readOnly
                />
              </div>
              <div className="form-group row pb-5">
                <h4 className="text-blue-2 col-3">Giới tính</h4>
                <input
                  type="text"
                  className="form-control border-primary-subtle col"
                  name="gender"
                  value={appt.gender}
                  readOnly
                />
              </div>
              <div className="form-group row pb-5">
                <h4 className="text-blue-2 col-3">Nhu cầu khám</h4>
                <input
                  type="text"
                  className="form-control border-primary-subtle col"
                  name="need"
                  value={appt.need}
                  readOnly
                />
              </div>
              <div className="form-group row pb-5">
                <h4 className="text-blue-2 col-3">Ngày đặt lịch</h4>
                <input
                  type="text"
                  className="form-control border-primary-subtle col"
                  name="date"
                  value={appt.date}
                  readOnly
                />
              </div>
              <div className="form-group row pb-5">
                <h4 className="text-blue-2 col-3">Ngày khởi tạo</h4>
                <input
                  type="text"
                  className="form-control border-primary-subtle col"
                  name="createdAt"
                  value={appt.createdAt}
                  readOnly
                />
              </div>
              <div className="form-group row pb-5">
                <h4 className="text-blue-2 col-3">Mô tả vấn đề</h4>
                <textarea
                  className="form-control border-primary-subtle col"
                  rows={5}
                  name="reason"
                  value={appt.reason}
                  readOnly
                />
              </div>
            </div>
            <div className="row pt-3 pb-3 justify-content-end">
              <div className="col-3 d-grid gap-2">
                <NavLink
                  className="btn btn-outline-primary"
                  to={`/appointment-table`}
                >
                  QUAY LẠI
                </NavLink>
              </div>
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  disabled={appt.status === "Accepted"}
                  onClick={() => updateStatus("Accepted")}
                >
                  ĐƯỢC CHẤP NHẬN
                </button>
              </div>
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  disabled={appt.status === "Declined"}
                  onClick={() => updateStatus("Declined")}
                >
                  BỊ TỪ CHỐI
                </button>
              </div>
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  disabled={appt.status === "Spam"}
                  onClick={() => updateStatus("Spam")}
                >
                  ĐÁNH DẤU SPAM
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
