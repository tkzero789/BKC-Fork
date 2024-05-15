import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import DiseaseName from "../../components/DiseaseParts/DiseaseName";

export default function ApproveDisease({ userRole, userInfos }) {
  const userToken = localStorage.getItem("userToken");
  const apiConfig = {
    headers: { Authorization: `Bearer ${userToken}` },
  };
  const now = new Date();
  const formattedTime = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")} ${String(now.getDate()).padStart(2, "0")}/${String(
    now.getMonth() + 1
  ).padStart(2, "0")}/${now.getFullYear()}`;
  const [disease, setDisease] = useState({
    id: "",
    idTemp: "",
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
  const { diseaseIdTemp } = useParams();
  const navigate = useNavigate();

  // get symptoms from db
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

  // get disease from DB temp by diseaseIdTemp
  useEffect(() => {
    axios
      .get(
        `https://symptom-checker-with-mern-stack.onrender.com/disease-temp/${diseaseIdTemp}`,
        apiConfig
      )
      .then((res) => {
        const dbDisease = res.data;
        if (!dbDisease) {
          window.alert(
            `Không tìm thấy căn bệnh trong bộ nhớ tạm, có thể bạn đã duyệt/xóa căn bệnh này`
          );
          navigate("/disease-table");
          return;
        }
        setDisease(dbDisease);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [diseaseIdTemp, navigate]);

  async function confirmApprove(e) {
    e.preventDefault();
    if (disease.status === "Pending Create") {
      try {
        // Create disease
        await axios
          .post(
            `https://symptom-checker-with-mern-stack.onrender.com/disease/add/`,
            { ...disease, status: "Approved" },
            apiConfig
          )
          .then((res) => {
            if (res.data && res.data.message === "Disease already exists") {
              throw new Error("Căn bệnh cùng tên đã có trong cơ sở dữ liệu!");
            }
            console.log("Disease created", res.data);
          });
        // Create new notification
        const resIds = await axios.post(
          `https://symptom-checker-with-mern-stack.onrender.com/user/medspec-doctor-ids`,
          { medSpecialty: disease.medSpecialty }
        );
        const doctorIds = resIds.data;
        const notif = {
          id: uuidv4(),
          fromInfos: {
            name: userInfos.fullName,
            role: userRole,
            medSpecialty: userInfos.medSpecialty,
            doctorID: userInfos.doctorID,
          },
          toDoctorID: doctorIds,
          content: {
            type: "Duyệt tạo căn bệnh",
            detail: `Admin đã duyệt căn bệnh ${disease.name} do bác sĩ ${disease.createInfos.doctorCreated} tạo`,
            link: `/disease/${disease.id}/view`,
          },
          timeSent: formattedTime,
          status: "Chưa xem",
        };
        await axios
          .post(
            "https://symptom-checker-with-mern-stack.onrender.com/notification/add",
            notif,
            apiConfig
          )
          .then((res) => {
            console.log("Notification created", res.data);
          });
        confirmDelete(e, true);
      } catch (err) {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      }
    } else if (disease.status === "Pending Update") {
      try {
        // Update disease
        await axios.post(
          `https://symptom-checker-with-mern-stack.onrender.com/disease/update/${disease.id}`,
          { ...disease, status: "Approved" },
          apiConfig
        );
        // Create notification
        const resIds = await axios.get(
          `https://symptom-checker-with-mern-stack.onrender.com/user/medspec-doctor-ids`,
          { medSpecialty: disease.medSpecialty }
        );
        const doctorIds = resIds.data;
        const notif = {
          id: uuidv4(),
          fromInfos: {
            name: userInfos.fullName,
            role: userRole,
            medSpecialty: userInfos.medSpecialty,
            doctorID: userInfos.doctorID,
          },
          toDoctorID: doctorIds,
          content: {
            type: "Duyệt chỉnh sửa căn bệnh",
            detail: `Admin đã duyệt chỉnh sửa căn bệnh ${disease.name}`,
            link: `/disease/${disease.id}/view`,
          },
          timeSent: formattedTime,
          status: "Chưa xem",
        };
        await axios
          .post(
            "https://symptom-checker-with-mern-stack.onrender.com/notification/add",
            notif,
            apiConfig
          )
          .then((res) => {
            console.log("Notification created", res.data);
          });
        confirmDelete(e, true);
      } catch (err) {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      }
    }
  }

  async function confirmDelete(e, approved) {
    e.preventDefault();
    console.log(approved);
    if (approved) {
      try {
        axios.delete(
          `https://symptom-checker-with-mern-stack.onrender.com/disease-temp/${diseaseIdTemp}`,
          apiConfig
        );
      } catch (err) {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      }
    } else {
      if (window.confirm("Xóa căn bệnh này trong bộ nhớ tạm thời?")) {
        try {
          axios.delete(
            `https://symptom-checker-with-mern-stack.onrender.com/disease-temp/${diseaseIdTemp}`,
            apiConfig
          );
          const notif = {
            id: uuidv4(),
            fromInfos: {
              name: userInfos.fullName,
              role: userRole,
              medSpecialty: userInfos.medSpecialty,
              doctorID: userInfos.doctorID,
            },
            toDoctorID: [disease.doctorReqID],
            content: {
              type:
                disease.status === "Pending Create"
                  ? "Không duyệt tạo căn bệnh"
                  : "Không duyệt chỉnh sửa căn bệnh",
              detail:
                disease.status === "Pending Create"
                  ? `Admin không duyệt tạo căn bệnh ${disease.name}`
                  : `Admin không duyệt chỉnh sửa căn bệnh ${disease.name}`,
              link: "",
            },
            timeSent: formattedTime,
            status: "Chưa xem",
          };
          await axios
            .post(
              "https://symptom-checker-with-mern-stack.onrender.com/notification/add",
              notif,
              apiConfig
            )
            .then((res) => {
              console.log("Notification created", res.data);
            });
        } catch (err) {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        }
      } else return;
    }

    // Set default and navigate
    setDisease((prev) => ({
      ...prev,
      name: "",
      ageRanges: [],
      genders: [],
      symptomIds: [],
      descIds: [],
    }));
    navigate(`/disease-table`);
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
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Quay lại
                </button>
              </div>
              {userRole === "admin" && (
                <div className="col-3 d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={(e) => {
                      confirmApprove(e);
                    }}
                  >
                    Xác nhận duyệt
                  </button>
                </div>
              )}
              {(userRole === "admin" ||
                userInfos.doctorID === disease.createInfos.doctorID) && (
                <div className="col-3 d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={(e) => {
                      confirmDelete(e, false);
                    }}
                  >
                    Xác nhận xoá
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
