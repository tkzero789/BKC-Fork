import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

export default function ArticlePatientView({ userRole, userInfos }) {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { articleId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/article/${articleId}`)
      .then((res) => {
        const dbarticle = res.data;
        if (!dbarticle) {
          window.alert(`Article with id ${articleId} not found`);
          if (!userInfos) {
            navigate("/symptom-checker");
          } else {
            console.log(userInfos);
            navigate(-1);
          }
          return;
        }
        console.log(dbarticle);
        setArticle(dbarticle);
        setIsLoading(false);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [articleId]);

  const ArticleContent = ({ element }) => {
    const elemAbout = element.about;
    const elemOverview = element.overview;
    const elemDetail = element.detail;
    return (
      <div>
        <h5>{elemAbout}</h5>
        <p>{elemOverview}</p>
        {element.image && (
          <img alt={element.image} src={element.image} className="w-100 p-5" />
        )}
        {elemDetail.split("\n\n").map((paragraph) => (
          <div key={paragraph.slice(0, 20)}>
            {paragraph.split("\n").map((line) => (
              <p key={line.slice(0, 10)}>{line}</p>
            ))}
            <br></br>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="symp-checker w-100">
      {isLoading ? (
        <p>Đang tải bài viết...</p>
      ) : (
        <div className="content-container">
          <h3 className="text-center">{article.title}</h3>
          <div className="symp-checker-steps">
            <h5>THÔNG TIN CĂN BỆNH</h5>
            {article.infos.map((info) => (
              <ArticleContent element={info} key={info.id} />
            ))}
            <h5>PHƯƠNG PHÁP ĐIỀU TRỊ</h5>
            {article.treatments.map((trm) => (
              <ArticleContent element={trm} key={trm.id} />
            ))}
            <hr></hr>
            <div className="row">
              <p className="d-flex justify-content-end">
                Bài viết được cung cấp bởi {article.createInfos.doctorCreated}
              </p>
              {userRole && (
                <div className="col-6 d-grid gap-2 justify-content-start">
                  <NavLink
                    className="btn btn-outline-primary"
                    to={`/article-table`}
                  >
                    QUAY LẠI
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
