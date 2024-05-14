import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import axios from "axios";

import DiseaseName from "../../components/DiseaseParts/DiseaseName";

export default function ViewDisease({ userRole, userInfos }) {
  const [disease, setDisease] = useState({
    id: "",
    name: "",
    ageRanges: [],
    genders: [],
    symptomIds: [],
    descIds: [],
    medSpecialty: "",
    relatedArticles: [],
    createInfos: {
      doctorCreated: "",
      doctorId: "",
      timeCreated: "",
      timeEdited: "",
    },
    status: "",
  });
  const [dbSymps, setDbSymps] = useState([]);
  const { diseaseId } = useParams();
  const navigate = useNavigate();

  // get disease from DB by diseaseId
  useEffect(() => {
    axios
      .get(
        `https://symptom-checker-with-mern-stack.onrender.com/disease/${diseaseId}`
      )
      .then((res) => {
        const dbdisease = res.data;
        console.log(dbdisease);
        if (!dbdisease) {
          window.alert(`Không tìm thấy căn bệnh với id ${diseaseId}`);
          navigate("/disease-table");
          return;
        }
        setDisease(dbdisease);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [diseaseId, navigate]);

  // get symptoms from DB
  useEffect(() => {
    axios
      .get("https://symptom-checker-with-mern-stack.onrender.com/symptom")
      .then((res) => {
        setDbSymps(res.data);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, []);

  // delete disease
  function confirmDelete(e) {
    e.preventDefault();
    if (window.confirm("Bạn có chắc muốn xóa căn bệnh này?")) {
      axios
        .delete(
          `https://symptom-checker-with-mern-stack.onrender.com/disease/${diseaseId}`
        )
        .catch((err) => {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        });

      navigate("/disease-table");
    }
  }

  return (
    <div>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
          <form>
            <div>
              {
                <DiseaseName
                  disease={disease}
                  setDisease={setDisease}
                  dbSymps={dbSymps}
                  mode="view"
                />
              }
            </div>
            <div className="row pt-3 pb-3 justify-content-end">
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  QUAY LẠI
                </button>
              </div>
              <div className="col-3 d-grid gap-2">
                <NavLink
                  className="btn btn-outline-primary"
                  to={`/disease/${diseaseId}/article-table`}
                >
                  DANH SÁCH BÀI VIẾT
                </NavLink>
              </div>
              {userInfos.doctorID === disease.createInfos.doctorID && (
                <div className="col-3 d-grid gap-2">
                  <NavLink
                    className="btn btn-outline-primary"
                    to={`/disease/${diseaseId}/edit`}
                  >
                    CHỈNH SỬA
                  </NavLink>
                </div>
              )}
              {(userInfos.doctorID === disease.createInfos.doctorID ||
                userRole === "admin") && (
                <div className="col-3 d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => confirmDelete(diseaseId)}
                  >
                    XÓA CĂN BỆNH
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
