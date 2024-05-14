import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import ArticleForm from "../../components/ArticleParts/ArticleForm";
import ArticlePatView from "../../components/ArticleParts/ArticlePatView";

export default function ApproveArticle({ userRole, userInfos }) {
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

  const [isPatView, setIsPatView] = useState(false);
  const [article, setArticle] = useState({
    id: "",
    idTemp: "",
    title: "",
    diseaseId: "",
    diseaseName: "",
    infos: [
      {
        id: "",
        number: 1,
        about: "",
        overview: "",
        detail: "",
        image: null,
      },
    ],
    treatments: [
      {
        id: "",
        number: 1,
        about: "",
        overview: "",
        detail: "",
        image: null,
      },
    ],
    medSpecialty: "",
    createInfos: {
      doctorCreated: "",
      doctorId: "",
      timeCreated: "",
      timeEdited: "",
    },
    isDisplay: "",
    status: "",
    doctorReqID: "",
  });
  const { articleIdTemp } = useParams();
  const navigate = useNavigate();

  // get article from DB by articleIdTemp
  useEffect(() => {
    axios
      .get(
        `https://symptom-checker-with-mern-stack.onrender.com/article-temp/${articleIdTemp}`,
        apiConfig
      )
      .then((res) => {
        const dbArticle = res.data;
        if (!dbArticle) {
          window.alert(
            `Không tìm thấy bài viết trong bộ nhớ tạm, có thể bạn đã duyệt/xóa bài viết này`
          );
          navigate("/article-table");
          return;
        }
        setArticle(dbArticle);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [articleIdTemp, navigate]);

  async function confirmApprove(e) {
    e.preventDefault();
    if (article.status === "Pending Create") {
      try {
        // Create article
        axios
          .post(
            "https://symptom-checker-with-mern-stack.onrender.com/article/add",
            { ...article, status: "Approved" },
            apiConfig
          )
          .then((res) => {
            if (res.data && res.data.message === "Article already exists") {
              throw new Error("Bài viết cùng tên cho bệnh này đã tồn tại!");
            }
            console.log("Article created:", res.data);
          });
        // Add article short info to disease
        const articleShort = {
          id: article.id,
          title: article.title,
          doctorID: article.createInfos.doctorID,
        };
        await axios
          .post(
            `https://symptom-checker-with-mern-stack.onrender.com/disease/${article.diseaseId}/add-article`,
            articleShort,
            apiConfig
          )
          .then((res) => {
            console.log("Disease relatedArticle Added:", res.data);
          });
        // Create new notification
        const notif = {
          id: uuidv4(),
          fromInfos: {
            name: userInfos.fullName,
            role: userRole,
            medSpecialty: userInfos.medSpecialty,
            doctorID: userInfos.doctorID,
          },
          toDoctorID: [article.createInfos.doctorID],
          content: {
            type: "Duyệt tạo bài viết",
            detail: `Bác sĩ trưởng Khoa ${userInfos.medSpecialty} đã duyệt bài viết do bác sĩ ${article.createInfos.doctorCreated} tạo`,
            link: `/disease/${article.diseaseId}/article/${article.id}/view`,
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
        confirmDelete(e, true);
      } catch (err) {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      }
    } else if (article.status === "Pending Update") {
      try {
        // Update article
        await axios.post(
          `https://symptom-checker-with-mern-stack.onrender.com/article/update/${article.id}`,
          { ...article, status: "Approved" },
          apiConfig
        );
        // Update article short info in disease
        const articleShort = {
          id: article.id,
          title: article.title,
          doctorID: article.createInfos.doctorID,
        };
        await axios.post(
          `https://symptom-checker-with-mern-stack.onrender.com/disease/${article.diseaseId}/update-article/${article.id}`,
          articleShort,
          apiConfig
        );
        // Create new notification
        const notif = {
          id: uuidv4(),
          fromInfos: {
            name: userInfos.fullName,
            role: userRole,
            medSpecialty: userInfos.medSpecialty,
            doctorID: userInfos.doctorID,
          },
          toDoctorID: [article.createInfos.doctorID],
          content: {
            type: "Duyệt chỉnh sửa bài viết",
            detail: `Bác sĩ trưởng Khoa ${userInfos.medSpecialty} đã duyệt chỉnh sửa bài viết ${article.title}`,
            link: `/disease/${article.diseaseId}/article/${article.id}/view`,
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
          `https://symptom-checker-with-mern-stack.onrender.com/article-temp/${articleIdTemp}`,
          apiConfig
        );
      } catch (err) {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      }
    } else {
      if (window.confirm("Xóa bài viết này trong bộ nhớ tạm thời?")) {
        try {
          axios.delete(
            `https://symptom-checker-with-mern-stack.onrender.com/article-temp/${articleIdTemp}`,
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
            toDoctorID: [article.doctorReqID],
            content: {
              type:
                article.status === "Pending Create"
                  ? "Không duyệt tạo bài viết"
                  : "Không duyệt chỉnh sửa bài viết",
              detail:
                article.status === "Pending Create"
                  ? `Bác sĩ trưởng Khoa không duyệt tạo bài viết ${article.title}`
                  : `Bác sĩ trưởng Khoa không duyệt chỉnh sửa bài viết ${article.title}`,
              link: "",
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
        } catch (err) {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        }
      }
    }
    // Set default and navigate
    setArticle((prev) => ({
      ...prev,
      title: "",
      infos: [],
      treatments: [],
    }));
    navigate(`/article-table`);
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
                  <div className="col-3 d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => setIsPatView(true)}
                    >
                      XEM CHẾ ĐỘ NGƯỜI DÙNG
                    </button>
                  </div>
                  {userRole === "head-doctor" && (
                    <div className="col-3 d-grid gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={(e) => confirmApprove(e)}
                      >
                        XÁC NHẬN DUYỆT
                      </button>
                    </div>
                  )}
                  {(userRole === "head-doctor" ||
                    userInfos.doctorID === article.createInfos.doctorID) && (
                    <div className="col-3 d-grid gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={(e) => confirmDelete(e, false)}
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
      )}
    </div>
  );
}
