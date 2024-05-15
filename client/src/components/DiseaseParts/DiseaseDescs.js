import React from "react";

export default function DiseaseDescs({
  disease,
  setDisease,
  chosenSymp,
  mode,
}) {
  function onCheck(symptomId, descriptionId) {
    if (disease.descIds.some((desc) => desc.descriptionId === descriptionId)) {
      setDisease({
        ...disease,
        descIds: disease.descIds.filter(
          (desc) => desc.descriptionId !== descriptionId
        ),
      });
    } else {
      setDisease({
        ...disease,
        descIds: [...disease.descIds, { symptomId, descriptionId }],
      });
    }
  }

  return (
    <div className="row pt-3 pb-3">
      <div className="form-group row pb-4">
        <h4 className="card-title text-blue-2">
          Mô tả chi tiết triệu chứng {chosenSymp.name}
        </h4>
      </div>
      {chosenSymp.categories.map((category) => {
        return (
          <div key={category.id}>
            <div className="form row pt-3 pb-3">
              <h4 className="card-title text-blue-2 col-12">
                {category.categoryName}
              </h4>
            </div>
            <div className="row">
              {category.descriptions.map((description) => (
                <div className="form pb-3 col-4" key={description.id}>
                  <lable style={{ display: "flex" }}>
                    <input
                      type="checkbox"
                      checked={disease.descIds.some(
                        (desc) => desc.descriptionId === description.id
                      )}
                      style={{ marginRight: "5px" }}
                      readOnly={mode === "view"}
                      onChange={() => {
                        onCheck(chosenSymp.id, description.id);
                      }}
                    />
                    <span className="text-blue-1">
                      <h5 style={{ marginBottom: "0px" }}>
                        {description.descriptionDetail}
                      </h5>
                    </span>
                  </lable>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
