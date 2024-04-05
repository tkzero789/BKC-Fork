import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const DiseaseSympDes = ({ disease, setDisease }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  useEffect(() => {
    async function getSymptoms() {
      const response = await fetch(
        `https://symptom-checker-with-mern-backend.onrender.com/symptom/`
      );
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const symptoms = await response.json();
      const selected = symptoms.filter((symptom) =>
        disease.symptoms.some(
          (diseaseSymptom) => diseaseSymptom._id === symptom._id
        )
      );
      setSelectedSymptoms(selected);
    }
    getSymptoms();
  }, [selectedSymptoms]);

  const [selectedDetails, setSelectedDetails] = useState([]);
  useEffect(() => {
    function updateForm() {
      if (disease.symptoms.length > 0) {
        const symptomList = disease.symptoms;
        const categoryList = symptomList.flatMap(
          (symptom) => symptom.categories
        );
        const descriptionList = categoryList.map(
          (category) => category.descriptions
        );
        const selectedBeforeDetails = descriptionList.flatMap((sublist) =>
          sublist.map((item) => item.descriptionDetail)
        );
        setSelectedDetails(selectedBeforeDetails);
      } else return;
    }
    updateForm();
    return;
  }, [selectedDetails.length]);

  const onCheck = (symptomId, categoryName, descriptionDetail) => {
    if (selectedDetails.includes(descriptionDetail)) {
      setSelectedDetails(
        selectedDetails.filter(
          (selectedDetail) => selectedDetail !== descriptionDetail
        )
      );
      const _disease = disease;
      const symptomIndex = _disease.symptoms.findIndex(
        (symptom) => symptom._id === symptomId
      );
      if (symptomIndex !== -1) {
        const categoryIndex = _disease.symptoms[
          symptomIndex
        ].categories.findIndex(
          (category) => category.categoryName === categoryName
        );
        if (categoryIndex !== -1) {
          _disease.symptoms[symptomIndex].categories[
            categoryIndex
          ].descriptions = _disease.symptoms[symptomIndex].categories[
            categoryIndex
          ].descriptions.filter(
            (description) => description.descriptionDetail !== descriptionDetail
          );
          _disease.symptoms[symptomIndex].categories = _disease.symptoms[
            symptomIndex
          ].categories.filter((category) => category.descriptions.length > 0);
        }
        setDisease(_disease);
      }
    } else {
      setSelectedDetails([...selectedDetails, descriptionDetail]);
      const _disease = disease;
      const symptomIndex = _disease.symptoms.findIndex(
        (symptom) => symptom._id === symptomId
      );
      const categoryIndex = disease.symptoms[symptomIndex].categories.findIndex(
        (category) => category.categoryName === categoryName
      );
      if (categoryIndex === -1) {
        _disease.symptoms[symptomIndex].categories.push({
          index: uuidv4(),
          categoryName: categoryName,
          descriptions: [
            {
              index: uuidv4(),
              descriptionDetail: descriptionDetail,
            },
          ],
        });
        setDisease(_disease);
      } else {
        _disease.symptoms[symptomIndex].categories[
          categoryIndex
        ].descriptions.push({
          index: uuidv4(),
          descriptionDetail: descriptionDetail,
        });
        setDisease(_disease);
      }
    }
  };

  const Symptom = (props) => {
    return (
      <div>
        <div className="form-group row pb-4">
          <h4 className="card-title text-blue-2 text-uppercase">
            MÔ TẢ CHI TIẾT TRIỆU CHỨNG {props.symptom.name}
          </h4>
        </div>
        {props.symptom.categories.map((category) => {
          return (
            <div key={category.index}>
              <div className="form row pt-3 pb-3">
                <h4 className="card-title text-blue-2 col-12 text-uppercase">
                  {category.categoryName}
                </h4>
              </div>
              <div className="row">
                {category.descriptions.map((description) => (
                  <div
                    className="form-group pb-3 col-4"
                    style={{ display: "flex" }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedDetails.includes(
                        description.descriptionDetail
                      )}
                      style={{ marginRight: "5px" }}
                      onChange={() =>
                        onCheck(
                          props.symptom._id,
                          category.categoryName,
                          description.descriptionDetail
                        )
                      }
                    />
                    <h5 className="text-blue-1" style={{ marginBottom: "0px" }}>
                      {description.descriptionDetail}
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <hr className="pb-4" style={{ color: "red" }} />
      </div>
    );
  };

  return (
    <div className="row pt-3 pb-3">
      {selectedSymptoms.map((symptom) => (
        <Symptom symptom={symptom} key={symptom._id} />
      ))}
    </div>
  );
};

export default DiseaseSympDes;
