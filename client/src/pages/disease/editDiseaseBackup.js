import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";

import DiseaseAgeGen from "../../components/DiseaseParts/DiseaseAgeGen";
import DiseaseSymptoms from "../../components/DiseaseParts/DiseaseSymptoms";
import DiseaseSympDes from "../../components/DiseaseParts/DiseaseSympDes";
import DiseaseNewSympDes from "../../components/DiseaseParts/DiseaseNewSympDes";
import DiseaseName from "../../components/DiseaseParts/DiseaseName";

export default function EditDisease({ userInfos }) {
  const now = new Date();
  const formattedDate = `${String(now.getDate()).padStart(2, "0")}/${String(
    now.getMonth() + 1
  ).padStart(2, "0")}/${now.getFullYear()}`;

  const [disease, setDisease] = useState({
    id: "",
    name: "",
    ageRanges: [],
    genders: [],
    symptoms: [],
    medSpecialty: "",
    relatedArticles: [],
    createInfos: {
      doctorCreated: "",
      doctorId: "",
      timeCreated: "",
      timeEdited: "",
    },
  });
  // dbSymps are Symptoms in DB
  const [dbSymps, setDbSymps] = useState([]);
  // chosenSymps, chosenCats, chosenDes are Symptoms, Categories and Descriptions existing in DB
  // AND have been chosen in the process, only contain id
  const [chosenSymps, setChosenSymps] = useState([]);
  const [chosenCats, setChosenCats] = useState([]);
  const [chosenDes, setChosenDes] = useState([]);
  const { diseaseId } = useParams();
  const navigate = useNavigate();
  // set form steps, form include 5 steps
  const [step, setStep] = useState(1);

  // get disease from DB by diseaseId and set chosenSymps, chosenCats, chosenDes
  // this will set the state of chosen ones checked before the process starts
  useEffect(() => {
    axios
      .get(
        `https://symptom-checker-with-mern-stack.onrender.com/disease/${diseaseId}`
      )
      .then((res) => {
        console.log(res.data);
        const dbdisease = res.data;
        if (!dbdisease) {
          window.alert(`Không tìm thấy căn bệnh với id ${diseaseId}`);
          navigate("/disease-table");
          return;
        }
        if (dbdisease.createInfos.doctorID !== userInfos.doctorID) {
          window.alert("Chỉ có bác sĩ tạo ra mới được chỉnh sửa dữ liệu");
          navigate("/disease-table");
          return;
        }
        setDisease({
          ...dbdisease,
          createInfos: {
            ...dbdisease.createInfos,
            timeEdited: formattedDate,
          },
        });
        setChosenSymps(dbdisease.symptoms.map((symptom) => symptom.id));
        const catIds = dbdisease.symptoms
          .flatMap((symptom) => symptom.categories)
          .map((cat) => cat.id);
        setChosenCats(catIds);
        const desIds = dbdisease.symptoms
          .flatMap((symptom) => symptom.categories)
          .flatMap((cat) => cat.descriptions)
          .map((des) => des.id);
        setChosenDes(desIds);
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
        return;
      });
  }, []);

  // display components step by step
  const StepDisplay = () => {
    console.log(chosenCats);
    if (step === 1) {
      return <DiseaseAgeGen disease={disease} setDisease={setDisease} />;
    } else if (step === 2) {
      return (
        <DiseaseSymptoms
          disease={disease}
          setDisease={setDisease}
          dbSymps={dbSymps}
          chosenSymps={chosenSymps}
          setChosenSymps={setChosenSymps}
          chosenCats={chosenCats}
          setChosenCats={setChosenCats}
          chosenDes={chosenDes}
          setChosenDes={setChosenDes}
        />
      );
    } else if (step === 3) {
      return (
        <DiseaseSympDes
          disease={disease}
          setDisease={setDisease}
          dbSymps={dbSymps}
          chosenSymps={chosenSymps}
          chosenCats={chosenCats}
          setChosenCats={setChosenCats}
          chosenDes={chosenDes}
          setChosenDes={setChosenDes}
        />
      );
    } else if (step === 4) {
      return (
        <DiseaseNewSympDes
          disease={disease}
          setDisease={setDisease}
          chosenSymps={chosenSymps}
          chosenCats={chosenCats}
          chosenDes={chosenDes}
        />
      );
    } else {
      return <DiseaseName disease={disease} setDisease={setDisease} />;
    }
  };

  // handle next and prev button
  const handlePrev = () => {
    setStep((step) => step - 1);
  };
  const handleNext = () => {
    setStep((step) => step + 1);
  };

  // at step 4 (add new symptom description), before go to next step, check if there is any
  // new symptom or category or description has same name with existing ones in DB
  const checkNewSympDes = () => {
    if (disease.symptoms.length > 0) {
      const dbSympNames = dbSymps.map((dbSymp) => dbSymp.name);
      for (const symp of disease.symptoms) {
        if (symp.name === "") {
          window.alert(`Vui lòng điền triệu chứng`);
          return;
        } else if (!chosenSymps.includes(symp.id)) {
          if (dbSympNames.includes(symp.name)) {
            window.alert(`Triệu chứng ${symp.name} đã tồn tại!`);
            return;
          } else continue;
        }
        if (symp.categories.length > 0) {
          let dbCats = dbSymps.filter((dbSymp) => dbSymp.name === symp.name)[0]
            .categories;
          console.log(dbCats);
          let dbCatNames = dbCats.map((dbCat) => dbCat.categoryName);
          for (const cat of symp.categories) {
            if (!chosenCats.includes(cat.id)) {
              if (dbCatNames.includes(cat.categoryName)) {
                window.alert(
                  `Thuộc tính ${cat.categoryName} của triệu chứng ${symp.name} đã tồn tại!`
                );
                return;
              } else continue;
            }
            if (cat.descriptions.length > 0) {
              console.log(cat.categoryName);
              console.log(
                dbCats.filter(
                  (dbCat) => dbCat.categoryName === cat.categoryName
                )
              );
              let dbDes = dbCats.filter(
                (dbCat) => dbCat.categoryName === cat.categoryName
              )[0].descriptions;
              let dbDesDetail = dbDes.map((dbDes) => dbDes.descriptionDetail);
              for (const des of cat.descriptions) {
                if (symp.name === "") {
                  window.alert(`Vui lòng điền mô tả`);
                  return;
                } else if (!chosenDes.includes(des.id)) {
                  if (dbDesDetail.includes(des.descriptionDetail)) {
                    window.alert(
                      `Mô tả ${des.descriptionDetail} của thuộc tính ${cat.categoryName} của triệu chứng ${symp.name} đã tồn tại!`
                    );
                    return;
                  } else continue;
                }
              }
            }
          }
        }
      }
      handleNext();
    }
  };

  // handle edit disease
  async function confirmEdit(e) {
    e.preventDefault();
    // validate each field
    if (!disease.name) {
      window.alert("Chưa nhập tên bệnh");
      return;
    } else if (disease.ageRanges.length === 0) {
      window.alert("Chưa chọn độ tuôi");
      return;
    } else if (disease.genders.length === 0) {
      window.alert("Chưa chọn giới tính");
      return;
    } else if (disease.symptoms.length === 0) {
      window.alert("Chưa có triệu chứng");
      return;
    }
    // create 2 arrays, 1 for chosen symptoms that exist in DB
    // and 1 for new symptoms created in the process
    let editedSymptoms = [];
    let newSymptoms = [];
    if (chosenSymps.length > 0) {
      editedSymptoms = disease.symptoms.filter((symptom) =>
        chosenSymps.some((chosenSymp) => chosenSymp === symptom.id)
      );
      newSymptoms = disease.symptoms.filter((symptom) =>
        chosenSymps.some((chosenSymp) => chosenSymp !== symptom.id)
      );
    } else {
      newSymptoms = disease.symptoms;
    }
    // update edited symptoms
    if (editedSymptoms.length > 0) {
      for (const editedSymptom of editedSymptoms) {
        axios
          .post(
            `https://symptom-checker-with-mern-stack.onrender.com/symptom/update-from-disease/${editedSymptom.id}`,
            editedSymptom
          )
          .then((res) => {
            console.log("Symptom edited");
            console.log(res.data);
          })
          .catch((err) => {
            const message = `Có lỗi xảy ra: ${err}`;
            window.alert(message);
          });
      }
    }
    // create new symptoms from disease
    if (newSymptoms.length > 0) {
      for (const newSymptom of newSymptoms) {
        axios
          .post(
            "https://symptom-checker-with-mern-stack.onrender.com/symptom/add",
            newSymptom
          )
          .then((res) => {
            console.log("Symptom created");
            console.log(res.data);
          })
          .catch((err) => {
            const message = `Có lỗi xảy ra: ${err}`;
            window.alert(message);
          });
      }
    }
    // update disease
    const updateDisease = { ...disease };
    axios
      .post(
        `https://symptom-checker-with-mern-stack.onrender.com/disease/update/${diseaseId}`,
        updateDisease
      )
      .then((res) => {
        console.log("Disease edited", res.data);
        setDisease({
          id: "",
          name: "",
          ageRanges: [],
          genders: [],
          symptoms: [],
          medSpecialty: "",
          relatedArticles: [],
          createInfos: {
            doctorCreated: "",
            doctorId: "",
            timeCreated: "",
            timeEdited: "",
          },
        });
        setStep(1);
        navigate("/disease-table");
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
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
                  <NavLink
                    className="btn btn-outline-primary"
                    to={`/disease/${diseaseId}/view`}
                  >
                    TRỞ VỀ CHẾ ĐỘ XEM
                  </NavLink>
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
                    if (step === 5) {
                      confirmEdit(e);
                    } else if (step === 4) {
                      checkNewSympDes();
                    } else {
                      handleNext();
                    }
                  }}
                >
                  {step === 5 ? "XÁC NHẬN CHỈNH SỬA" : "TIẾP THEO"}
                </button>
              </div>
              {step === 2 && (
                <div className="col-3 d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={(e) => {
                      setStep(4);
                    }}
                  >
                    TRIỆU CHỨNG MỚI
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
