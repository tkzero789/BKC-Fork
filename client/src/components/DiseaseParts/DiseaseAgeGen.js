import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

const DiseaseAgeGen = ({ disease, setDisease }) => {
  const ageRanges = [
    "Mọi độ tuổi",
    "Dưới 1 tuổi",
    "1 tuổi - 5 tuổi",
    "6 tuổi - 12 tuổi",
    "13 tuổi - 16 tuổi",
    "17 tuổi - 29 tuổi",
    "30 tuổi - 39 tuổi",
    "40 tuổi - 49 tuổi",
    "50 tuổi - 64 tuổi",
    "Trên 65 tuổi",
  ];
  const genders = ["Cả nam và nữ", "Nam", "Nữ"];
  const [chosenAges, setChosenAges] = useState([]);
  const [chosenGens, setChosenGens] = useState([]);

  // check form status if user click back button
  useEffect(() => {
    if (disease.ageRanges.length > 0) {
      setChosenAges([...disease.ageRanges]);
    }
    if (disease.genders.length > 0) {
      setChosenGens([...disease.genders]);
    }
  }, []);

  // display age chosen
  const checkAgeRangeField = (checkingAgeRange) => {
    if (chosenAges.includes(checkingAgeRange)) {
      setChosenAges(
        chosenAges.filter((ageRange) => ageRange !== checkingAgeRange)
      );
    } else {
      setChosenAges([...chosenAges, checkingAgeRange]);
    }
  };

  // update disease ageRanges
  useEffect(() => {
    setDisease({ ...disease, ageRanges: chosenAges });
  }, [chosenAges]);

  // display gender chosen
  const checkGenderField = (checkingGender) => {
    if (chosenGens.includes(checkingGender)) {
      setChosenGens(chosenGens.filter((gender) => gender !== checkingGender));
    } else {
      setChosenGens([...chosenGens, checkingGender]);
    }
  };

  // update disease genders
  useEffect(() => {
    setDisease({ ...disease, genders: chosenGens });
  }, [chosenGens]);

  return (
    <div>
      <div className="pb-5 text-center">
        <h4 className="text-blue-1 fw-med">
          CHỌN ĐỘ TUỔI VÀ GIỚI TÍNH CÓ THỂ MẮC PHẢI
        </h4>
      </div>
      <div className="px-5">
        <div className="form-group row pb-5">
          <h5 className="col-2 fw-med text-blue-2">Độ tuổi</h5>
          <div className="col-3">
            <Dropdown className=" col-12" autoClose={true}>
              <Dropdown.Toggle className="form-select blue-border-1 col-12 fw-reg">
                Độ tuổi
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {ageRanges.map((ageRange) => (
                  <Dropdown.Item>
                    <label className="text-blue-1">
                      <input
                        type="checkbox"
                        style={{ marginRight: "5px" }}
                        checked={chosenAges.includes(ageRange)}
                        onChange={() => checkAgeRangeField(ageRange)}
                      />
                      {ageRange}
                    </label>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="form-group row pb-5">
          <h5 className="col-2 fw-med text-blue-2">Giới tính</h5>
          <div className="col-3">
            <Dropdown className=" col-12" autoClose={true}>
              <Dropdown.Toggle className="form-select blue-border-1 col-12 fw-reg">
                Giới tính
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {genders.map((gender) => (
                  <Dropdown.Item>
                    <label className="text-blue-1">
                      <input
                        type="checkbox"
                        style={{ marginRight: "5px" }}
                        checked={chosenGens.includes(gender)}
                        onChange={() => checkGenderField(gender)}
                      />
                      {gender}
                    </label>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseAgeGen;
