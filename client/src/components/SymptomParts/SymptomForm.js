import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function SymptomForm({
  symptom,
  setSymptom,
  mode,
  origCats,
  origDescs,
}) {
  const categoryOptions = [
    { value: "Vị trí", label: "Vị trí" },
    { value: "Mức độ", label: "Mức độ" },
    { value: "Như thế nào", label: "Như thế nào" },
    {
      value: "Thời gian bị và tần suất xảy ra",
      label: "Thời gian bị và tần suất xảy ra",
    },
    {
      value: "Tình trạng trước kia và sự kiện dẫn đến",
      label: "Tình trạng trước kia và sự kiện dẫn đến",
    },
    {
      value: "Xảy ra hoặc tồi tệ hơn khi",
      label: "Xảy ra hoặc tồi tệ hơn khi",
    },
    { value: "Yếu tố làm thuyên giảm", label: "Yếu tố làm thuyên giảm" },
    { value: "Các triệu chứng đi kèm", label: "Các triệu chứng đi kèm" },
  ];

  const positionOptions = [
    { value: "Đầu", label: "Đầu" },
    { value: "Mắt", label: "Mắt" },
    { value: "Tai", label: "Tai" },
    { value: "Mũi", label: "Mũi" },
    { value: "Miệng", label: "Miệng" },
    { value: "Cổ", label: "Cổ" },
    { value: "Vai", label: "Vai" },
    { value: "Ngực", label: "Ngực" },
    { value: "Bụng", label: "Bụng" },
    { value: "Hông, đùi và mông", label: "Hông, đùi và mông" },
    { value: "Cánh tay", label: "Cánh tay" },
    { value: "Bàn tay", label: "Bàn tay" },
    { value: "Vùng dưới", label: "Vùng dưới" },
    { value: "Đầu gối", label: "Đầu gối" },
    { value: "Cẳng chân", label: "Cẳng chân" },
    { value: "Bàn chân", label: "Bàn chân" },
  ];

  function updateField(event) {
    setSymptom({ ...symptom, [event.target.name]: event.target.value });
  }

  function addCatField() {
    const newCat = {
      id: uuidv4(),
      categoryName: "Vị trí",
      descriptions: [
        {
          id: uuidv4(),
          descriptionDetail: "",
          descriptionImg: "",
        },
      ],
    };
    setSymptom({ ...symptom, categories: [...symptom.categories, newCat] });
  }

  function updateCatField(categoryId, event) {
    const cats = symptom.categories;
    const catIndex = cats.findIndex((cat) => cat.id === categoryId);
    const updatedCat = {
      ...cats[catIndex],
      [event.target.name]: event.target.value,
    };
    setSymptom({
      ...symptom,
      categories: [
        ...symptom.categories.slice(0, catIndex),
        updatedCat,
        ...symptom.categories.slice(catIndex + 1),
      ],
    });
  }

  function deleteCatField(categoryId) {
    setSymptom({
      ...symptom,
      categories: symptom.categories.filter((cat) => cat.id !== categoryId),
    });
  }

  function addDesField(categoryId) {
    const newDes = {
      id: uuidv4(),
      descriptionDetail: "",
      descriptionImg: "",
    };
    const cats = symptom.categories;
    const catIndex = cats.findIndex((cat) => cat.id === categoryId);
    const updatedCat = {
      ...cats[catIndex],
      descriptions: [...cats[catIndex].descriptions, newDes],
    };
    setSymptom({
      ...symptom,
      categories: [
        ...cats.slice(0, catIndex),
        updatedCat,
        ...cats.slice(catIndex + 1),
      ],
    });
  }

  function updateDesField(categoryId, descriptionId, event) {
    const cats = symptom.categories;
    const catIndex = cats.findIndex((cat) => cat.id === categoryId);
    const desIndex = cats[catIndex].descriptions.findIndex(
      (des) => des.id === descriptionId
    );
    const updatedCat = {
      ...cats[catIndex],
      descriptions: [
        ...cats[catIndex].descriptions.slice(0, desIndex),
        {
          ...cats[catIndex].descriptions[desIndex],
          [event.target.name]: event.target.value,
        },
        ...cats[catIndex].descriptions.slice(desIndex + 1),
      ],
    };
    setSymptom({
      ...symptom,
      categories: [
        ...cats.slice(0, catIndex),
        updatedCat,
        ...cats.slice(catIndex + 1),
      ],
    });
  }

  const deleteDesField = (categoryId, descriptionId) => {
    const cats = symptom.categories;
    const catIndex = cats.findIndex((cat) => cat.id === categoryId);
    const updatedDescriptions = cats[catIndex].descriptions.filter(
      (des) => des.id !== descriptionId
    );
    if (updatedDescriptions.length === 0) {
      setSymptom({
        ...symptom,
        categories: symptom.categories.filter((cat) => cat.id !== categoryId),
      });
    } else {
      const updatedCat = {
        ...cats[catIndex],
        descriptions: updatedDescriptions,
      };
      setSymptom({
        ...symptom,
        categories: [
          ...cats.slice(0, catIndex),
          updatedCat,
          ...cats.slice(catIndex + 1),
        ],
      });
    }
  };

  return (
    <div>
      <div className="form-group row pb-5">
        <h4 className="card-title text-body col-3">Tên triệu chứng:</h4>
        <input
          type="text"
          className="form-control border-primary col border-dark-subtle shadow-sm"
          name="name"
          value={symptom.name}
          placeholder="Nhập tên triệu chứng"
          disabled={mode === "view" || mode === "doctor edit"}
          onChange={(e) => updateField(e)}
        />
      </div>
      <div className="form-group row pb-5">
        <h4 className="card-title text-body col-3">Vị trí trên mô hình:</h4>
        <select
          name="position"
          value={symptom.position}
          className="form-select border-primary col border-dark-subtle shadow-sm"
          disabled={mode === "view" || mode === "doctor edit"}
          onChange={(e) => updateField(e)}
        >
          {positionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <h4 className="card-title text-body">Thêm mô tả chi tiết:</h4>
      {symptom.categories.map((cat) => {
        return (
          <div key={cat.id}>
            <div className="form row pb-3 mt-5">
              <div className="col-2" style={{ display: "flex" }}>
                {(mode === "create" ||
                  mode === "admin edit" ||
                  (mode === "doctor edit" && !origCats.includes(cat.id))) && (
                  <i
                    class="btn py-0 px-0 bi bi-file-minus"
                    style={{ color: "#000", marginRight: "5px" }}
                    onClick={() => deleteCatField(cat.id)}
                  ></i>
                )}
                <h5 className="text-body">Thuộc tính:</h5>
              </div>
              <select
                name="categoryName"
                value={cat.categoryName}
                className="form-select border-secondary col"
                disabled={
                  mode === "view" ||
                  (mode === "doctor edit" && origCats.includes(cat.id))
                }
                onChange={(e) => updateCatField(cat.id, e)}
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              {cat.descriptions.map((desc) => (
                <div
                  className="form-group pb-3 col-12"
                  style={{ display: "flex" }}
                >
                  {(mode === "create" ||
                    mode === "admin edit" ||
                    (mode === "doctor edit" &&
                      !origDescs.includes(desc.id))) && (
                    <i
                      class="btn py-0 px-0 bi bi-file-minus"
                      style={{ color: "#000", marginRight: "5px" }}
                      onClick={() => deleteDesField(cat.id, desc.id)}
                    ></i>
                  )}
                  <input
                    name="descriptionDetail"
                    value={desc.descriptionDetail}
                    type="text"
                    className="form-control border border-dark-subtle shadow-sm rounded "
                    placeholder="Nhập mô tả"
                    disabled={
                      mode === "view" ||
                      (mode === "doctor edit" && origDescs.includes(desc.id))
                    }
                    onChange={(e) => updateDesField(cat.id, desc.id, e)}
                  />
                </div>
              ))}
            </div>
            {(mode === "create" || mode === "doctor edit") && (
              <div className="row justify-content-center">
                <div className="col-1 rounded-5 btn btn-light border-secondary-subtle border-0 py-0 px-0">
                  <div onClick={() => addDesField(cat.id)}>
                    <i class="text-secondary fs-3 bi bi-plus-circle"></i>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
      {(mode === "create" || mode === "doctor edit") && (
        <div
          onClick={addCatField}
          className="btn btn-secondary bg-gradient mt-5"
        >
          Thêm thuộc tính
        </div>
      )}
    </div>
  );
}
