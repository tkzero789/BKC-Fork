import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ApptForm from "../../components/ApptParts/ApptForm";
import ApptSuccessMsg from "../../components/ApptParts/ApptSuccessMsg";
import Footer from "../../components/ForPages/Footer";

export default function CreateAppt() {
  const [isApptSet, setIsApptSet] = useState(false);

  const [appt, setAppt] = useState({
    id: uuidv4(),
    fullName: "",
    phoneNumber: "",
    email: "",
    dob: "",
    gender: "",
    need: "",
    date: "",
    reason: "",
    createdAt: null,
    status: "Pending",
  });
  const [showModal, setShowModal] = useState(false);

  async function confirmSetAppt(e) {
    e.preventDefault();
    const updatedAppt = {
      ...appt,
      createdAt: new Date().toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    };

    axios
      .post("http://localhost:5000/appointment/add", updatedAppt)
      .then((res) => {
        setAppt(updatedAppt);
        setIsApptSet(true);
        console.log(res.data);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="appt-req-body">
      {!isApptSet && (
        <ApptForm
          appt={appt}
          setAppt={setAppt}
          showModal={showModal}
          setShowModal={setShowModal}
          editMode={true}
          closeModal={closeModal}
          confirmSetAppt={confirmSetAppt}
        />
      )}

      {isApptSet && <ApptSuccessMsg />}

      <Footer />
    </div>
  );
}
