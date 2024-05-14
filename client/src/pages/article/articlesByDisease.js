import React, { useEffect, useState } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import axios from "axios";

export default function ArticlesByDisease({ userInfos }) {
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
      doctorID: "",
      timeCreated: "",
      timeEdited: null,
    },
  });
  const { diseaseId } = useParams();

  // get disease from DB by diseaseId
  useEffect(() => {
    axios
      .get(
        `https://symptom-checker-with-mern-stack.onrender.com/disease/${diseaseId}`
      )
      .then((res) => {
        const disease = res.data;
        setDisease(disease);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [diseaseId]);

  // delete article with articleId
  async function onDelete(articleId) {
    if (window.confirm("Bạn có chắc muốn xóa bài viết này?")) {
      const _disease = disease;
      _disease.relatedArticles = disease.relatedArticles.filter(
        (article) => article.id !== articleId
      );
      setDisease(_disease);
      // delete article in disease
      axios
        .post(
          `https://symptom-checker-with-mern-stack.onrender.com/disease/${diseaseId}/delete-article/${articleId}`
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        });
      // delete article
      axios
        .delete(
          `https://symptom-checker-with-mern-stack.onrender.com/article/${articleId}`
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        });
    }
  }

  // display each article in disease relatedArticles array
  const Article = ({ article, onDelete }) => (
    <div className="disease-item d-flex px-0 py-0 ms-3 my-2 ">
      <div className="d-flex border border-secondary-subtle shadow-sm rounded">
        <div
          className="disease-item py-0 px-0 b rounded-start px-3 py-2"
          style={{ display: "flex" }}
        >
          <Link
            className="text-body text-decoration-none"
            to={`/disease/${diseaseId}/article/${article.id}/view`}
          >
            <div>{article.title}</div>
          </Link>
        </div>
        {userInfos.doctorID === article.doctorID && (
          <div>
            <div>
              <Link
                to={`/disease/${diseaseId}/article/${article.id}/edit`}
                className="rounded position-absolute bg-success bg-gradient py-2 px-3 ms-3"
              >
                <i className="text-light text-opacity-75 bi bi-pencil"></i>
              </Link>
            </div>
            <div>
              <Link>
                <i
                  className="rounded position-absolute bg-danger bg-gradient bi bi-trash-fill text-light text-opacity-75 py-2 px-3 ms-7"
                  onClick={() => onDelete(article.id)}
                ></i>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // display article list from disease relatedArticles array
  function articleList() {
    return disease.relatedArticles.map((article) => {
      return (
        <Article
          article={article}
          onDelete={() => onDelete(article.id)}
          key={article.id}
        />
      );
    });
  }

  return (
    <div>
      <h4 className="container text-center text-body pt-5">
        DANH SÁCH BÀI VIẾT VỀ BỆNH {disease.name.toUpperCase()}
      </h4>
      <div className="container p-5">
        <div className="border border-secondary border-opacity-25 rounded shadow p-5">
          <form>
            <h4 className="card-title text-body">Những bài viết đã có:</h4>
            <div className="row d-flex px-3 pt-2 pb-2">{articleList()}</div>
            <div className="d-flex justify-content-evenly row pt-3">
              <div className="col-3 d-grid gap-2">
                <NavLink
                  className="btn btn-outline-primary bg-gradient"
                  to={`/disease/${diseaseId}/view`}
                >
                  QUAY LẠI
                </NavLink>
                <NavLink
                  className="btn btn-outline-primary bg-gradient"
                  to={`/disease/${diseaseId}/article/create`}
                >
                  TẠO BÀI VIẾT MỚI
                </NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
