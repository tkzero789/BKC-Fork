import React from "react";

export default function DiseaseSymps({ disease, setDisease, dbSymps, mode }) {
  function onCheck(symptomId) {
    if (disease.symptomIds.includes(symptomId)) {
      setDisease({
        ...disease,
        symptomIds: disease.symptomIds.filter((id) => id !== symptomId),
        descIds: disease.descIds.filter((desc) => desc.symptomId !== symptomId),
      });
    } else {
      setDisease({
        ...disease,
        symptomIds: [...disease.symptomIds, symptomId],
      });
    }
  }

  const Symptom = ({ symptom, isChecked, onCheck, key }) => {
    return (
      <div key={key} className="col-3 pb-3">
        <div className="form">
          <label style={{ display: "flex" }}>
            <input
              type="checkbox"
              style={{ marginRight: "5px" }}
              checked={isChecked}
              readOnly={mode === "view"}
              onChange={() => {
                onCheck(symptom.id);
              }}
            />
            <span className="text-blue-1">
              <h5 style={{ marginBottom: "1px" }}>{symptom.name}</h5>
            </span>
          </label>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h4 className="card-title text-body">Triệu chứng đã có:</h4>
      <div className="row pt-3 pb-3">
        {dbSymps.map((symptom) => {
          return (
            <Symptom
              symptom={symptom}
              onCheck={() => onCheck(symptom.id, symptom.name)}
              isChecked={disease.symptomIds.includes(symptom.id)}
              key={symptom.id}
            />
          );
        })}
      </div>
    </div>
  );
}
