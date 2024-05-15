import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PatientFormResult = ({ patientResult }) => {
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
        .post(
          `https://symptom-checker-with-mern-stack.onrender.com/article/by-ids`,
          { ids: articleIds }
        )
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
    window.scrollTo({ top: 110, left: 0, behavior: "instant" });
  }

  function chooseArticle(article) {
    setChoosingArticle(article);
    window.scrollTo({ top: 110, left: 0, behavior: "instant" });
  }

  function SuitDiseases({ disease }) {
    return (
      <div
        className="article-btn button text-start border-0 col-12 mb-3 p-3 box-shadow-1 blue-bg-2"
        onClick={() => chooseDisease(disease)}
      >
        <h5 className="fw-med text-blue-2 pb-md-2 pb-1">{disease.name}</h5>
        <h6 className="fw-reg pb-sm-1">Chuyên khoa: {disease.medSpecialty}</h6>
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
      <div className="d-flex pb-3">
        <div className="c-6 text-center">
          <button
            type="button"
            className={`btn w-75 ${
              part === 1 ? "btn-outline-primary" : "btn-primary w-75"
            }`}
            disabled={part === 1}
            onClick={handlePrev}
          >
            Thông tin chi tiết
          </button>
        </div>
        <div className="c-6 text-center">
          <button
            type="button"
            className={`btn w-75 ${
              part === 2 ? "btn-outline-primary" : "btn-primary w-75"
            }`}
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
                <h5 className="pb-md-2 pb-1 text-black-2">{about}</h5>
                <p className="pb-md-2 pb-1 text-secondary-1">{overview}</p>
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
                <h5 className="pb-md-2 pb-1">{about}</h5>
                <p className="pb-md-2 pb-1">{overview}</p>
              </div>
            );
          })}
        </div>
      );
    }
  }

  function DisplayedArticle({ article }) {
    return (
      <div className="main-article c-12 mb-3 p-3 box-shadow-1">
        <h5 className="fw-med text-blue-2 d-flex justify-content-center pb-3">
          {article.title}
        </h5>
        {SwitchPartButton()}
        {PartDisplay(article)}
        <Link
          to={`/articles/${article.id}`}
          target="_blank"
          className="pt-1 fw-reg d-flex justify-content-end"
        >
          Xem chi tiết
        </Link>
      </div>
    );
  }

  function OtherArticle({ article }) {
    return (
      <div
        className="article-btn button border-0 text-start w-100 c-12 mb-3 p-3 box-shadow-1 blue-bg-2"
        onClick={() => chooseArticle(article)}
      >
        <h5 className="fw-med text-blue-2 pb-md-2 pb-1">{article.title}</h5>
        <h6 className="fw-reg">
          Viết bởi BS {article.createInfos.doctorCreated}
        </h6>
      </div>
    );
  }

  return (
    <div>
      <div className="pb-5 text-center text-blue-1 fw-med">
        <h4>Kết quả gợi ý chẩn đoán dựa trên thông tin bạn cung cấp</h4>
      </div>

      <div className="final-results row pt-3 pb-3">
        <div className="extra-articles c-4 md-12">
          {patientResult.map((disease) => (
            <SuitDiseases disease={disease} key={disease.id} />
          ))}
        </div>
        <div className="c-8 md-12">
          <div className="c-12">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientFormResult;
