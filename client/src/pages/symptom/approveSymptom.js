import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import SymptomForm from "../../components/SymptomParts/SymptomForm";

export default function ApproveSymptom({ userRole, userInfos }) {
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

  const [symptom, setSymptom] = useState({
    id: "",
    idTemp: "",
    name: "",
    position: "",
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
  const { symptomIdTemp } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/symptom-temp/${symptomIdTemp}/`, apiConfig)
      .then((res) => {
        const dbsymptom = res.data;
        if (!dbsymptom) {
          window.alert(
            `Không tìm thấy triệu chứng trong bộ nhớ tạm, có thể bạn đã duyệt/xóa triệu chứng này`
          );
          navigate("/symptom-table");
          return;
        }
        setSymptom(dbsymptom);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [symptomIdTemp, navigate]);

  async function confirmApprove(e) {
    e.preventDefault();
    if (symptom.status === "Pending Create") {
      try {
        // Create symptom
        await axios
          .post(
            `http://localhost:5000/symptom/add/`,
            { ...symptom, status: "Approved" },
            apiConfig
          )
          .then((res) => {
            if (res.data && res.data.message === "Symptom already exists") {
              throw new Error("Căn bệnh cùng tên đã có trong cơ sở dữ liệu!");
            }
            console.log("Symptom created", res.data);
          });
        // Create new notification
        const resIds = await axios.get(`http://localhost:5000/user/doctor-ids`);
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
            type: "Duyệt tạo triệu chứng",
            detail: `Admin đã duyệt triệu chứng ${symptom.name} do bác sĩ ${symptom.createInfos.doctorCreated} tạo`,
            link: `/symptom/${symptom.id}/view`,
          },
          timeSent: formattedTime,
          status: "Chưa xem",
        };
        await axios
          .post("http://localhost:5000/notification/add", notif, apiConfig)
          .then((res) => {
            console.log("Notification created", res.data);
          });
        confirmDelete(e, true);
      } catch (err) {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      }
    } else if (symptom.status === "Pending Update") {
      try {
        // Update symptom
        await axios.post(
          `http://localhost:5000/symptom/update/${symptom.id}`,
          { ...symptom, status: "Approved" },
          apiConfig
        );
        // Create notification
        const resIds = await axios.get(`http://localhost:5000/user/doctor-ids`);
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
            type: "Duyệt chỉnh sửa triệu chứng",
            detail: `Admin đã duyệt chỉnh sửa triệu chứng ${symptom.name}`,
            link: `/symptom/${symptom.id}/view`,
          },
          timeSent: formattedTime,
          status: "Chưa xem",
        };
        await axios
          .post("http://localhost:5000/notification/add", notif, apiConfig)
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
    if (approved) {
      try {
        axios.delete(
          `http://localhost:5000/symptom-temp/${symptomIdTemp}`,
          apiConfig
        );
      } catch (err) {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      }
    } else {
      if (window.confirm("Xóa triệu chứng này trong bộ nhớ tạm thời?")) {
        try {
          axios.delete(
            `http://localhost:5000/symptom-temp/${symptomIdTemp}`,
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
            toDoctorID: [symptom.doctorReqID],
            content: {
              type:
                symptom.status === "Pending Create"
                  ? "Không duyệt tạo triệu chứng"
                  : "Không duyệt chỉnh sửa triệu chứng",
              detail:
                symptom.status === "Pending Create"
                  ? `Admin không duyệt tạo triệu chứng ${symptom.name}`
                  : `Admin không duyệt chỉnh sửa triệu chứng ${symptom.name}`,
              link: "",
            },
            timeSent: formattedTime,
            status: "Chưa xem",
          };
          await axios
            .post("http://localhost:5000/notification/add", notif, apiConfig)
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
    setSymptom((prev) => ({
      ...prev,
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
    }));

    navigate(`/symptom-table`);
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
                  className="btn btn-outline-primary"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  QUAY LẠI
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
                    XÁC NHẬN DUYỆT
                  </button>
                </div>
              )}
              {(userRole === "admin" ||
                userInfos.doctorID === symptom.createInfos.doctorID) && (
                <div className="col-3 d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={(e) => {
                      confirmDelete(e, false);
                    }}
                  >
                    XÁC NHẬN XÓA
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
