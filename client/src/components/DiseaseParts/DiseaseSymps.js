import React, { useState } from "react";
import SearchBarSymp from "../SearchBarSymp/SearchBarSymp";
import removeAccents from "remove-accents";

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

  const Symptom = ({ symptom, isChecked, onCheck }) => {
    return (
      <div className="c-2 pb-3">
        <div className="form">
          <label className="d-flex align-items-center">
            <input
              type="checkbox"
              style={{ marginRight: "5px" }}
              checked={isChecked}
              readOnly={mode === "view"}
              onChange={() => {
                onCheck(symptom.id);
              }}
            />
            <p className="text-black-1">
              <span>{symptom.name}</span>
            </p>
          </label>
        </div>
      </div>
    );
  };

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Filter symptoms based on search term
  const filteredSymps = dbSymps.filter((symptom) =>
    removeAccents(symptom.name)
      .toLowerCase()
      .includes(removeAccents(searchTerm).toLowerCase())
  );

  // Clear the search
  const [displaySearch, setDisplaySearch] = useState(false);

  return (
    <div>
      <div className="w-100">
        <h5 className="card-title text-body mb-4">Triệu chứng đã có:</h5>
        <SearchBarSymp
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          displaySearch={displaySearch}
          setDisplaySearch={setDisplaySearch}
          filteredSymps={filteredSymps}
          onCheck={onCheck}
          chosenSymps={disease.symptomsIds}
        />
      </div>
      <div className="d-flex flex-wrap pt-3 pb-3">
        {filteredSymps.map((symptom) => {
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
      <div>
        <h5>Các triệu chứng đã chọn:</h5>
        {disease.symptomIds.length > 0 && (
          <div className="ad-chosen-symp">
            {disease.symptomIds.map((id) => {
              const symptom = dbSymps.find((symptom) => symptom.id === id);
              return symptom ? (
                <div
                  key={id}
                  className="d-flex border-bottom border-secondary-subtle mb-3"
                >
                  <p>{symptom.name}</p>
                  <button className="ms-auto" onClick={() => onCheck(id)}>
                    <i className="bi bi-trash3-fill"></i>
                  </button>
                </div>
              ) : null;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
