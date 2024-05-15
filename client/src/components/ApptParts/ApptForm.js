import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import { Toaster, toast } from "sonner";
import "react-calendar/dist/Calendar.css";
import "../../css/calendar.css";
import ApptIMG from "../../assets/appt/apptReq.jpg";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import ApptSuccessMsg from "./ApptSuccessMsg";

export default function ApptForm({
  appt,
  setAppt,
  showModal,
  setShowModal,
  editMode,
  closeModal,
  confirmSetAppt,
  otp,
  setOtp,
  sendOTP,
}) {
  // --- DOB: Start ---
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  const hasThirtyOneDays = (month, year) => {
    const months31Days = [0, 2, 4, 6, 7, 9, 11]; // Months with 31 days (0-based indexing)
    return months31Days.includes(month - 1); // Subtract 1 from the month to get the zero-based index
  };

  const months = [
    { value: "", label: "Tháng" },
    { value: "01", label: "1" },
    { value: "02", label: "2" },
    { value: "03", label: "3" },
    { value: "04", label: "4" },
    { value: "05", label: "5" },
    { value: "06", label: "6" },
    { value: "07", label: "7" },
    { value: "08", label: "8" },
    { value: "09", label: "9" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
  ];

  const years = Array.from({ length: 106 }, (_, i) => 1910 + i);

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    setMonth("");
    setYear("");
    setAppt((apptObject) => ({
      ...apptObject,
      dob: `${selectedDate}/${month}/${year}`,
    }));
  };

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    if (selectedMonth === "02") {
      setYear("");
    }
    const formattedMonth = selectedMonth.padStart(2, "0");
    setMonth(formattedMonth);
    setAppt((apptObject) => ({
      ...apptObject,
      dob: `${date}/${formattedMonth}/${year}`,
    }));
  };

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);
    setAppt((apptObject) => ({
      ...apptObject,
      dob: `${date}/${month}/${selectedYear}`,
    }));
  };
  // --- DOB: End ---

  // --- Calendar: Start ---
  const [calendarDate, setCalendarDate] = useState(null);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 75); // Set max date to 21 days from today
  const [showCalendar, setShowCalendar] = useState(false); // State for calendar visibility
  const calendarRef = useRef(null);

  // Format the selected date for display (optional)
  const formattedCalendarDate = calendarDate
    ? calendarDate.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "";

  const handleCalendarChange = (date) => {
    setCalendarDate(date);
    const formattedDate = date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    setAppt((apptObject) => ({
      ...apptObject,
      date: formattedDate,
    }));

    setShowCalendar(false); // Hide calendar after selection
  };

  // Toggle calendar visibility
  const handleCalendarClick = () => {
    setShowCalendar(!showCalendar);
  };

  // Hide calendar on outside click
  const handleCalendarClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCalendarClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleCalendarClickOutside);
    };
  }, []);
  // --- Calendar: End ---

  // --- Validate: Start ---

  const updateApptField = (e) => {
    setAppt({ ...appt, [e.target.name]: e.target.value });
  };

  const validateInput = () => {
    const inputFullName = document.getElementById("inputFullName");
    const inputEmail = document.getElementById("inputEmail");
    if (!inputFullName.checkValidity()) {
      toast.warning("Thiếu họ và tên");
    } else if (appt.phoneNumber === "") {
      toast.warning("Số điện thoại không hợp lệ");
    } else if (!inputEmail.checkValidity()) {
      toast.warning("Email không hợp lệ");
    } else if (!date) {
      toast.warning("Vui lòng chọn ngày");
    } else if (!month || month === "00") {
      toast.warning("Vui lòng chọn tháng");
    } else if (!year) {
      toast.warning("Vui lòng chọn năm");
    } else if (appt.gender === "" || appt.gender === "Chọn giới tính") {
      toast.warning("Vui lòng chọn giới tính");
    } else if (appt.need === "" || appt.need === "Chọn nhu cầu") {
      toast.warning("Vui lòng chọn Nhu cầu khám");
    } else {
      displayModal();
    }
  };
  // --- Validate: End ---

  // --- Modal: Start ---

  const displayModal = () => {
    setShowModal(!showModal);
  };
  const formatDateForModal = (date) => {
    return date.padStart(2, "0");
  };

  useEffect(() => {
    if (showModal) {
      window.scrollTo(0, 0); // Scroll to the top of the page
    }
  }, [showModal]);
  // --- Modal: End ---

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Đăng ký khám bệnh</title>
        </Helmet>
      </HelmetProvider>

      {/* Appointment Request Hero Image */}
      <div className="appt-img">
        <img src={ApptIMG} alt="Appointment" />
      </div>

      {/* Appointment Form */}
      <section className="appt w-100">
        <div className="content-container">
          <div className={`appt-wrapper ${showModal ? "hidden" : ""}`}>
            <div className="appt-title">
              <div className="appt-title-text">Đăng ký khám bệnh</div>
            </div>
            <form className="appt-form">
              <div className="c-4 md-12">
                {/* Name */}
                <div className="name-form">
                  <label htmlFor="name">
                    Họ và tên <span>*</span>
                  </label>
                  <input
                    className="appt-input"
                    type="text"
                    placeholder="Họ và tên"
                    id="inputFullName"
                    name="fullName"
                    value={appt.fullName}
                    readOnly={!editMode}
                    required
                    onChange={(e) => updateApptField(e)}
                  />
                </div>
                {/* Phone */}
                <div className="phone-form">
                  <label htmlFor="phone">
                    Số điện thoại <span>*</span>
                  </label>
                  <input
                    className="appt-input"
                    type="text"
                    placeholder="Số điện thoại"
                    id="inputPhoneNumber"
                    name="phoneNumber"
                    value={appt.phoneNumber}
                    pattern="[0-9]{10}"
                    readOnly={!editMode}
                    required
                    onChange={(e) => updateApptField(e)}
                  />
                </div>
                {/* Email */}
                <div className="email-form">
                  <label htmlFor="email">Email</label>
                  <input
                    className="appt-input"
                    type="email"
                    placeholder="Email (không bắt buộc)"
                    id="inputEmail"
                    name="email"
                    value={appt.email}
                    readOnly={!editMode}
                    onChange={(e) => updateApptField(e)}
                  />
                </div>
              </div>
              <div className="c-4 md-12">
                {/* DOB */}
                <div className="dob-form">
                  <label htmlFor="dob">
                    {" "}
                    Ngày sinh <span>*</span>{" "}
                  </label>
                  <div className="select-wrapper">
                    <select
                      id="dateSelect"
                      value={date}
                      readOnly={!editMode}
                      onChange={handleDateChange}
                    >
                      <option value="">Ngày</option>
                      {dates.map((date) => (
                        <option key={date} value={date}>
                          {date}
                        </option>
                      ))}
                    </select>
                    <select
                      id="monthSelect"
                      value={month}
                      readOnly={!editMode}
                      onChange={handleMonthChange}
                      disabled={!date}
                    >
                      {months.map(({ value, label }) => (
                        <option
                          key={value}
                          value={value}
                          disabled={
                            (value === "02" &&
                              date !== "" &&
                              parseInt(date, 10) > 29) ||
                            (date === "31" &&
                              !hasThirtyOneDays(
                                parseInt(value, 10),
                                parseInt(year, 10)
                              ))
                          }
                        >
                          {label}
                        </option>
                      ))}
                    </select>
                    <select
                      id="yearSelect"
                      value={year}
                      readOnly={!editMode}
                      onChange={handleYearChange}
                      disabled={!month}
                    >
                      <option value="">Năm</option>
                      {years.map((year) => (
                        <option
                          key={year}
                          value={year}
                          disabled={
                            month === "02" && date === "29" && !isLeapYear(year)
                          }
                        >
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Gender */}
                <div className="gender">
                  <label htmlFor="gender">
                    Giới tính <span>*</span>
                  </label>
                  <select
                    id="inputGender"
                    name="gender"
                    className="dropdown-field"
                    type="text"
                    value={appt.gender}
                    readOnly={!editMode}
                    required
                    onChange={(e) => updateApptField(e)}
                  >
                    <option value="Chọn giới tính">Chọn giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
                {/* Specialties */}
                <div className="need">
                  <label htmlFor="need">
                    Nhu cầu khám <span>*</span>
                  </label>
                  <select
                    id="inputNeed"
                    name="need"
                    className="dropdown-field"
                    type="text"
                    value={appt.need}
                    readOnly={!editMode}
                    required
                    onChange={(e) => updateApptField(e)}
                  >
                    <option value="Chọn nhu cầu">Chọn nhu cầu</option>
                    <option value="Khám chuyên khoa">Khám chuyên khoa</option>
                    <option value="Kiểm tra sức khoẻ tổng quát">
                      Kiểm tra sức khoẻ tổng quát
                    </option>
                    <option value="Xét nghiệm, chẩn đoán hình ảnh">
                      Xét nghiệm, chẩn đoán hình ảnh
                    </option>
                  </select>
                </div>
              </div>
              <div className="c-4 md-12">
                {/* Appt Date */}
                <div className="appt-date">
                  <label htmlFor="appt-date">Đặt lịch khám</label>
                  <div className="appt-date-container d-flex">
                    <input
                      className="appt-date-input"
                      type="text"
                      value={formattedCalendarDate}
                      readOnly // Make the input read-only
                      onClick={handleCalendarClick} // Toggle calendar on click
                      placeholder="Đặt lịch (không bắt buộc)"
                      id="inputDate"
                      name="date"
                      required
                    />
                    <div className="appt-date-icon">
                      <i className="bi bi-calendar"></i>
                    </div>
                  </div>

                  {showCalendar && (
                    <div ref={calendarRef} className="calendar-box">
                      <Calendar
                        onChange={handleCalendarChange}
                        locale="vi-VN"
                        minDate={new Date()}
                        maxDate={maxDate}
                        tileClassName={({ date, view }) => {
                          if (view === "month") {
                            const currentDate = new Date().setHours(0, 0, 0, 0);
                            const selectedDate = calendarDate?.getTime();
                            if (
                              date.getTime() === currentDate &&
                              (selectedDate === null ||
                                selectedDate !== currentDate)
                            ) {
                              return "react-calendar__tile--now";
                            } else if (date.getTime() === selectedDate) {
                              return "react-calendar__tile--selected";
                            } else if (
                              date.getTime() === currentDate &&
                              selectedDate === currentDate
                            ) {
                              return "react-calendar__tile--now-unselected";
                            }
                          }
                          return null;
                        }}
                      />
                    </div>
                  )}
                </div>
                {/* Symptom Description */}
                <div className="reason-textarea">
                  <label htmlFor="reason">Mô tả vấn đề sức khoẻ</label>
                  <textarea
                    placeholder="Nhập mô tả vấn đề sức khoẻ (không bắt buộc)"
                    id="inputReason"
                    name="reason"
                    value={appt.reason}
                    readOnly={!editMode}
                    onChange={(e) => updateApptField(e)}
                  />
                </div>
              </div>
            </form>
            {/* Submit Button */}
            <div className="text-center">
              <hr />
              <span>
                <b>Lưu ý:</b> Thời gian{" "}
                <b style={{ fontWeight: "var(--roboto-medium-weight)" }}>
                  đặt lịch khám
                </b>{" "}
                trên chỉ là thời gian dự kiến, tổng đài sẽ liên hệ xác nhận thời
                gian khám chính xác tới quý khách sau khi quý khách đặt hẹn.
              </span>
              <div className="appt-btn">
                <Toaster
                  toastOptions={{
                    className: "toast-noti",
                  }}
                  position="top-center"
                  richColors
                />
                <button onClick={validateInput}>Tiếp tục</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Display Appointment Confirmation */}
      {showModal && (
        <div className="appt w-100">
          <div className="content-container">
            <div className="appt-modal">
              <div className="appt-modal-wrapper">
                <div className="appt-modal-header">
                  Xác nhận thông tin đặt lịch khám
                </div>
                <div className="appt-modal-info">
                  <div className="appt-modal-data">
                    <span>Họ và tên:</span>
                    <p>{appt.fullName}</p>
                  </div>
                  <div className="appt-modal-data">
                    <span>Số điện thoại:</span>
                    <p>{appt.phoneNumber}</p>
                  </div>
                  <div
                    className={`appt-modal-data ${!appt.email ? "hidden" : ""}`}
                  >
                    {appt.email ? (
                      <>
                        <span>Email:</span>
                        <p>{appt.email}</p>
                      </>
                    ) : null}
                  </div>
                  <div className="appt-modal-data">
                    <span>Ngày sinh:</span>
                    <p>
                      {formatDateForModal(date)}/{month}/{year}
                    </p>
                  </div>
                  <div className="appt-modal-data">
                    <span>Giới tính:</span>
                    <p>{appt.gender}</p>
                  </div>
                  <div className="appt-modal-data">
                    <span>Nhu cầu khám:</span>
                    <p>{appt.need}</p>
                  </div>
                  <div
                    className={`appt-modal-data ${!appt.date ? "hidden" : ""}`}
                  >
                    {appt.date ? (
                      <>
                        <span>Ngày đặt khám:</span>
                        <p>{appt.date}</p>
                      </>
                    ) : null}
                  </div>
                  <div
                    className={`appt-modal-data ${
                      !appt.reason ? "hidden" : ""
                    }`}
                  >
                    {appt.reason ? (
                      <>
                        <span>Mô tả vấn đề sức khoẻ:</span>
                        <p>{appt.reason}</p>
                      </>
                    ) : null}
                  </div>
                  <div className={`appt-modal-data`}>
                    <>
                      <span>Nhập mã OTP gửi qua SĐT:</span>
                      <input
                        className="appt-input"
                        type="text"
                        placeholder="SMS OTP"
                        id="otp"
                        name="otp"
                        value={otp}
                        readOnly={!editMode}
                        required
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </>
                  </div>

                  <hr style={{ marginTop: "3rem" }} />
                  <div className="attention-text">
                    <p>
                      Bằng cách chọn <strong>“Đăng ký khám“</strong>, tôi xác
                      nhận đã đọc và đồng ý với các{" "}
                      <Link style={{ textDecoration: "none" }}>
                        Chính sách và Điều khoản sử dụng
                      </Link>{" "}
                      của dịch vụ.
                    </p>
                  </div>
                  <div className="appt-modal-btn">
                    <button type="button" onClick={closeModal}>
                      Quay lại
                    </button>
                    <button type="button" onClick={sendOTP}>
                      Nhận mã xác thực
                    </button>
                    <button
                      type="button"
                      disabled={otp.length !== 6}
                      onClick={confirmSetAppt}
                    >
                      Đăng ký khám
                    </button>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
