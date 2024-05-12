import React from "react";

export default function PatientFormDes({
  chosenSymp,
  patientForm,
  setPatientForm,
}) {
  const onCheck = (symptomId, descriptionId) => {
    if (
      patientForm.chosenDescs.some(
        (chosenDesc) => chosenDesc.descriptionId === descriptionId
      )
    ) {
      setPatientForm({
        ...patientForm,
        chosenDescs: patientForm.chosenDescs.filter(
          (chosenDesc) => chosenDesc.descriptionId !== descriptionId
        ),
      });
    } else {
      setPatientForm({
        ...patientForm,
        chosenDescs: [...patientForm.chosenDescs, { symptomId, descriptionId }],
      });
    }
  };

  return (
    <div className="row pt-3 pb-3">
      <div className="form-group row pb-4">
        <h4 className="card-title text-blue-1 fw-med text-center text-underline">
          Mô tả chi tiết triệu chứng {chosenSymp.name}
        </h4>
      </div>
      {chosenSymp.categories.map((category) => {
        return (
          <div key={category.id}>
            <div className="form row pt-3 pb-3">
              <h5 className="card-title text-blue-2 col-12 fw-med">
                {category.categoryName}
              </h5>
            </div>
            <div className="row">
              {category.descriptions.map((description) => (
                <div
                  key={description.id}
                  className="form-group pb-3 col-4"
                  style={{ display: "flex" }}
                >
                  <label className="d-flex">
                    <input
                      type="checkbox"
                      checked={patientForm.chosenDescs.some(
                        (chosenDesc) =>
                          chosenDesc.descriptionId === description.id
                      )}
                      style={{ marginRight: "5px" }}
                      onChange={() => onCheck(chosenSymp.id, description.id)}
                    />
                    <h5
                      className="fw-reg fs-18"
                      style={{ marginBottom: "0px" }}
                    >
                      {description.descriptionDetail}
                    </h5>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <hr className="pb-4" style={{ color: "#002c77" }} />
    </div>
  );
}
