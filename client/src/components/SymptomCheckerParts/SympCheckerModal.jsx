import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function SympCheckerModal() {
  const [show, setShow] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const handleClose = () => setShow(false);
  const handleCheck = () => setIsChecked(!isChecked);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header className="text-center">
        <Modal.Title className="w-100">
          Chính Sách và Điều Khoản Sử Dụng
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4">
        <p>
          Việc sử dụng chức năng <b>chẩn đoán bệnh trực tuyến</b> này đồng nghĩa
          với việc bạn đồng ý tuân thủ các điều khoản sau đây:
        </p>
        <ul className="ps-4 py-3">
          <li className="py-2">
            <p>
              <strong>Bảo mật Thông tin:</strong>
            </p>
            <p>
              Chúng tôi bảo mật thông tin cá nhân của bạn và chỉ sử dụng nó cho
              mục đích đã quy định trong Chính Sách Bảo Mật. Bạn cam kết cung
              cấp thông tin chính xác và đầy đủ.
            </p>
          </li>
          <li className="py-2">
            <p>
              <strong>Trách Nhiệm Sử Dụng:</strong>
            </p>
            <p>
              Bạn không được sử dụng dịch vụ để vi phạm pháp luật hoặc gây hại
              cho người khác. Bạn hoàn toàn chịu trách nhiệm về các hoạt động
              dưới tên của mình.
            </p>
          </li>
          <li className="py-2">
            <p>
              <strong>Giới Hạn Trách Nhiệm:</strong>
            </p>
            <p>
              Chúng tôi không chịu trách nhiệm đối với bất kỳ thiệt hại nào phát
              sinh từ việc sử dụng dịch vụ của chúng tôi.
            </p>
          </li>
        </ul>
        <Form>
          {["checkbox"].map((type) => (
            <div key={`default-${type}`} className="mb-3">
              <Form.Check id={`default-${type}`}>
                <Form.Check.Input
                  type={type}
                  onChange={handleCheck}
                  className="border border-secondary"
                />
                <Form.Check.Label>
                  Tôi đồng ý với{" "}
                  <Link className="text-decoration-none">
                    Chính Sách và Điều Khoản Sử Dụng
                  </Link>
                </Form.Check.Label>
              </Form.Check>
            </div>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Link to="/home" className="btn btn-outline-secondary me-3">
          Quay lại
        </Link>
        <Button
          //   className="btn btn-primary px-4"
          className={`${
            !isChecked ? "btn btn-outline-primary" : "btn btn-primary"
          } px-4`}
          onClick={handleClose}
          disabled={!isChecked}
        >
          Tiếp theo
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SympCheckerModal;
