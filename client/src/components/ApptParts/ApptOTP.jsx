import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Toaster, toast } from "sonner";

const ApptOtp = ({ setIsOtpConfirmed, show, setShow }) => {
  const [otp, setOtp] = useState("");

  const handleClose = () => {
    setShow(false);
  };

  const handleOtpChange = (e) => {
    const otpInput = e.target.value;
    if (otpInput.length <= 6) {
      setOtp(otpInput);
    }
  };

  const handleConfirm = () => {
    if (otp.length === 6) {
      setIsOtpConfirmed(true);
      setShow(false);
    } else {
      toast.error("Mã xác thực không hợp lệ");
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        animation={true}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Nhập mã xác thực OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="number"
            value={otp}
            onChange={handleOtpChange}
            placeholder="Nhập mã"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Huỷ
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            <Toaster
              toastOptions={{
                className: "toast-noti",
              }}
              position="top-center"
              richColors
            />
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ApptOtp;
