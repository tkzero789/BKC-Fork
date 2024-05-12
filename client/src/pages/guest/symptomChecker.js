import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PatientFormAgeGen from "../../components/SymptomCheckerParts/PatientFormAgeGen";
import PatientFormSymptoms from "../../components/SymptomCheckerParts/PatientFormSymptoms";
import PatientFormDes from "../../components/SymptomCheckerParts/PatientFormDes";
import PatientFormResult from "../../components/SymptomCheckerParts/PatientFormResult";
import axios from "axios";
import { Toaster, toast } from "sonner";
import Footer from "../../components/ForPages/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function SymptomChecker() {
  const [patientForm, setPatientForm] = useState({
    age: "",
    gender: "",
    chosenSymps: [],
    chosenDescs: [],
  });
  const [feedback, setFeedback] = useState({
    stars: 0,
    comment: "",
    isSent: false,
  });
  // get all symptoms from DB
  const [dbSymps, setDbSymps] = useState([]);
  // filter symptoms chosen in process from dbSymps
  const [chosenSymps, setChosenSymps] = useState([]);
  // keep patient result updated every step, contain disease objects from dbDiseases
  const [patientResult, setPatientResult] = useState([]);
  // set step and previous step in the process
  const [prevStep, setPrevStep] = useState(1);
  const [step, setStep] = useState(1);
  const [finalStep, setFinalStep] = useState(3);
  const stepNames = [
    { number: 0, name: "Điền thông tin" },
    { number: 1, name: "Chọn triệu chứng" },
    { number: 2, name: "Mô tả chi tiết" },
    { number: 3, name: "Kết quả chẩn đoán" },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/disease")
      .then((res) => {
        setPatientResult(res.data);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/symptom")
      .then((res) => {
        setDbSymps(res.data);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
        return;
      });
  }, []);

  useEffect(() => {
    setChosenSymps(
      dbSymps.filter((symptom) => patientForm.chosenSymps.includes(symptom.id))
    );
  }, [dbSymps, patientForm.chosenSymps]);

  useEffect(() => {
    setFinalStep(3 + chosenSymps.length);
  }, [chosenSymps]);

  const StepDisplay = () => {
    if (step === 1) {
      return (
        <PatientFormAgeGen
          patientForm={patientForm}
          setPatientForm={setPatientForm}
        />
      );
    } else if (step === 2) {
      return (
        <PatientFormSymptoms
          dbSymps={dbSymps}
          patientForm={patientForm}
          setPatientForm={setPatientForm}
        />
      );
    } else if (step > 2 && step < finalStep) {
      return (
        <PatientFormDes
          chosenSymp={chosenSymps[step - 3]}
          patientForm={patientForm}
          setPatientForm={setPatientForm}
        />
      );
    } else {
      return (
        <PatientFormResult
          patientResult={patientResult}
          feedback={feedback}
          setFeedback={setFeedback}
        />
      );
    }
  };

  const handleNext = () => {
    setPrevStep(step);
    setStep((step) => step + 1);
    window.scrollTo({ top: 100, left: 0, behavior: "instant" });
  };

  const checkHandleNext = () => {
    if (step === 1) {
      if (patientForm.age === "" || patientForm.gender === "") {
        toast.error("Hãy nhập đầy đủ tuổi và giới tính");
        return;
      }
      // filter disease with suitable age and gender
      const age =
        patientForm.age <= 1
          ? "Dưới 1 tuối"
          : patientForm.age <= 5
          ? "1 tuổi - 5 tuổi"
          : patientForm.age <= 12
          ? "6 tuổi - 12 tuổi"
          : patientForm.age <= 16
          ? "13 tuổi - 16 tuổi"
          : patientForm.age <= 29
          ? "17 tuổi - 29 tuổi"
          : patientForm.age <= 39
          ? "30 tuổi - 39 tuổi"
          : patientForm.age <= 49
          ? "40 tuổi - 49 tuổi"
          : patientForm.age <= 64
          ? "50 tuổi - 64 tuổi"
          : "Trên 65 tuổi";
      const gender = patientForm.gender;
      const _patientResult = patientResult.filter((disease) => {
        return (
          (disease.ageRanges.includes(age) ||
            disease.ageRanges.includes("Mọi độ tuổi")) &&
          (disease.genders.includes(gender) ||
            disease.genders.includes("Cả nam và nữ"))
        );
      });
      setPatientResult(_patientResult);
    } else if (step === 2) {
      if (patientForm.chosenSymps.length === 0) {
        toast.error("Hãy chọn ít nhất 1 triệu chứng");
        return;
      }
      const chosenSymps = patientForm.chosenSymps;
      const _patientResult = patientResult.map((disease) => ({
        ...disease,
        sympMatched:
          disease.symptomIds.filter((id) => chosenSymps.includes(id)).length *
          5,
      }));
      const sortedPatientResult = _patientResult
        .filter((disease) => disease.sympMatched > 0)
        .sort((a, b) => b.sympMatched - a.sympMatched);
      setPatientResult(sortedPatientResult);
    } else if (step > 2 && step < finalStep) {
      if (
        patientForm.chosenDescs.filter(
          (desc) => desc.symptomId === chosenSymps[step - 3].id
        ).length === 0
      ) {
        toast.error("Hãy chọn ít nhất 1 mô tả");
        return;
      }
      const chosenDescs = patientForm.chosenDescs.map(
        (chosenDesc) => chosenDesc.descriptionId
      );
      const _patientResult = patientResult.map((disease) => ({
        ...disease,
        desMatched: disease.descIds.filter((id) => chosenDescs.includes(id))
          .length,
        matchedScore:
          disease.sympMatched +
          disease.descIds.filter((desc) =>
            chosenDescs.includes(desc.descriptionId)
          ).length,
      }));
      console.log(_patientResult);
      const sortedPatientResult = _patientResult.sort(
        (a, b) => b.matchedScore - a.matchedScore
      );
      setPatientResult(sortedPatientResult);
      console.log(patientForm);
    }
    handleNext();
  };

  const setDefault = () => {
    setPatientForm({
      age: "",
      gender: "",
      chosenSymps: [],
      chosenDescs: [],
    });
    handlePrev();
  };

  const handlePrev = () => {
    setPrevStep(step);
    setStep((step) => step - 1);
    window.scrollTo({ top: 100, left: 0, behavior: "instant" });
  };

  const StepName = (props) => {
    return (
      <div
        className={
          "p-2 col-3 " +
          (props.number === 0
            ? "blue-bg-1 border rounded-start border-secondary"
            : "") +
          (props.number < props.currStep
            ? "blue-bg-1 border-end border-top border-bottom border-secondary"
            : "bg-white border-end border-top border-bottom border-secondary") +
          (props.number === 3 ? " rounded-end" : "")
        }
      >
        <h5
          className={
            "fw-med text-center " +
            (props.number < props.currStep ? "text-white" : "text-black")
          }
          style={{ marginBottom: "1px" }}
        >
          {props.name}
        </h5>
      </div>
    );
  };

  const ProcessBar = () => {
    return stepNames.map((stepName) => {
      return (
        <StepName
          key={stepName.number}
          number={stepName.number}
          currStep={step > 2 && step < finalStep ? 3 : step}
          name={stepName.name}
        />
      );
    });
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Phòng khám online</title>
        </Helmet>
      </HelmetProvider>
      <div className="symp-checker w-100">
        <div className="content-container">
          <h3 className="text-center">
            CHÀO MỪNG BẠN ĐẾN VỚI TÍNH NĂNG GỢI Ý CHẨN ĐOÁN BỆNH
          </h3>
          <div className="symp-checker-board">
            <div className="card">
              <div className="progress-bar-step border rounded">
                {ProcessBar()}
              </div>
              <form>
                <div>{StepDisplay()}</div>

                <div className="steps-button-wrapper">
                  <div className="steps-back-button">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      disabled={step === 1}
                      onClick={() => {
                        if (step === 2) {
                          setDefault();
                        } else {
                          handlePrev();
                        }
                      }}
                    >
                      Quay lại
                    </button>
                  </div>
                  <div className="steps-next-button">
                    {step === finalStep ? (
                      <Link
                        type="button"
                        className="btn btn-outline-primary"
                        to={`/appt-request`}
                      >
                        ĐẶT LỊCH KHÁM
                      </Link>
                    ) : (
                      <>
                        <Toaster
                          toastOptions={{
                            className: "toast-noti",
                          }}
                          position="top-center"
                          richColors
                        />
                        <button
                          type="button"
                          className="btn btn-primary"
                          disabled={
                            (step === 1 &&
                              (!patientForm.age || !patientForm.gender)) ||
                            (step === 2 &&
                              patientForm.chosenSymps.length === 0) ||
                            (step > 2 &&
                              step < finalStep &&
                              patientForm.chosenDescs.length === 0)
                          }
                          onClick={checkHandleNext}
                        >
                          {step === finalStep - 1 ? "Xem kết quả" : "Tiếp theo"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
