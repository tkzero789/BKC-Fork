import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "bootstrap-icons/font/bootstrap-icons.css";

import ArticleForm from "../../components/ArticleParts/ArticleForm";
import ArticlePatView from "../../components/ArticleParts/ArticlePatView";

export default function CreateArticle({ userRole, userInfos }) {
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
    id: uuidv4(),
    idTemp: uuidv4(),
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
    medSpecialty: userInfos.medSpecialty,
    createInfos: {
      doctorCreated: userInfos.fullName,
      doctorID: userInfos.doctorID,
      timeCreated: formattedTime,
      timeEdited: null,
    },
    isDisplay: false,
    status: "Pending Create",
    doctorReqID: userInfos.doctorID,
  });

  const { diseaseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/disease/${diseaseId}`)
      .then((res) => {
        const disease = res.data;
        setArticle({
          ...article,
          diseaseId: disease.id,
          diseaseName: disease.name,
        });
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [diseaseId]);

  function confirmCancle(e) {
    if (window.confirm("Hủy tạo và trở về?")) {
      setArticle((prev) => ({
        ...prev,
        title: "",
        infos: [],
        treatments: [],
      }));
      navigate(-1);
    }
  }

  async function confirmCreate(e) {
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
        // Create new article
        await axios
          .post("http://localhost:5000/article-temp/add", article, apiConfig)
          .then((res) => {
            if (res.data && res.data.message === "Article already exists") {
              throw new Error(
                "Bài viết cùng tên cho bệnh này đang được người khác thêm vào!"
              );
            }
            console.log("Article created:", res.data);
          });
        // Create notification to head-doctor
        const resId = await axios.post(
          `http://localhost:5000/user/medspec-hdoctor-id`,
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
            type: "Tạo bài viết",
            detail: `Bác sĩ ${userInfos.fullName} đã tạo bài viết ${article.title}`,
            link: `/article-temp/${article.idTemp}/approve`,
          },
          timeSent: formattedTime,
          status: "Chưa xem",
        };
        await axios
          .post("http://localhost:5000/notification/add", notif, apiConfig)
          .then((res) => {
            console.log("Notification created", res.data);
          });
      } catch (err) {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      }
      setArticle((prev) => ({
        ...prev,
        title: "",
        infos: [],
        treatments: [],
      }));
      navigate(`/disease/${diseaseId}/article-table`);
    }
  }

  return (
    <div>
      {isPatView ? (
        ArticlePatView({ article, setIsPatView })
      ) : (
        <div>
          <h3 className="container text-center text-body pt-5">TẠO BÀI VIẾT</h3>
          <div className="container p-5">
            <div className="card border-primary-subtle p-5">
              <form>
                <div>
                  {
                    <ArticleForm
                      article={article}
                      setArticle={setArticle}
                      mode="create"
                    />
                  }
                </div>

                <div className="row pt-3 pb-3 justify-content-end">
                  <div className="col-3 d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={(e) => confirmCancle(e)}
                    >
                      Huỷ tạo
                    </button>
                  </div>
                  <div className="col-3 d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => setIsPatView(true)}
                    >
                      Xem chế độ người dùng
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
                      Xác nhận tạo
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
