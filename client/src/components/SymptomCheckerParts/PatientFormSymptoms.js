import { useState, useRef, useEffect } from "react";
import removeAccents from "remove-accents";

import MaleFigure from "../../components/MaleFigure/MaleFigure";
import FemaleFigure from "../FemaleFigure/FemaleFigure";
import "../../css/sympchecker.css";
import MobileFemaleFigure from "../FemaleFigure/MobileFemaleFigure";
import MobileMaleFigure from "../MaleFigure/MobileMaleFigure";
import { MobileSympBtn } from "../MobileSympBtn/MobileSympBtn";
import Symptom from "../Symptom/Symptom";
import SearchBarSymp from "../SearchBarSymp/SearchBarSymp";
import SelectedSympBox from "../SelectedSympBox/SelectedSympBox";
import MobileSelectedSympBox from "../SelectedSympBox/MobileSelectedSympBox";
import MobileSearchBarSymp from "../SearchBarSymp/MobileSearchBarSymp";
import WholeHeadSymp from "../WholeHeadSymp/WholeHeadSymp";
import { ExtraMobileSympBtn } from "../MobileSympBtn/ExtraMobileSympBtn";
import MobileSymptom from "../Symptom/MobileSymptom";

export default function PatientFormSymptoms({
  dbSymps,
  patientForm,
  setPatientForm,
}) {
  const onCheck = (symptomId) => {
    if (patientForm.chosenSymps.includes(symptomId)) {
      setPatientForm({
        ...patientForm,
        chosenSymps: patientForm.chosenSymps.filter(
          (chosenId) => chosenId !== symptomId
        ),
        chosenDescs: patientForm.chosenDescs.filter(
          (chosenDesc) => chosenDesc.symptomId !== symptomId
        ),
      });
    } else {
      setPatientForm({
        ...patientForm,
        chosenSymps: [...patientForm.chosenSymps, symptomId],
      });
    }
  };

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Filter symptoms based on search term
  const filteredSymps = dbSymps.filter((symptom) =>
    removeAccents(symptom.name)
      .toLowerCase()
      .includes(removeAccents(searchTerm).toLowerCase())
  );

  // Delele selected symptoms
  const handleDelete = (event, symptomId) => {
    event.preventDefault();
    setPatientForm({
      ...patientForm,
      chosenSymps: patientForm.chosenSymps.filter(
        (chosenId) => chosenId !== symptomId
      ),
      chosenDescs: patientForm.chosenDescs.filter(
        (chosenDesc) => chosenDesc.symptomId !== symptomId
      ),
    });
  };

  // Click outside to close search result (selected-symp-box)
  const inputRef = useRef();
  const searchSympRef = useRef();
  const [displaySearch, setDisplaySearch] = useState(false);

  const handleClickOutside = (event) => {
    if (
      searchSympRef.current &&
      !searchSympRef.current.contains(event.target) &&
      inputRef.current &&
      !inputRef.current.contains(event.target)
    ) {
      setDisplaySearch(false);
    }
  };

  // ********** Human figure **********
  // Ref
  const headRef = useRef(); // 1. Head
  const eyesRef = useRef(); // 2. Eyes
  const earsRef = useRef(); // 3. Ears
  const noseRef = useRef(); // 4. Nose
  const mouthRef = useRef(); // 5. Mouth
  const neckRef = useRef(); // 6. Neck
  const chestRef = useRef(); // 7. Chest
  const upperArmRef = useRef(); // 8. UpperArm
  const foreArmRef = useRef(); // 9. ForeArm
  const midAbRef = useRef(); // 10. MidAb
  const lowerAbRef = useRef(); // 11. LowerAbPrivate
  const handRef = useRef(); // 12. Hand
  const thighRef = useRef(); // 13. Thigh
  const kneeRef = useRef(); // 14. Knee
  const lowerLegRef = useRef(); // 15. LowerLeg
  const footRef = useRef(); // 16. Foot

  // For displaying symptoms box next to figure
  const [showHeadSymptoms, setShowHeadSymptoms] = useState(false); // 1. Head
  const [showEyesSymptoms, setShowEyesSymptoms] = useState(false); // 2. Eyes
  const [showEarsSymptoms, setShowEarsSymptoms] = useState(false); // 3. Ears
  const [showNoseSymptoms, setShowNoseSymptoms] = useState(false); // 4. Nose
  const [showMouthSymptoms, setShowMouthSymptoms] = useState(false); // 5. Mouth
  const [showNeckSymptoms, setShowNeckSymptoms] = useState(false); // 6. Neck
  const [showChestSymptoms, setShowChestSymptoms] = useState(false); // 7. Chest
  const [showUpperArmSymptoms, setShowUpperArmSymptoms] = useState(false); // 8. UpperArm
  const [showForeArmSymptoms, setShowForeArmSymptoms] = useState(false); // 9. Forearm
  const [showMidAbSymptoms, setShowMidAbSymptoms] = useState(false); // 10 MidAb
  const [showLowerAbSymptoms, setShowLowerAbSymptoms] = useState(false); // 11. LowerAbPrivate
  const [showHandSymptoms, setShowHandSymptoms] = useState(); // 12. Hand
  const [showThighSymptoms, setShowThighSymptoms] = useState(); // 13. Thigh
  const [showKneeSymptoms, setShowKneeSymptoms] = useState(); // 14. Knee
  const [showLowerLegSymptoms, setShowLowerLegSymptoms] = useState(); // 15. LowerLeg
  const [showFootSymptoms, setShowFootSymptoms] = useState(); // 16. Foot

  // Click outside to close symptoms box next to figure
  useEffect(() => {
    const handleClickOutside = (event) => {
      const closeSymptoms = (ref, setShowSymptoms) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowSymptoms(false);
        }
      };

      closeSymptoms(headRef, setShowHeadSymptoms); // 1. Head
      closeSymptoms(eyesRef, setShowEyesSymptoms); // 2. Eyes
      closeSymptoms(earsRef, setShowEarsSymptoms); // 3. Ears
      closeSymptoms(noseRef, setShowNoseSymptoms); // 4. Nose
      closeSymptoms(mouthRef, setShowMouthSymptoms); // 5. Mouth
      closeSymptoms(neckRef, setShowNeckSymptoms); // 6. Neck
      closeSymptoms(chestRef, setShowChestSymptoms); // 7. Chest
      closeSymptoms(upperArmRef, setShowUpperArmSymptoms); // 8. UpperArm
      closeSymptoms(foreArmRef, setShowForeArmSymptoms); // 9. Forearm
      closeSymptoms(midAbRef, setShowMidAbSymptoms); // 10 MidAb
      closeSymptoms(lowerAbRef, setShowLowerAbSymptoms); // 11.LowerAbPrivate
      closeSymptoms(handRef, setShowHandSymptoms); // 12. Hand
      closeSymptoms(thighRef, setShowThighSymptoms); // 13. Thigh
      closeSymptoms(kneeRef, setShowKneeSymptoms); // 14. Knee
      closeSymptoms(lowerLegRef, setShowLowerLegSymptoms); // 15. LowerLeg
      closeSymptoms(footRef, setShowFootSymptoms); // 16. Foot
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Clean up
    };
  }, []);

  // Toggle symptoms box next to figure ************
  const toggleHeadSymptoms = () => {
    setShowHeadSymptoms(!showHeadSymptoms); // 1. Head
  };
  const toggleEyesSymptoms = () => {
    setShowEyesSymptoms(!showEyesSymptoms); // 2. Eyes
  };
  const toggleEarsSymptoms = () => {
    setShowEarsSymptoms(!showEarsSymptoms); // 3. Ears
  };
  const toggleNoseSymptoms = () => {
    setShowNoseSymptoms(!showNoseSymptoms); // 4. Nose
  };
  const toggleMouthSymptoms = () => {
    setShowMouthSymptoms(!showMouthSymptoms); // 5. Mouth
  };
  const toggleNeckSymptoms = () => {
    setShowNeckSymptoms(!showNeckSymptoms); // 6. Neck
  };
  const toggleChestSymptoms = () => {
    setShowChestSymptoms(!showChestSymptoms); // 7. Chest
  };
  const toggleUpperArmSymptoms = () => {
    setShowUpperArmSymptoms(!showUpperArmSymptoms); // 8. UpperArm
  };
  const toggleForeArmSymptoms = () => {
    setShowForeArmSymptoms(!showForeArmSymptoms); // 9. ForeArm
  };
  const toggleMidAbSymptoms = () => {
    setShowMidAbSymptoms(!showMidAbSymptoms); // 10. MidAb
  };
  const toggleLowerAbSymptoms = () => {
    setShowLowerAbSymptoms(!showLowerAbSymptoms); // 11. LowerAbPrivate
  };
  const toggleHandSymptoms = () => {
    setShowHandSymptoms(!showHandSymptoms); // 12. Hand
  };
  const toggleThighSymptoms = () => {
    setShowThighSymptoms(!showThighSymptoms); // 13. Thigh
  };
  const toggleKneeSymptoms = () => {
    setShowKneeSymptoms(!showKneeSymptoms); // 14. Knee
  };
  const toggleLowerLegSymptoms = () => {
    setShowLowerLegSymptoms(!showLowerLegSymptoms); // 15. LowerLeg
  };
  const toggleFootSymptoms = () => {
    setShowFootSymptoms(!showFootSymptoms); // 16. Foot
  };

  // Click outside of search bar and search results box to close search results
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setDisplaySearch(true);
    } else {
      setDisplaySearch(false);
    }
  }, [searchTerm]);

  // ********** Mobile Figure **********

  // State for mobile
  const [wholeHeadM, setWholeHeadM] = useState(false);
  const [neckM, setNeckM] = useState(false);
  const [chestM, setChestM] = useState(false);
  const [upperArmM, setUpperArmM] = useState(false);
  const [foreArmM, setForeArmM] = useState(false);
  const [midAbM, setMidAbM] = useState(false);
  const [lowerAbM, setLowerAbM] = useState(false);
  const [handM, setHandM] = useState(false);
  const [thighM, setThighM] = useState(false);
  const [kneeM, setKneeM] = useState(false);
  const [lowerLegM, setLowerLegM] = useState(false);
  const [footM, setFootM] = useState(false);

  // State for render full screen search on mobile
  const [isAddClick, setIsAddClick] = useState(false);

  // States for wholeHead
  const [extraM, setExtraM] = useState(false);
  const [extraHeadM, setExtraHeadM] = useState(false);
  const [extraEyesM, setExtraEyesM] = useState(false);
  const [extraEarsM, setExtraEarsM] = useState(false);
  const [extraNoseM, setExtraNoseM] = useState(false);
  const [extraMouthM, setExtraMouthM] = useState(false);

  // Toggle for wholeHead (extraM, extraHeadM ... extraMouthM)
  const toggleExtraM = () => {
    setExtraM(!extraM);
    setExtraHeadM(false);
    setExtraEyesM(false);
    setExtraEarsM(false);
    setExtraNoseM(false);
    setExtraMouthM(false);
  };

  const toggleExtraHeadM = () => {
    setExtraHeadM(!extraHeadM);
    setExtraM(!extraM);
  };

  const toggleExtraEyesM = () => {
    setExtraEyesM(!extraEyesM);
    setExtraM(!extraM);
  };

  const toggleExtraEarsM = () => {
    setExtraEarsM(!extraEarsM);
    setExtraM(!extraM);
  };

  const toggleExtraNoseM = () => {
    setExtraNoseM(!extraNoseM);
    setExtraM(!extraM);
  };

  const toggleExtraMouthM = () => {
    setExtraMouthM(!extraMouthM);
    setExtraM(!extraM);
  };

  // Toggle for isAddClick
  const toggleIsAddClick = () => {
    setIsAddClick(!isAddClick);
  };

  // Toggle for mobile
  const toggleWholeHeadM = () => {
    setWholeHeadM(!wholeHeadM);
    setExtraM(false);
    setExtraHeadM(false);
    setExtraEyesM(false);
    setExtraEarsM(false);
    setExtraNoseM(false);
    setExtraMouthM(false);
  };

  const toggleNeckM = () => {
    setNeckM(!neckM);
    setExtraM(false);
  };

  const toggleChestM = () => {
    setChestM(!chestM);
  };

  const toggleUpperArmM = () => {
    setUpperArmM(!upperArmM);
  };

  const toggleForeArmM = () => {
    setForeArmM(!foreArmM);
  };

  const toggleMidAbM = () => {
    setMidAbM(!midAbM);
  };

  const toggleLowerAbM = () => {
    setLowerAbM(!lowerAbM);
  };

  const toggleHandM = () => {
    setHandM(!handM);
  };

  const toggleThighM = () => {
    setThighM(!thighM);
  };

  const toggleKneeM = () => {
    setKneeM(!kneeM);
  };

  const toggleLowerLegM = () => {
    setLowerLegM(!lowerLegM);
  };

  const toggleFootM = () => {
    setFootM(!footM);
  };

  const [isVisibleM, setIsVisibleM] = useState(false);
  const [isSwitch, setIsSwitch] = useState(true);
  // Toggle Search Bar button (left)
  const toggleSearchBar = (e) => {
    e.preventDefault();
    setIsVisibleM(false);
    setIsSwitch(true);
  };

  // Toggle Figure figure button (right)
  const toggleMobileFigure = (e) => {
    e.preventDefault();
    setIsVisibleM(true);
    setIsSwitch(false);
  };

  // The UI
  return (
    <div>
      <div className="pb-2 pb-md-5 text-center">
        <h4 className="text-blue-1 fw-med">
          Hãy chọn triệu chứng mà bạn đang gặp phải
        </h4>
      </div>
      <h5 className="card-title text-blue-1 fw-med text-blue-2">
        Tìm kiếm các triệu chứng
      </h5>
      <div className="switch-button">
        <button
          onClick={toggleSearchBar}
          className={`${isSwitch ? "active-switch-button" : ""}`}
        >
          Tìm kiếm
        </button>
        <button
          onClick={toggleMobileFigure}
          className={`${isSwitch ? "" : "active-switch-button"}`}
        >
          Chọn trên hình
        </button>
      </div>
      <div className="symp-big-box">
        <div className="big-box-wrapper">
          {/* Left box */}
          <div className="symp-left-box">
            <div className="left-box-wrapper">
              {/* Search Bar */}
              <SearchBarSymp
                inputRef={inputRef}
                searchSympRef={searchSympRef}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                displaySearch={displaySearch}
                setDisplaySearch={setDisplaySearch}
                filteredSymps={filteredSymps}
                onCheck={onCheck}
                chosenSymps={patientForm.chosenSymps}
              />
              {/* Display selected symptoms */}
              <SelectedSympBox
                patientForm={patientForm}
                dbSymps={dbSymps}
                handleDelete={handleDelete}
              />
            </div>
          </div>
          {/* Right box */}
          <div className="symp-right-box">
            <div className="right-box-wrapper">
              <div className="human-figure">
                {patientForm.gender === "Nữ" && (
                  <FemaleFigure
                    toggleHeadSymptoms={toggleHeadSymptoms}
                    toggleEyesSymptoms={toggleEyesSymptoms}
                    toggleEarsSymptoms={toggleEarsSymptoms}
                    toggleNoseSymptoms={toggleNoseSymptoms}
                    toggleMouthSymptoms={toggleMouthSymptoms}
                    toggleNeckSymptoms={toggleNeckSymptoms}
                    toggleChestSymptoms={toggleChestSymptoms}
                    toggleUpperArmSymptoms={toggleUpperArmSymptoms}
                    toggleForeArmSymptoms={toggleForeArmSymptoms}
                    toggleMidAbSymptoms={toggleMidAbSymptoms}
                    toggleLowerAbSymptoms={toggleLowerAbSymptoms}
                    toggleHandSymptoms={toggleHandSymptoms}
                    toggleThighSymptoms={toggleThighSymptoms}
                    toggleKneeSymptoms={toggleKneeSymptoms}
                    toggleLowerLegSymptoms={toggleLowerLegSymptoms}
                    toggleFootSymptoms={toggleFootSymptoms}
                  />
                )}
                {patientForm.gender === "Nam" && (
                  <MaleFigure
                    toggleHeadSymptoms={toggleHeadSymptoms}
                    toggleEyesSymptoms={toggleEyesSymptoms}
                    toggleEarsSymptoms={toggleEarsSymptoms}
                    toggleNoseSymptoms={toggleNoseSymptoms}
                    toggleMouthSymptoms={toggleMouthSymptoms}
                    toggleNeckSymptoms={toggleNeckSymptoms}
                    toggleChestSymptoms={toggleChestSymptoms}
                    toggleUpperArmSymptoms={toggleUpperArmSymptoms}
                    toggleForeArmSymptoms={toggleForeArmSymptoms}
                    toggleMidAbSymptoms={toggleMidAbSymptoms}
                    toggleLowerAbSymptoms={toggleLowerAbSymptoms}
                    toggleHandSymptoms={toggleHandSymptoms}
                    toggleThighSymptoms={toggleThighSymptoms}
                    toggleKneeSymptoms={toggleKneeSymptoms}
                    toggleLowerLegSymptoms={toggleLowerLegSymptoms}
                    toggleFootSymptoms={toggleFootSymptoms}
                  />
                )}
                {/* 1. Head */}
                {showHeadSymptoms && (
                  <div ref={headRef} className="head-symptoms-list">
                    {dbSymps
                      .filter(
                        (symptom) =>
                          symptom.position === "Đầu" &&
                          !patientForm.chosenSymps.includes(symptom.id)
                      )
                      .map((symptom) => (
                        <Symptom
                          symptom={symptom}
                          onCheck={onCheck}
                          key={symptom.id}
                        />
                      ))}
                  </div>
                )}
                {/* 2. Eyes */}
                {showEyesSymptoms && (
                  <div ref={eyesRef} className="eyes-symptoms-list">
                    {dbSymps
                      .filter(
                        (symptom) =>
                          symptom.position === "Mắt" &&
                          !patientForm.chosenSymps.includes(symptom.id)
                      )
                      .map((symptom) => (
                        <Symptom
                          symptom={symptom}
                          onCheck={onCheck}
                          key={symptom.id}
                        />
                      ))}
                  </div>
                )}
                {/* 3. Ears */}
                {showEarsSymptoms && (
                  <div ref={earsRef} className="ears-symptoms-list">
                    {dbSymps
                      .filter(
                        (symptom) =>
                          symptom.position === "Tai" &&
                          !patientForm.chosenSymps.includes(symptom.id)
                      )
                      .map((symptom) => (
                        <Symptom
                          symptom={symptom}
                          onCheck={onCheck}
                          key={symptom.id}
                        />
                      ))}
                  </div>
                )}
                {/* 4. Nose */}
                {showNoseSymptoms && (
                  <div ref={noseRef} className="nose-symptoms-list">
                    {dbSymps
                      .filter(
                        (symptom) =>
                          symptom.position === "Mũi" &&
                          !patientForm.chosenSymps.includes(symptom.id)
                      )
                      .map((symptom) => (
                        <Symptom
                          symptom={symptom}
                          onCheck={onCheck}
                          key={symptom.id}
                        />
                      ))}
                  </div>
                )}
                {/* 5. Mouth */}
                {showMouthSymptoms && (
                  <div ref={mouthRef} className="mouth-symptoms-list">
                    {dbSymps
                      .filter(
                        (symptom) =>
                          symptom.position === "Miệng" &&
                          !patientForm.chosenSymps.includes(symptom.id)
                      )
                      .map((symptom) => (
                        <Symptom
                          symptom={symptom}
                          onCheck={onCheck}
                          key={symptom.id}
                        />
                      ))}
                  </div>
                )}
                {/* 6. Neck */}
                {showNeckSymptoms && (
                  <div ref={neckRef} className="neck-symptoms-list">
                    {dbSymps
                      .filter(
                        (symptom) =>
                          symptom.position === "Cổ" &&
                          !patientForm.chosenSymps.includes(symptom.id)
                      )
                      .map((symptom) => (
                        <Symptom
                          symptom={symptom}
                          onCheck={onCheck}
                          key={symptom.id}
                        />
                      ))}
                  </div>
                )}
                {/* 7. Chest */}
                {showChestSymptoms && (
                  <div ref={chestRef} className="chest-symptoms-list">
                    {dbSymps
                      .filter(
                        (symptom) =>
                          symptom.position === "Ngực" &&
                          !patientForm.chosenSymps.includes(symptom.id)
                      )
                      .map((symptom) => (
                        <Symptom
                          symptom={symptom}
                          onCheck={onCheck}
                          key={symptom.id}
                        />
                      ))}
                  </div>
                )}
                {/* 8. UpperArm */}
                {showUpperArmSymptoms && (
                  <div ref={upperArmRef} className="upperArm-symptoms-list">
                    {dbSymps
                      .filter(
                        (symptom) =>
                          symptom.position === "Vai" &&
                          !patientForm.chosenSymps.includes(symptom.id)
                      )
                      .map((symptom) => (
                        <Symptom
                          symptom={symptom}
                          onCheck={onCheck}
                          key={symptom.id}
                        />
                      ))}
                  </div>
                )}
                {/* 9. ForeArm */}
                {showForeArmSymptoms && (
                  <div ref={foreArmRef} className="foreArm-symptoms-list">
                    {dbSymps
                      .filter(
                        (symptom) =>
                          symptom.position === "Cánh tay" &&
                          !patientForm.chosenSymps.includes(symptom.id)
                      )
                      .map((symptom) => (
                        <Symptom
                          symptom={symptom}
                          onCheck={onCheck}
                          key={symptom.id}
                        />
                      ))}
                  </div>
                )}
                {/* 10. MidAb */}
                {showMidAbSymptoms && (
                  <div ref={midAbRef} className="midAb-symptoms-list">
                    {dbSymps
                      .filter(
                        (symptom) =>
                          symptom.position === "Bụng" &&
                          !patientForm.chosenSymps.includes(symptom.id)
                      )
                      .map((symptom) => (
                        <Symptom
                          symptom={symptom}
                          onCheck={onCheck}
                          key={symptom.id}
                        />
                      ))}
                  </div>
                )}
                {/* 11. LowerAbPrivate */}
                {showLowerAbSymptoms && (
                  <div
                    ref={lowerAbRef}
                    className="lowerAbPrivate-symptoms-list"
                  >
                    {dbSymps
                      .filter(
                        (symptom) =>
                          symptom.position === "Vùng dưới" &&
                          !patientForm.chosenSymps.includes(symptom.id)
                      )
                      .map((symptom) => (
                        <Symptom
                          symptom={symptom}
                          onCheck={onCheck}
                          key={symptom.id}
                        />
                      ))}
                  </div>
                )}
                {/* 12. Hand */}
                {showHandSymptoms && (
                  <div ref={handRef} className="hand-symptoms-list">
                    {dbSymps
                      .filter(
                        (symptom) =>
                          symptom.position === "Bàn tay" &&
                          !patientForm.chosenSymps.includes(symptom.id)
                      )
                      .map((symptom) => (
                        <Symptom
                          symptom={symptom}
                          onCheck={onCheck}
                          key={symptom.id}
                        />
                      ))}
                  </div>
                )}
                {/* 13. Thigh */}
                {showThighSymptoms && (
                  <div ref={thighRef} className="thigh-symptoms-list">
                    {dbSymps
                      .filter(
                        (symptom) =>
                          symptom.position === "Hông, đùi và mông" &&
                          !patientForm.chosenSymps.includes(symptom.id)
                      )
                      .map((symptom) => (
                        <Symptom
                          symptom={symptom}
                          onCheck={onCheck}
                          key={symptom.id}
                        />
                      ))}
                  </div>
                )}
                {/* 14. Knee */}
                {showKneeSymptoms && (
                  <div ref={kneeRef} className="knee-symptoms-list">
                    {dbSymps
                      .filter(
                        (symptom) =>
                          symptom.position === "Đầu gối" &&
                          !patientForm.chosenSymps.includes(symptom.id)
                      )
                      .map((symptom) => (
                        <Symptom
                          symptom={symptom}
                          onCheck={onCheck}
                          key={symptom.id}
                        />
                      ))}
                  </div>
                )}
                {/* 15. LowerLeg */}
                {showLowerLegSymptoms && (
                  <div ref={lowerLegRef} className="lowerLeg-symptoms-list">
                    {dbSymps
                      .filter(
                        (symptom) =>
                          symptom.position === "Cẳng chân" &&
                          !patientForm.chosenSymps.includes(symptom.id)
                      )
                      .map((symptom) => (
                        <Symptom
                          symptom={symptom}
                          onCheck={onCheck}
                          key={symptom.id}
                        />
                      ))}
                  </div>
                )}
                {/* 16. Foot */}
                {showFootSymptoms && (
                  <div ref={footRef} className="foot-symptoms-list">
                    {dbSymps
                      .filter(
                        (symptom) =>
                          symptom.position === "Bàn chân" &&
                          !patientForm.chosenSymps.includes(symptom.id)
                      )
                      .map((symptom) => (
                        <Symptom
                          symptom={symptom}
                          onCheck={onCheck}
                          key={symptom.id}
                        />
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Add Symptoms Button */}
      <div
        className="mobile-add-symp-wrapper"
        style={{
          display: isVisibleM ? "none" : "",
          pointerEvents: isVisibleM ? "none" : "auto",
        }}
      >
        <div className="add-symp-btn">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleIsAddClick();
            }}
          >
            <span>Thêm triệu chứng</span>
            <i className="bi bi-plus-circle-fill"></i>
          </button>
          {isAddClick && (
            <MobileSearchBarSymp
              inputRef={inputRef}
              searchSympRef={searchSympRef}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              displaySearch={displaySearch}
              setDisplaySearch={setDisplaySearch}
              filteredSymps={filteredSymps}
              onCheck={onCheck}
              patientForm={patientForm}
              toggleFunction={toggleIsAddClick}
              dbSymps={dbSymps}
              chosenSymps={patientForm.chosenSymps}
            />
          )}
        </div>
      </div>
      {/* Mobile Human Figure */}
      <div
        className="mobile-right-box"
        style={{ display: isVisibleM ? "block" : "none" }}
      >
        <div className="right-box-wrapper">
          <div className="human-figure">
            {patientForm.gender === "Nữ" && (
              <MobileFemaleFigure
                toggleWholeHeadM={toggleWholeHeadM}
                toggleNeckM={toggleNeckM}
                toggleChestM={toggleChestM}
                toggleUpperArmM={toggleUpperArmM}
                toggleForeArmM={toggleForeArmM}
                toggleMidAbM={toggleMidAbM}
                toggleLowerAbM={toggleLowerAbM}
                toggleHandM={toggleHandM}
                toggleThighM={toggleThighM}
                toggleKneeM={toggleKneeM}
                toggleLowerLegM={toggleLowerLegM}
                toggleFootM={toggleFootM}
              />
            )}
            {patientForm.gender === "Nam" && (
              <MobileMaleFigure
                toggleWholeHeadM={toggleWholeHeadM}
                toggleNeckM={toggleNeckM}
                toggleChestM={toggleChestM}
                toggleUpperArmM={toggleUpperArmM}
                toggleForeArmM={toggleForeArmM}
                toggleMidAbM={toggleMidAbM}
                toggleLowerAbM={toggleLowerAbM}
                toggleHandM={toggleHandM}
                toggleThighM={toggleThighM}
                toggleKneeM={toggleKneeM}
                toggleLowerLegM={toggleLowerLegM}
                toggleFootM={toggleFootM}
              />
            )}
            {/* 1-5. WholeHead */}
            {wholeHeadM && (
              <div className="mobile-symp-background">
                <div className="mobile-symptoms-list">
                  {/* Head */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleExtraHeadM();
                    }}
                  >
                    <span>Đầu</span>
                    <i className="bi bi-arrow-right"></i>
                  </button>
                  {extraHeadM && (
                    <WholeHeadSymp
                      dbSymps={dbSymps}
                      onCheck={onCheck}
                      position={"Đầu"}
                      chosenSymps={patientForm.chosenSymps}
                      toggleFunction={toggleWholeHeadM}
                    />
                  )}
                  {/* Eyes */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleExtraEyesM();
                    }}
                  >
                    <span>Mắt</span>
                    <i className="bi bi-arrow-right"></i>
                  </button>
                  {extraEyesM && (
                    <WholeHeadSymp
                      dbSymps={dbSymps}
                      onCheck={onCheck}
                      position={"Mắt"}
                      chosenSymps={patientForm.chosenSymps}
                      toggleFunction={toggleWholeHeadM}
                    />
                  )}
                  {/* Ears */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleExtraEarsM();
                    }}
                  >
                    <span>Tai</span>
                    <i className="bi bi-arrow-right"></i>
                  </button>
                  {extraEarsM && (
                    <WholeHeadSymp
                      dbSymps={dbSymps}
                      onCheck={onCheck}
                      position={"Tai"}
                      chosenSymps={patientForm.chosenSymps}
                      toggleFunction={toggleWholeHeadM}
                    />
                  )}
                  {/* Nose */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleExtraNoseM();
                    }}
                  >
                    <span>Mũi</span>
                    <i className="bi bi-arrow-right"></i>
                  </button>
                  {extraNoseM && (
                    <WholeHeadSymp
                      dbSymps={dbSymps}
                      onCheck={onCheck}
                      position={"Mũi"}
                      chosenSymps={patientForm.chosenSymps}
                      toggleFunction={toggleWholeHeadM}
                    />
                  )}
                  {/* Mouth */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleExtraMouthM();
                    }}
                  >
                    <span>Miệng</span>
                    <i className="bi bi-arrow-right"></i>
                  </button>
                  {extraMouthM && (
                    <WholeHeadSymp
                      dbSymps={dbSymps}
                      onCheck={onCheck}
                      position={"Miệng"}
                      chosenSymps={patientForm.chosenSymps}
                      toggleFunction={toggleWholeHeadM}
                    />
                  )}

                  {/* Display bottom buttons */}
                  {extraM ? (
                    <ExtraMobileSympBtn toggleExtraM={toggleExtraM} />
                  ) : (
                    <MobileSympBtn toggleFunction={toggleWholeHeadM} />
                  )}
                </div>
              </div>
            )}
            {/* 6. Neck */}
            {neckM && (
              <div className="mobile-symp-background">
                <div className="mobile-symptoms-list">
                  {dbSymps
                    .filter(
                      (symptom) =>
                        symptom.position === "Cổ" &&
                        !patientForm.chosenSymps.includes(symptom.id)
                    )
                    .map((symptom) => (
                      <MobileSymptom
                        symptom={symptom}
                        onCheck={onCheck}
                        key={symptom.id}
                        toggleFunction={toggleNeckM}
                      />
                    ))}
                  <MobileSympBtn toggleFunction={toggleNeckM} />
                </div>
              </div>
            )}
            {/* 7. Chest */}
            {chestM && (
              <div className="mobile-symp-background">
                <div className="mobile-symptoms-list">
                  {dbSymps
                    .filter(
                      (symptom) =>
                        symptom.position === "Ngực" &&
                        !patientForm.chosenSymps.includes(symptom.id)
                    )
                    .map((symptom) => (
                      <MobileSymptom
                        symptom={symptom}
                        onCheck={onCheck}
                        key={symptom.id}
                        toggleFunction={toggleChestM}
                      />
                    ))}
                  <MobileSympBtn toggleFunction={toggleChestM} />
                </div>
              </div>
            )}
            {/* 8. UpperArm */}
            {upperArmM && (
              <div className="mobile-symp-background">
                <div className="mobile-symptoms-list">
                  {dbSymps
                    .filter(
                      (symptom) =>
                        symptom.position === "Vai" &&
                        !patientForm.chosenSymps.includes(symptom.id)
                    )
                    .map((symptom) => (
                      <MobileSymptom
                        symptom={symptom}
                        onCheck={onCheck}
                        key={symptom.id}
                        toggleFunction={toggleUpperArmM}
                      />
                    ))}
                  <MobileSympBtn toggleFunction={toggleUpperArmM} />
                </div>
              </div>
            )}
            {/* 9. ForeArm */}
            {foreArmM && (
              <div className="mobile-symp-background">
                <div className="mobile-symptoms-list">
                  {dbSymps
                    .filter(
                      (symptom) =>
                        symptom.position === "Cánh tay" &&
                        !patientForm.chosenSymps.includes(symptom.id)
                    )
                    .map((symptom) => (
                      <MobileSymptom
                        symptom={symptom}
                        onCheck={onCheck}
                        key={symptom.id}
                        toggleFunction={toggleForeArmM}
                      />
                    ))}
                  <MobileSympBtn toggleFunction={toggleForeArmM} />
                </div>
              </div>
            )}
            {/* 10. MidAb */}
            {midAbM && (
              <div className="mobile-symp-background">
                <div className="mobile-symptoms-list">
                  {dbSymps
                    .filter(
                      (symptom) =>
                        symptom.position === "Bụng" &&
                        !patientForm.chosenSymps.includes(symptom.id)
                    )
                    .map((symptom) => (
                      <MobileSymptom
                        symptom={symptom}
                        onCheck={onCheck}
                        key={symptom.id}
                        toggleFunction={toggleMidAbM}
                      />
                    ))}
                  <MobileSympBtn toggleFunction={toggleMidAbM} />
                </div>
              </div>
            )}
            {/* 11. LowerAb */}
            {lowerAbM && (
              <div className="mobile-symp-background">
                <div className="mobile-symptoms-list">
                  {dbSymps
                    .filter(
                      (symptom) =>
                        symptom.position === "Vùng dưới" &&
                        !patientForm.chosenSymps.includes(symptom.id)
                    )
                    .map((symptom) => (
                      <MobileSymptom
                        symptom={symptom}
                        onCheck={onCheck}
                        key={symptom.id}
                        toggleFunction={toggleLowerAbM}
                      />
                    ))}
                  <MobileSympBtn toggleFunction={toggleLowerAbM} />
                </div>
              </div>
            )}
            {/* 12. Hand */}
            {handM && (
              <div className="mobile-symp-background">
                <div className="mobile-symptoms-list">
                  {dbSymps
                    .filter(
                      (symptom) =>
                        symptom.position === "Bàn tay" &&
                        !patientForm.chosenSymps.includes(symptom.id)
                    )
                    .map((symptom) => (
                      <MobileSymptom
                        symptom={symptom}
                        onCheck={onCheck}
                        key={symptom.id}
                        toggleFunction={toggleHandM}
                      />
                    ))}
                  <MobileSympBtn toggleFunction={toggleHandM} />
                </div>
              </div>
            )}
            {/* 13. Thigh */}
            {thighM && (
              <div className="mobile-symp-background">
                <div className="mobile-symptoms-list">
                  {dbSymps
                    .filter(
                      (symptom) =>
                        symptom.position === "Hông, đùi và mông" &&
                        !patientForm.chosenSymps.includes(symptom.id)
                    )
                    .map((symptom) => (
                      <MobileSymptom
                        symptom={symptom}
                        onCheck={onCheck}
                        key={symptom.id}
                        toggleFunction={toggleThighM}
                      />
                    ))}
                  <MobileSympBtn toggleFunction={toggleThighM} />
                </div>
              </div>
            )}
            {/* 14. Knee */}
            {kneeM && (
              <div className="mobile-symp-background">
                <div className="mobile-symptoms-list">
                  {dbSymps
                    .filter(
                      (symptom) =>
                        symptom.position === "Đầu gối" &&
                        !patientForm.chosenSymps.includes(symptom.id)
                    )
                    .map((symptom) => (
                      <MobileSymptom
                        symptom={symptom}
                        onCheck={onCheck}
                        key={symptom.id}
                        toggleFunction={toggleKneeM}
                      />
                    ))}
                  <MobileSympBtn toggleFunction={toggleKneeM} />
                </div>
              </div>
            )}
            {/* 15. LowerLeg */}
            {lowerLegM && (
              <div className="mobile-symp-background">
                <div className="mobile-symptoms-list">
                  {dbSymps
                    .filter(
                      (symptom) =>
                        symptom.position === "Cẳng chân" &&
                        !patientForm.chosenSymps.includes(symptom.id)
                    )
                    .map((symptom) => (
                      <MobileSymptom
                        symptom={symptom}
                        onCheck={onCheck}
                        key={symptom.id}
                        toggleFunction={toggleLowerLegM}
                      />
                    ))}
                  <MobileSympBtn toggleFunction={toggleLowerLegM} />
                </div>
              </div>
            )}
            {/* 16. Foot */}
            {footM && (
              <div className="mobile-symp-background">
                <div className="mobile-symptoms-list">
                  {dbSymps
                    .filter(
                      (symptom) =>
                        symptom.position === "Bàn chân" &&
                        !patientForm.chosenSymps.includes(symptom.id)
                    )
                    .map((symptom) => (
                      <MobileSymptom
                        symptom={symptom}
                        onCheck={onCheck}
                        key={symptom.id}
                        toggleFunction={toggleFootM}
                      />
                    ))}
                  <MobileSympBtn toggleFunction={toggleFootM} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* MOBILE - Display selected symptoms */}
      <MobileSelectedSympBox
        patientForm={patientForm}
        dbSymps={dbSymps}
        handleDelete={handleDelete}
      />
      <div className="row pt-3 pb-3"></div>
    </div>
  );
}
