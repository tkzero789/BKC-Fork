import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import ArticleForm from "../../components/ArticleParts/ArticleForm";

export default function EditArticle({ userRole, userInfos }) {
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

  const [origTitle, setOrigTitle] = useState("");
  const { diseaseId, articleId } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState({
    id: "",
    title: "",
    diseaseId: "",
    diseaseName: "",
    infos: [
      {
        id: uuidv4(),
        number: 1,
        about: "",
        overview: "",
        detail: "",
        image: null,
      },
    ],
    treatments: [
      {
        id: uuidv4(),
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
    isDisplay: false,
    status: "",
  });

  // get article by articleId
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
        if (dbArticle.createInfos.doctorID !== userInfos.doctorID) {
          window.alert("Chỉ có bác sĩ tạo ra mới được chỉnh sửa dữ liệu");
          navigate(-1);
          return;
        }
        setArticle({
          ...dbArticle,
          idTemp: uuidv4(),
          createInfos: {
            ...dbArticle.createInfos,
            timeEdited: formattedTime,
          },
          status: "Pending Update",
          doctorReqID: userInfos.doctorID,
        });
        setOrigTitle(dbArticle.title);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [articleId, navigate]);

  function confirmCancle(e) {
    if (window.confirm("Hủy và trở về trạng thái xem?")) {
      setArticle((prev) => ({
        ...prev,
        title: "",
        infos: [],
        treatments: [],
      }));
      navigate(-1);
    }
  }

  async function confirmEdit(e) {
    e.preventDefault();
    // validation fields
    if (article.title === "") {
      alert("Thiếu tên bài viết");
      return;
    } else if (
      article.infos.filter(
        (info) =>
          info.about === "" || info.overview === "" || info.detail === ""
      ).length > 0
    ) {
      alert("Thiếu thông tin bệnh");
      return;
    } else if (
      article.treatments.filter(
        (trm) => trm.about === "" || trm.overview === "" || trm.detail === ""
      ).length > 0
    ) {
      alert("Thiếu phương pháp chữa trị");
      return;
    } else {
      try {
        if (origTitle !== article.title) {
          await axios
            .get(
              `https://symptom-checker-with-mern-stack.onrender.com/article/${article.title}`
            )
            .then((res) => {
              if (res.data) {
                throw new Error(
                  "Bài viết cùng tiêu đề đã có sẵn trong cơ sở dữ liệu!"
                );
              }
            });
        }
        // Edit article
        axios
          .post(
            `https://symptom-checker-with-mern-stack.onrender.com/article-temp/add/`,
            article,
            apiConfig
          )
          .then((res) => {
            if (res.data && res.data.message === "Article already exists") {
              throw new Error(
                "Bạn đã chỉnh sửa bài viết này, vui lòng đợi admin xét duyệt!"
              );
            }
            console.log("Article edited", res.data);
          });
        // Create notification to head-doctor
        const resId = await axios.post(
          `https://symptom-checker-with-mern-stack.onrender.com/user/medspec-hdoctor-id`,
          { medSpecialty: userInfos.medSpecialty }
        );
        const hdoctorID = resId.data;
        const notif = {
          id: uuidv4(),
          fromInfos: {
            name: userInfos.fullName,
            role: userRole,
            medSpecialty: userInfos.medSpecialty,
            doctorID: userInfos.doctorID,
          },
          toDoctorID: [hdoctorID],
          content: {
            type: "Chỉnh sửa bài viết",
            detail: `Bác sĩ ${userInfos.fullName} đã chỉnh sửa bài viết ${article.title}`,
            link: `/article-temp/${article.idTemp}/approve`,
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

        setArticle((prev) => ({
          ...prev,
          title: "",
          infos: [],
          treatments: [],
        }));
        navigate(`/disease/${diseaseId}/article-table`);
      } catch (err) {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      }
    }
  }

  return (
    <div>
      <h3 className="container text-center text-body pt-5">
        CHỈNH SỬA BÀI VIẾT
      </h3>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
          <form>
            <div>
              {
                <ArticleForm
                  article={article}
                  setArticle={setArticle}
                  mode="edit"
                />
              }
            </div>
            <div className="row pt-3 pb-3 justify-content-end">
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={(e) => confirmCancle(e)}
                >
                  HỦY CHỈNH SỬA
                </button>
              </div>
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={(e) => {
                    confirmEdit(e);
                  }}
                >
                  XÁC NHẬN CHỈNH SỬA
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
