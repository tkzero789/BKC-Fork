import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import DiseaseAgeGen from "../../components/DiseaseParts/DiseaseAgeGen";
import DiseaseSymps from "../../components/DiseaseParts/DiseaseSymps";
import DiseaseDescs from "../../components/DiseaseParts/DiseaseDescs";
import DiseaseName from "../../components/DiseaseParts/DiseaseName";

export default function EditDisease({ userRole, userInfos }) {
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
  const [chosenSymps, setChosenSymps] = useState([]);
  // store original name to check duplicate if changing the name
  const [origName, setOrigName] = useState("");
  // set form steps
  const [step, setStep] = useState(1);
  const [finalStep, setFinalStep] = useState(3);
  const { diseaseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://symptom-checker-with-mern-stack.onrender.com/disease/${diseaseId}`
      )
      .then((res) => {
        const dbDisease = res.data;
        if (!dbDisease) {
          window.alert(`Không tìm thấy căn bệnh với id ${diseaseId}`);
          navigate("/disease-table");
          return;
        }
        if (dbDisease.createInfos.doctorID !== userInfos.doctorID) {
          window.alert("Chỉ có bác sĩ tạo ra mới được chỉnh sửa dữ liệu");
          navigate("/disease-table");
          return;
        }
        setDisease({
          ...dbDisease,
          idTemp: uuidv4(),
          createInfos: {
            ...dbDisease.createInfos,
            timeEdited: formattedTime,
          },
          status: "Pending Update",
          doctorReqID: userInfos.doctorID,
        });
        setOrigName(dbDisease.name);
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

  useEffect(() => {
    setChosenSymps(
      dbSymps.filter((symptom) => disease.symptomIds.includes(symptom.id))
    );
  }, [dbSymps, disease.symptomIds]);

  useEffect(() => {
    setFinalStep(3 + chosenSymps.length);
  }, [chosenSymps]);

  // display components step by step
  function StepDisplay() {
    if (step === 1) {
      return <DiseaseAgeGen disease={disease} setDisease={setDisease} />;
    } else if (step === 2) {
      return (
        <DiseaseSymps
          disease={disease}
          setDisease={setDisease}
          dbSymps={dbSymps}
          mode="edit"
        />
      );
    } else if (step > 2 && step < finalStep) {
      return (
        <DiseaseDescs
          disease={disease}
          setDisease={setDisease}
          chosenSymp={chosenSymps[step - 3]}
          mode="edit"
        />
      );
    } else {
      return (
        <DiseaseName
          disease={disease}
          setDisease={setDisease}
          dbSymps={dbSymps}
          mode="edit"
        />
      );
    }
  }

  // handle next and prev button
  const handlePrev = () => {
    setStep((step) => step - 1);
  };
  const handleNext = () => {
    setStep((step) => step + 1);
  };

  function checkStep() {
    if (step === 1) {
      if (disease.ageRanges.length === 0) {
        window.alert("Vui lòng chọn độ tuổi");
        return;
      }
      if (disease.genders.length === 0) {
        window.alert("Vui lòng chọn giới tính");
        return;
      }
    } else if (step === 2) {
      if (disease.symptomIds.length === 0) {
        window.alert("Vui lòng chọn ít nhất 1 triệu chứng");
        return;
      }
    } else if (step > 2 && step < finalStep) {
      const symptomId = disease.symptomIds[step - 3];
      if (!disease.descIds.some((desc) => desc.symptomId === symptomId)) {
        window.alert("Vui không chọn mô tả cho triệu chứng");
        return;
      }
    }
    handleNext();
  }

  function confirmCancle(e) {
    if (window.confirm("Hủy và trở về trạng thái xem?")) {
      setDisease((prev) => ({
        ...prev,
        name: "",
        ageRanges: [],
        genders: [],
        symptomIds: [],
        descIds: [],
      }));
      navigate(-1);
    }
  }

  async function confirmEdit(e) {
    e.preventDefault();
    if (disease.name === "") {
      window.alert("Chưa nhập tên bệnh");
      return;
    } else if (disease.ageRanges.length === 0) {
      window.alert("Chưa chọn độ tuôi");
      return;
    } else if (disease.genders.length === 0) {
      window.alert("Chưa chọn giới tính");
      return;
    } else if (disease.symptomIds.length === 0) {
      window.alert("Chưa có triệu chứng");
      return;
    } else if (disease.descIds.length === 0) {
      window.alert("Chưa có mô tả cho triệu chứng");
      return;
    }
    try {
      if (origName !== disease.name) {
        await axios
          .get(
            `https://symptom-checker-with-mern-stack.onrender.com/disease/${disease.name}`
          )
          .then((res) => {
            if (res.data) {
              throw new Error(
                "Căn bệnh cùng tên đã có sẵn trong cơ sở dữ liệu!"
              );
            }
          });
      }
      // Edit disease
      await axios
        .post(
          `https://symptom-checker-with-mern-stack.onrender.com/disease-temp/add`,
          disease,
          apiConfig
        )
        .then((res) => {
          if (res.data && res.data.message === "Disease already exists") {
            throw new Error(
              "Bạn đã chỉnh sửa căn bệnh này, vui lòng đợi admin xét duyệt!"
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
          type: "Chỉnh sửa căn bệnh",
          detail: `Bác sĩ trưởng Khoa ${userInfos.medSpecialty} đã chỉnh sửa căn bệnh ${disease.name}`,
          link: `/disease-temp/${disease.idTemp}/approve`,
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
      setDisease((prev) => ({
        ...prev,
        name: "",
        ageRanges: [],
        genders: [],
        symptomIds: [],
        descIds: [],
      }));
      navigate(`/disease-table`);
    } catch (err) {
      const message = `Có lỗi xảy ra: ${err}`;
      window.alert(message);
    }
  }

  return (
    <div>
      <h3 className="container text-center text-body pt-5">
        CHỈNH SỬA CĂN BỆNH
      </h3>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
          <form>
            <div>{StepDisplay()}</div>
            <div className="row pt-3 pb-3 justify-content-end">
              <div className="col-3 d-grid gap-2">
                {step === 1 ? (
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={(e) => confirmCancle(e)}
                  >
                    HỦY CHỈNH SỬA
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={handlePrev}
                  >
                    QUAY LẠI
                  </button>
                )}
              </div>
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={(e) => {
                    if (step === finalStep) {
                      confirmEdit(e);
                    } else {
                      checkStep(step);
                    }
                  }}
                >
                  {step === finalStep ? "XÁC NHẬN CHỈNH SỬA" : "TIẾP THEO"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
