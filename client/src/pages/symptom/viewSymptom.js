import React, { useEffect, useState } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import axios from "axios";

import SymptomForm from "../../components/SymptomParts/SymptomForm";

export default function ViewSymptom({ userRole, userInfos }) {
  const userToken = localStorage.getItem("userToken");
  const apiConfig = {
    headers: { Authorization: `Bearer ${userToken}` },
  };
  const [symptom, setSymptom] = useState({
    id: "",
    name: "",
    categories: [
      {
        id: "",
        categoryName: "Vị trí",
        descriptions: [
          {
            id: "",
            descriptionDetail: "",
            descriptionImg: "",
          },
        ],
      },
    ],
    diseaseUsedIds: [],
    createInfos: {
      doctorCreated: "",
      doctorId: "",
      timeCreated: "",
      timeEdited: "",
    },
    status: "",
  });
  const { symptomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/symptom/${symptomId}`)
      .then((res) => {
        const dbsymptom = res.data;
        console.log(dbsymptom);
        if (!dbsymptom) {
          const id = symptomId;
          window.alert(`Symptom with id ${id} not found`);
          navigate("/symptom-table");
          return;
        }
        setSymptom(dbsymptom);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [symptomId, navigate]);

  function confirmDelete(e) {
    e.preventDefault();
    if (window.confirm("Xóa căn bệnh này trong bộ nhớ chính?")) {
      axios
        .delete(`http://localhost:5000/symptom/${symptomId}`, apiConfig)
        .catch((err) => {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
          return;
        });
      navigate(`/symptom-table`);
    }
  }

  return (
    <div>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
          <form>
            <div>
              <SymptomForm
                symptom={symptom}
                mode="view"
                origCats={[]}
                origDescs={[]}
              />
            </div>
            <div className="row pt-3 pb-3 justify-content-end">
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Quay lại
                </button>
              </div>
              {(userRole === "admin" || userRole === "head-doctor") && (
                <div className="col-3 d-grid gap-2">
                  <NavLink
                    className="btn btn-warning"
                    to={`/symptom/${symptomId}/edit`}
                  >
                    {userRole === "admin" ? "Chỉnh sửa" : "Thêm mô tả"}
                  </NavLink>
                </div>
              )}
              {userRole === "admin" && (
                <div className="col-3 d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={(e) => {
                      confirmDelete(e);
                    }}
                  >
                    Xoá
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
