import { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
import MobileSymptom from "../Symptom/MobileSymptom";

const MobileSearchBarSymp = ({
  inputRef,
  searchSympRef,
  searchTerm,
  setSearchTerm,
  displaySearch,
  setDisplaySearch,
  filteredSymps,
  onCheck,
  patientForm,
  toggleFunction,
  dbSymps,
  chosenSymps,
}) => {
  // Delay 1s on rendering symptom
  const [delay, setDelay] = useState(false);

  useEffect(() => {
    setDelay(false);
    const timer = setTimeout(() => {
      setDelay(true);
    }, 500);
    return () => clearTimeout(timer); // Clean up on component unmount
  }, [searchTerm]);

  return (
    <>
      <div className="mobile-search-background">
        {/* Search */}
        <div className="mobile-search-symp-input">
          <input
            ref={inputRef}
            type="text"
            placeholder="Tìm kiếm triệu chứng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="search-symp-button">
            <button
              onClick={(e) => {
                e.preventDefault();
                setDisplaySearch(false);
                setSearchTerm("");
                toggleFunction();
              }}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
        {/* Search results */}
        {searchTerm && displaySearch && (
          <div ref={searchSympRef} className="search-symp-display">
            {delay
              ? filteredSymps
                  .filter((symptom) => !chosenSymps.includes(symptom.id)) // Filter out chosen symptoms
                  .map((symptom) => (
                    <MobileSymptom
                      symptom={symptom}
                      onCheck={onCheck}
                      key={symptom.id}
                      toggleFunction={toggleFunction}
                    />
                  ))
              : Array(10)
                  .fill()
                  .map((_, index) => (
                    <Skeleton
                      key={index}
                      variant="text"
                      animation="wave"
                      sx={{ fontSize: "2rem" }}
                      style={{ margin: "0 10px" }}
                    />
                  ))}
          </div>
        )}
        <div className="mobile-search-symp-btn">
          <button
            onClick={(e) => {
              e.preventDefault();
              setDisplaySearch(false);
              toggleFunction();
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
            }}
          >
            Huỷ
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileSearchBarSymp;
