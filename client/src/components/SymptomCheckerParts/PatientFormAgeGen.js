import React from "react";

export default function PatientFormAgeGen({ patientForm, setPatientForm }) {
  function updateField(event) {
    setPatientForm({
      ...patientForm,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div>
      <div className="text-center">
        <h4 className="text-blue-1 fw-med">
          Vui lòng cung cấp thông tin của bạn
        </h4>
      </div>
      <div className="steps-info-section">
        <div className="form-group pb-5">
          <h5 className="fw-med text-blue-2">Tuổi tác</h5>
          <div className="select-age">
            <input
              type="number"
              className="form-control fw-reg"
              name="age"
              placeholder="Nhập độ tuổi"
              value={patientForm.age}
              onChange={(e) => updateField(e)}
            />
          </div>
        </div>
        <div className="form-group pb-5">
          <h5 className="fw-med text-blue-2">Giới tính</h5>
          <div className="select-gender">
            <select
              name="gender"
              value={patientForm.gender}
              className="form-select fw-reg"
              onChange={(e) => updateField(e)}
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
