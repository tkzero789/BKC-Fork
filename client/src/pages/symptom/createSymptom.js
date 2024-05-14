import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import SymptomForm from "../../components/SymptomParts/SymptomForm";

export default function CreateSymptom({ userRole, userInfos }) {
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
    id: uuidv4(),
    idTemp: uuidv4(),
    name: "",
    position: "Đầu",
    categories: [
      {
        id: uuidv4(),
        categoryName: "Vị trí",
        descriptions: [
          {
            id: uuidv4(),
            descriptionDetail: "",
            descriptionImg: "",
          },
        ],
      },
    ],
    diseaseUsedIds: [],
    createInfos: {
      doctorCreated: userInfos.fullName,
      doctorID: userInfos.doctorID,
      timeCreated: formattedTime,
      timeEdited: null,
    },
    status: "Pending Create",
    doctorReqID: userInfos.doctorID,
  });

  const navigate = useNavigate();

  function confirmCancle(e) {
    if (window.confirm("Hủy tạo và trở về")) {
      setSymptom((prev) => ({
        ...prev,
        name: "",
        categories: [
          {
            index: uuidv4(),
            categoryName: "Vị trí",
            descriptions: [
              {
                index: uuidv4(),
                descriptionDetail: "",
                descriptionImg: null,
              },
            ],
          },
        ],
      }));
      navigate(-1);
    }
  }

  async function confirmCreate(e) {
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
    e.preventDefault();
    try {
      // Create new symptom
      await axios
        .post(
          "https://symptom-checker-with-mern-stack.onrender.com/symptom-temp/add",
          symptom,
          apiConfig
        )
        .then((res) => {
          if (res.data && res.data.message === "Symptom already exists") {
            throw new Error(
              "Triệu chứng cùng tên đang được người khác thêm vào!"
            );
          }
          console.log("Symptom created", res.data);
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
          type: "Tạo triệu chứng",
          detail: `Bác sĩ trưởng Khoa ${userInfos.medSpecialty} đã tạo triệu chứng ${symptom.name}`,
          link: `/symptom-temp/${symptom.idTemp}/approve`,
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
            index: uuidv4(),
            categoryName: "Vị trí",
            descriptions: [
              {
                index: uuidv4(),
                descriptionDetail: "",
                descriptionImg: null,
              },
            ],
          },
        ],
      }));
      navigate(`/symptom-table`);
    } catch (err) {
      const message = `Có lỗi xảy ra: ${err}`;
      window.alert(message);
    }
  }

  return (
    <div>
      <h3 className="container text-center text-body pt-5">
        TẠO TRIỆU CHỨNG VÀ MÔ TẢ
      </h3>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
          <form>
            <div>
              <SymptomForm
                symptom={symptom}
                setSymptom={setSymptom}
                mode="create"
                origCats={[]}
                origDescs={[]}
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
                  HỦY TẠO
                </button>
              </div>
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={(e) => {
                    confirmCreate(e);
                  }}
                >
                  XÁC NHẬN TẠO
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
