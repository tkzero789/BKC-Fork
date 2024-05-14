import React from "react";

export default function ArticlePatView({ article, setIsPatView }) {
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
          <div className="row d-flex pt-3 pb-3">
            <div className="col-6 d-grid gap-2 justify-content-start">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => setIsPatView(false)}
              >
                QUAY LẠI
              </button>
            </div>
            <p className="col-6 d-grid gap-2 justify-content-end">
              Bài viết được cung cấp bởi BS {article.createInfos.doctorCreated}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
