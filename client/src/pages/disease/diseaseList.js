import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import "../../css/disease.css";

export default function DiseaseList({ userInfos }) {
  const [diseases, setDiseases] = useState([]);

  useEffect(() => {
    axios
      .get(`https://symptom-checker-with-mern-stack.onrender.com/disease/`)
      .then((res) => {
        const diseases = res.data;
        setDiseases(diseases);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [diseases.length]);

  // delete disease
  async function onDelete(id) {
    if (window.confirm("Bạn có chắc muốn xóa căn bệnh này?")) {
      axios
        .delete(
          `https://symptom-checker-with-mern-stack.onrender.com/disease/${id}`
        )
        .then(() => {
          const newDiseases = diseases.filter((disease) => disease.id !== id);
          setDiseases(newDiseases);
        })
        .catch((err) => {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        });
    }
  }

  // display each disease
  const Disease = ({ disease, onDelete }) => (
    <div className="disease-item d-flex py-2">
      <div className="disease-box border border-secondary-subtle shadow-sm rounded">
        <Link
          className="text-body text-decoration-none d-block py-2 px-2"
          to={`/disease/${disease.id}/view`}
        >
          {disease.name}
        </Link>
      </div>
      {userInfos.doctorID === disease.createInfos.doctorID && (
        <div className="ms-auto">
          <Link
            to={`/disease/${disease.id}/edit`}
            className="rounded bg-success bg-gradient py-2 px-2"
          >
            <i className="bi bi-pencil text-light text-opacity-75"></i>
          </Link>
          <Link className="rounded bg-danger bg-gradient py-2 px-2 ms-2">
            <i
              className="bi bi-trash-fill text-light text-opacity-75"
              onClick={() => {
                onDelete(disease.id);
              }}
            ></i>
          </Link>
        </div>
      )}
    </div>
  );

  // display disease list
  function diseaseList() {
    return diseases.map((disease) => {
      return (
        <Disease
          disease={disease}
          onDelete={() => onDelete(disease.id)}
          key={disease.id}
        />
      );
    });
  }

  return (
    <div>
      <DoctorNav />
      <AdminNavBar />
      <h4 className="container text-center text-body pt-5">
        DANH SÁCH BỆNH ĐÃ TẠO
      </h4>
      <div className="content-container p-5">
        <div className="border border-secondary border-opacity-25 rounded shadow p-5">
          <form>
            <h4 className="card-title text-body">Những bệnh đã có:</h4>
            <div className="px-3 pt-2 pb-2">{diseaseList()}</div>
            <div className="d-flex justify-content-evenly row pt-3">
              <div className="col-3 d-grid gap-2">
                <NavLink
                  className="btn btn-outline-primary bg-gradient"
                  to="/disease/create"
                >
                  TẠO CĂN BỆNH MỚI
                </NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
