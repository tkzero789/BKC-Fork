import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import axios from "axios";

import ArticleForm from "../../components/ArticleParts/ArticleForm";
import ArticlePatView from "../../components/ArticleParts/ArticlePatView";

export default function ViewArticle({ userRole, userInfos }) {
  const userToken = localStorage.getItem("userToken");
  const apiConfig = {
    headers: { Authorization: `Bearer ${userToken}` },
  };

  const [article, setArticle] = useState({
    id: "",
    title: "",
    diseaseId: "",
    diseaseName: "",
    infos: [],
    treatments: [],
    medSpecialty: "",
    createInfos: {
      doctorCreated: "",
      doctorID: "",
      timeCreated: "",
      timeEdited: "",
    },
    isDisplay: false,
    status: "",
  });
  const [isPatView, setIsPatView] = useState(false);
  const { diseaseId, articleId } = useParams();
  const navigate = useNavigate();

  // get article from DB by articleId
  useEffect(() => {
    axios
      .get(
        `https://symptom-checker-with-mern-stack.onrender.com/article/${articleId}`
      )
      .then((res) => {
        const dbArticle = res.data;
        if (!dbArticle) {
          window.alert(`Không tìm thấy bài viết với id ${articleId} `);
          navigate(-1);
          return;
        }
        setArticle(dbArticle);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [articleId, navigate]);

  // delete article by articleId
  function confirmDelete(e) {
    e.prevenDefault();
    if (window.confirm("Bạn có chắc muốn xóa bài viết này?")) {
      // delete article in disease
      axios
        .post(
          `https://symptom-checker-with-mern-stack.onrender.com/disease/${diseaseId}/delete-article/${articleId}`
        )
        .catch((err) => {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        });
      // delete article
      axios
        .delete(
          `https://symptom-checker-with-mern-stack.onrender.com/article/${articleId}`
        )
        .catch((err) => {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        });
      navigate(`disease/${diseaseId}/article-table`);
    }
  }

  async function setDisplay() {
    try {
      console.log(apiConfig);
      await axios
        .post(
          `https://symptom-checker-with-mern-stack.onrender.com/article/${article.id}/set-isdisplay`,
          { diseaseId: article.diseaseId },
          apiConfig
        )
        .then((res) => {
          window.alert("Bài viết đã được đặt mặc định");
          console.log(res);
          setArticle({
            ...article,
            isDisplay: true,
          });
        });
    } catch (err) {
      const message = `Có lỗi xảy ra: ${err}`;
      window.alert(message);
    }
  }

  return (
    <div>
      {isPatView ? (
        ArticlePatView({ article, setIsPatView })
      ) : (
        <div>
          <h3 className="container text-center text-body pt-5">XEM BÀI VIẾT</h3>
          <div className="container p-5">
            <div className="card border-primary-subtle p-5">
              <form>
                <div>
                  {
                    <ArticleForm
                      article={article}
                      setArticle={setArticle}
                      mode="view"
                    />
                  }
                </div>
                {userRole === "head-doctor" && (
                  <div className="row pt-3 pb-3 gap-2 justify-content-center">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      disabled={article.isDisplay === true}
                      onClick={() => setDisplay()}
                    >
                      {article.isDisplay === true
                        ? "ĐANG LÀ BÀI VIẾT MẶC ĐỊNH"
                        : "ĐẶT LÀM BÀI VIẾT MẶC ĐỊNH"}
                    </button>
                  </div>
                )}
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
                  {userInfos.doctorID === article.createInfos.doctorID && (
                    <div className="col-3 d-grid gap-2">
                      <NavLink
                        className="btn btn-outline-primary"
                        to={`/disease/${diseaseId}/article/${articleId}/edit`}
                      >
                        Chỉnh sửa bài viết
                      </NavLink>
                    </div>
                  )}
                  <div className="col-3 d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => setIsPatView(true)}
                    >
                      Xem chế độ người dùng
                    </button>
                  </div>
                  {userInfos.doctorID === article.createInfos.doctorID && (
                    <div className="col-3 d-grid gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={(e) => confirmDelete(e)}
                      >
                        Xoá bài viết
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
