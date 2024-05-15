import React, { useEffect, useState } from "react";

export default function DiseaseName({ disease, setDisease, dbSymps, mode }) {
  // get chosen symptoms and chosen descriptions
  const [chosenSymps, setChosenSymps] = useState([]);
  const [chosenDescs, setChosenDescs] = useState([]);
  useEffect(() => {
    setChosenSymps(
      dbSymps.filter((symptom) => disease.symptomIds.includes(symptom.id))
    );
  }, [dbSymps, disease.symptomIds]);

  useEffect(() => {
    const chosenDescs = [];
    for (const chosenSymp of chosenSymps) {
      for (const cat of chosenSymp.categories) {
        for (const des of cat.descriptions) {
          if (disease.descIds.some((desc) => desc.descriptionId === des.id)) {
            chosenDescs.push({
              symptomId: chosenSymp.id,
              descriptionDetail: des.descriptionDetail,
            });
          }
        }
      }
    }
    setChosenDescs(chosenDescs);
  }, [chosenSymps]);

  const updateField = (event) => {
    setDisease({ ...disease, [event.target.name]: event.target.value });
  };

  const Symptom = ({ symptom, key }) => {
    return (
      <div key={key} className="col-4 p-2">
        <div className="border border-primary-subtle p-2 text-center">
          <p className="m-0">{symptom.name}</p>
        </div>
      </div>
    );
  };

  const Details = ({ symptom, key }) => {
    const descDetails = chosenDescs
      .filter((desc) => desc.symptomId === symptom.id)
      .map((desc) => desc.descriptionDetail);
    return (
      <div key={key} className="p-2">
        <p className="m-0">
          - {symptom.name}: {descDetails.join(", ")}
        </p>
      </div>
    );
  };

  return (
    <div>
      <div className="form-group row pb-5">
        <h4 className="text-blue-2 col-3">Tên căn bệnh</h4>
        <input
          type="text"
          className="form-control border-primary-subtle col"
          name="name"
          value={disease.name}
          readOnly={mode === "view"}
          onChange={(e) => updateField(e)}
        />
      </div>

      <div className="form-group row pb-5">
        <h4 className="text-blue-2 col-3">Độ tuổi</h4>
        <div className="border border-primary-subtle rounded col-9">
          <p className="m-1">
            {disease.ageRanges.map((ageRange, index) => (
              <span key={index}>
                {ageRange} {index < disease.ageRanges.length - 1 && ", "}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="form-group row pb-5">
        <h4 className="text-blue-2 col-3">Giới tính</h4>
        <div className="border border-primary-subtle rounded col-9">
          <p className="m-1">
            {disease.genders.map((gender, index) => (
              <span key={index}>
                {gender} {index < disease.genders.length - 1 && ", "}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="form-group row pb-5">
        <h4 className="text-blue-2 col-3">Triệu chứng</h4>
        <div className="border border-primary-subtle rounded col-9">
          <div className="row">
            {chosenSymps.map((symptom) => {
              return <Symptom symptom={symptom} key={symptom.name} />;
            })}
          </div>
        </div>
      </div>

      <div className="form-group row pb-5">
        <h4 className="text-blue-2 col-3">Mô tả chi tiết</h4>
        <div className="border border-primary-subtle rounded col">
          {chosenSymps.map((symptom) => {
            return <Details symptom={symptom} key={symptom.name} />;
          })}
        </div>
      </div>
    </div>
  );
}
