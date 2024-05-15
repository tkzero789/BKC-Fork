import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import SymptomForm from "../../components/SymptomParts/SymptomForm";

export default function EditSymptom({ userRole, userInfos }) {
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
  // store original name to check duplicate if admin changes the name
  const [origName, setOrigName] = useState("");
  // store original categories and descriptions id to set readOnly if not admin edit mode
  const [origCats, setOrigCats] = useState([]);
  const [origDescs, setOrigDescs] = useState([]);
  const { symptomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://symptom-checker-with-mern-stack.onrender.com/symptom/${symptomId}`
      )
      .then((res) => {
        const dbsymptom = res.data;
        if (!dbsymptom) {
          const id = symptomId;
          window.alert(`Symptom with id ${id} not found`);
          navigate("/symptom-table");
          return;
        }
        setSymptom({
          ...dbsymptom,
          createInfos: {
            ...dbsymptom.createInfos,
            timeEdited: formattedTime,
          },
        });
        setOrigName(dbsymptom.name);
        setOrigCats(dbsymptom.categories.map((cat) => cat.id));
        setOrigDescs(
          dbsymptom.categories
            .flatMap((cat) => cat.descriptions)
            .map((desc) => desc.id)
        );
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [symptomId, navigate]);

  function confirmCancle(e) {
    if (window.confirm("Hủy và trở về trạng thái xem?")) {
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
      navigate(-1);
    }
  }

  async function confirmAdminEdit(e) {
    if (symptom.name === "") {
      window.alert("Chưa nhập tên bệnh");
      return;
    } else if (symptom.categories.length === 0) {
      window.alert("Triệu chứng chưa có mô tả nào");
      return;
    } else {
      for (const cat of symptom.categories) {
        for (const des of cat.descriptions) {
          if (des.descriptionDetail === "") {
            window.alert("Chưa nhập mô tả");
            return;
          }
        }
      }
    }
    e.preventDefault();
    try {
      if (origName !== symptom.name) {
        await axios
          .get(
            `https://symptom-checker-with-mern-stack.onrender.com/symptom/${symptom.name}`
          )
          .then((res) => {
            if (res.data) {
              throw new Error(
                "Triệu chứng cùng tên đã có sẵn trong cơ sở dữ liệu!"
              );
            }
          });
      }
      // Edit symptom
      await axios
        .post(
          `https://symptom-checker-with-mern-stack.onrender.com/symptom/update/${symptomId}`,
          { ...symptom, status: "Approved" },
          apiConfig
        )
        .then((res) => {
          console.log("Symptom edited", res.data);
        });
      // Create notification
      const resIds = await axios.get(
        `https://symptom-checker-with-mern-stack.onrender.com/user/doctor-ids`
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
          type: "Chỉnh sửa triệu chứng",
          detail: `Admin đã chỉnh sửa triệu chứng ${origName} (tên hiện tại là ${symptom.name})`,
          link: `/symptom/${symptomId}/view`,
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
      navigate(`/symptom/${symptomId}/view`);
    } catch (err) {
      const message = `Có lỗi xảy ra: ${err}`;
      window.alert(message);
    }
  }

  async function confirmEdit(e) {
    e.preventDefault();
    if (symptom.name === "") {
      window.alert("Chưa nhập tên bệnh");
      return;
    } else if (symptom.categories.length === 0) {
      window.alert("Triệu chứng chưa có mô tả nào");
      return;
    } else
      for (const cat of symptom.categories) {
        for (const des of cat.descriptions) {
          if (des.descriptionDetail === "") {
            window.alert("Chưa nhập mô tả");
            return;
          }
        }
      }
    try {
      // Edit symptom
      const editedSymp = {
        ...symptom,
        idTemp: uuidv4(),
        status: "Pending Update",
        doctorReqID: userInfos.doctorID,
      };
      await axios
        .post(
          `https://symptom-checker-with-mern-stack.onrender.com/symptom-temp/add`,
          editedSymp,
          apiConfig
        )
        .then((res) => {
          if (res.data && res.data.message === "Symptom already exists") {
            throw new Error(
              "Bạn đã chỉnh sửa triệu chứng này, vui lòng đợi admin xét duyệt!"
            );
          }
          console.log("Symptom edited", res.data);
        });
      // Create notification to admin
      const notif = {
        id: uuidv4(),
        fromInfos: {
          name: userInfos.fullName,
          role: userRole,
          medSpecialty: userInfos.medSpecialty,
          doctorID: userInfos.doctorID,
        },
        toDoctorID: ["ADMIN"],
        content: {
          type: "Chỉnh sửa triệu chứng",
          detail: `Bác sĩ trưởng Khoa ${userInfos.medSpecialty} đã chỉnh sửa triệu chứng ${symptom.name}`,
          link: `/symptom-temp/${editedSymp.idTemp}/approve`,
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
      // Set default and navigate
      setSymptom({
        id: "",
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
        createInfos: {
          doctorCreated: "",
          doctorId: "",
          timeCreated: "",
          timeEdited: "",
        },
        status: "",
        doctorReqID: "",
      });
      navigate(`/symptom-table`);
    } catch (err) {
      const message = `Có lỗi xảy ra: ${err}`;
      window.alert(message);
    }
  }

  return (
    <div>
      <h3 className="container text-center text-body pt-5">
        CHỈNH SỬA TRIỆU CHỨNG VÀ MÔ TẢ
      </h3>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
          <form>
            <div>
              <SymptomForm
                symptom={symptom}
                setSymptom={setSymptom}
                mode={userRole === "admin" ? "admin edit" : "doctor edit"}
                origCats={origCats}
                origDescs={origDescs}
              />
            </div>
            <div className="row pt-3 pb-3 justify-content-end">
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={(e) => {
                    confirmCancle(e);
                  }}
                >
                  Huỷ chỉnh sửa
                </button>
              </div>
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={
                    userRole === "admin"
                      ? (e) => {
                          confirmAdminEdit(e);
                        }
                      : (e) => {
                          confirmEdit(e);
                        }
                  }
                >
                  Xác nhận chỉnh sửa
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
