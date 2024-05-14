import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PatientFormResult = ({ patientResult, feedback, setFeedback }) => {
  const [isProcessing, setIsProcessing] = useState(true);
  // set disease choosing from user, it is the first disease in patientResult (sorted) initially
  const [choosingDisease, setChoosingDisease] = useState({});
  // get all articles form DB related to patient diseases
  const [articles, setArticles] = useState([]);
  // get all articles form DB related to choosingDisease
  const [diseaseArticles, setDiseaseArticles] = useState([]);
  // set article to display on screen, it is the first article of choosingDisease initially
  const [choosingArticle, setChoosingArticle] = useState({});
  // divide article into Info part and Treatment part
  const [part, setPart] = useState(1);

  useEffect(() => {
    if (patientResult.length > 0) {
      const articleIds = patientResult
        .flatMap((disease) => disease.relatedArticles)
        .map((article) => article.id);
      axios
        .post(`http://localhost:5000/article/by-ids`, { ids: articleIds })
        .then((res) => {
          setArticles(res.data);
        })
        .catch((err) => {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        });
    }
  }, [patientResult]);

  useEffect(() => {
    chooseDisease(patientResult[0]);
  }, [articles]);

  function chooseDisease(disease) {
    const diseaseArticles = articles.filter(
      (article) => article.diseaseId === disease.id
    );
    setDiseaseArticles(diseaseArticles);
    if (diseaseArticles.length > 0) {
      const displayArticle = diseaseArticles.find(
        (art) => art.isDisplay === true
      );
      if (displayArticle) {
        chooseArticle(displayArticle);
      } else {
        chooseArticle(diseaseArticles[0]);
      }
    }
    setIsProcessing(false);
  }

  function chooseArticle(article) {
    setChoosingArticle(article);
  }

  function SuitDiseases({ disease }) {
    return (
      <div
        className="button col-12 mb-3 p-3 box-shadow-1"
        onClick={() => chooseDisease(disease)}
      >
        <h5 className="fw-med text-blue-2" style={{ marginBottom: "1px" }}>
          {disease.name}
        </h5>
        <h6 className="fw-med text-blue-2" style={{ marginBottom: "1px" }}>
          Chuyên khoa: {disease.medSpecialty}
        </h6>
      </div>
    );
  }

  function handlePrev() {
    setPart((part) => part - 1);
  }
  function handleNext() {
    setPart((part) => part + 1);
  }

  function SwitchPartButton() {
    return (
      <div className="row pb-3">
        <div className="col-6 d-grid gap-2">
          <button
            type="button"
            className="btn btn-outline-primary"
            disabled={part === 1}
            onClick={handlePrev}
          >
            Thông tin chi tiết
          </button>
        </div>
        <div className="col-6 d-grid gap-2">
          <button
            type="button"
            className="btn btn-outline-primary"
            disabled={part === 2}
            onClick={handleNext}
          >
            Phương pháp điều trị
          </button>
        </div>
      </div>
    );
  }

  function PartDisplay(article) {
    if (part === 1) {
      return (
        <div>
          {article.infos.map((info) => {
            const about = info.about;
            const overview = info.overview;
            return (
              <div>
                <h5>{about}</h5>
                <br></br>
                <p>{overview}</p>
                <br></br>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div>
          {article.treatments.map((trm) => {
            const about = trm.about;
            const overview = trm.overview;
            return (
              <div>
                <h5>{about}</h5>
                <br></br>
                <p>{overview}</p>
                <br></br>
              </div>
            );
          })}
        </div>
      );
    }
  }

  function DisplayedArticle({ article }) {
    return (
      <div className="col-12 mb-3 p-3 box-shadow-1">
        <h5
          className="fw-med text-blue-2 d-flex justify-content-center pb-3"
          style={{ marginBottom: "1px" }}
        >
          {article.title}
        </h5>
        {SwitchPartButton()}
        {PartDisplay(article)}
        <Link
          to={`/articles/${article.id}`}
          target="_blank"
          className="pt-1 fw-reg d-flex justify-content-end"
          style={{ marginBottom: "1px" }}
        >
          Xem chi tiết
        </Link>
      </div>
    );
  }

  function OtherArticle({ article }) {
    return (
      <div
        className="button col-12 mb-3 p-3 box-shadow-1"
        onClick={() => chooseArticle(article)}
      >
        <h5 className="fw-med text-blue-2" style={{ marginBottom: "1px" }}>
          {article.title}
        </h5>
        <h6 className="fw-med text-blue-2" style={{ marginBottom: "1px" }}>
          Viết bởi BS {article.createInfos.doctorCreated}
        </h6>
      </div>
    );
  }

  // function updateStarField(newRating) {
  //   setFeedback({ ...feedback, stars: newRating });
  // }

  // function updateCmtField(event) {
  //   setFeedback({ ...feedback, comment: event.target.value });
  // }

  // function submitFeedback(e) {
  //   e.preventDefault();
  //   setFeedback({ ...feedback, isSent: true });
  // }

  return (
    <div>
      <div className="pb-5 text-center text-blue-1 fw-med">
        <h4>Kết quả gợi ý chẩn đoán dựa trên thông tin bạn cung cấp</h4>
      </div>

      <div className="row pt-3 pb-3">
        <div className="col-4">
          {patientResult.map((disease) => (
            <SuitDiseases disease={disease} key={disease.id} />
          ))}
        </div>
        <div className="col-8 row">
          <div className="col-12">
            {diseaseArticles.length > 0 && (
              <DisplayedArticle
                article={choosingArticle}
                key={choosingArticle.id}
              />
            )}
            {diseaseArticles.length > 1 &&
              diseaseArticles
                .filter((article) => article.id !== choosingArticle.id)
                .map((article) => (
                  <OtherArticle article={article} key={article.id} />
                ))}

            {/* <div className="col-12 mb-3 p-3 box-shadow-1">
                <h4
                  className="fw-med text-blue-2 d-flex justify-content-center pb-3"
                  style={{ marginBottom: "1px" }}
                >
                  Chức năng này có hữu ích không?
                </h4>
                <div className="row">
                  <div className="d-flex col">
                    {[...Array(5)].map((_, index) => (
                      <span
                        className="mr-5 pe-auto "
                        key={index}
                        onClick={() => updateStarField(index + 1)}
                      >
                        {feedback.stars >= index + 1 ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                  <textarea
                    className="form-control border-primary-subtle col-12"
                    value={feedback.comment}
                    rows={3}
                    onChange={(e) => updateCmtField(e)}
                    placeholder="Ý kiến của bạn"
                  />
                  <button
                    className="btn btn-outline-primary col-12 mt-3"
                    disabled={feedback.isSent}
                    onClick={(e) => submitFeedback(e)}
                  >
                    Gửi feedback
                  </button>
                </div>
              </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientFormResult;
