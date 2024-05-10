import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

import "./table.scss";

export default function DiseaseTable({ userRole, userInfos }) {
  const userToken = localStorage.getItem("userToken");
  const apiConfig = {
    headers: { Authorization: `Bearer ${userToken}` },
  };
  const [part, setPart] = useState(1);
  const [diseases, setDiseases] = useState([]);
  const [tempDiseases, setTempDiseases] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/disease/`)
      .then((res) => {
        const diseases = res.data;
        setDiseases(diseases);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/disease-temp/`, apiConfig)
      .then((res) => {
        const tempDiseases = res.data;
        setTempDiseases(tempDiseases);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, []);

  const flatData = [...tempDiseases, ...diseases].map((item, index) => {
    const createInfos = item.createInfos || {};
    return {
      ...item,
      doctorCreated: createInfos.doctorCreated || "",
      doctorID: createInfos.doctorID || "",
      timeCreated: createInfos.timeCreated || "",
      number: index + 1,
    };
  });

  const doctorFlatData = flatData
    .filter((item) => item.medSpecialty === userInfos.medSpecialty)
    .map((item, index) => ({ ...item, number: index + 1 }));

  const doctorOwnFlatData = doctorFlatData
    .filter((item) => item.createInfos.doctorID === userInfos.doctorID)
    .map((item, index) => ({ ...item, number: index + 1 }));

  const actionColumn = [
    {
      field: "action",
      headerName: "Thao tác",
      width: 200,
      renderCell: (params) => {
        const disease = params.row;
        return (
          <div className="cellAction">
            {disease.status === "Approved" && (
              <NavLink className="viewLink" to={`/disease/${disease.id}/view`}>
                <div className="viewButton">Xem</div>
              </NavLink>
            )}
            {disease.status === "Approved" &&
              userInfos.doctorID === disease.createInfos.doctorID && (
                <NavLink
                  className="viewLink"
                  to={`/disease/${disease.id}/edit`}
                >
                  <div className="viewButton">Sửa</div>
                </NavLink>
              )}
            {disease.status !== "Approved" &&
              userInfos.doctorID === disease.createInfos.doctorID && (
                <NavLink
                  className="viewLink"
                  to={`/disease-temp/${disease.idTemp}/approve`}
                >
                  <div className="viewButton">Xem</div>
                </NavLink>
              )}
            {disease.status !== "Approved" && userRole === "admin" && (
              <NavLink
                className="viewLink"
                to={`/disease-temp/${disease.idTemp}/approve`}
              >
                <div className="checkButton">Xét duyệt</div>
              </NavLink>
            )}
          </div>
        );
      },
    },
  ];

  const columns = [
    { field: "number", headerName: "Stt", width: 50 },
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Tên bệnh", width: 200 },
    { field: "medSpecialty", headerName: "Chuyên khoa", width: 160 },
    { field: "doctorCreated", headerName: "Người tạo", width: 180 },
    { field: "doctorID", headerName: "Mã số bác sĩ", width: 120 },
    { field: "timeCreated", headerName: "Ngày viết", width: 120 },
    { field: "status", headerName: "Tình trạng", width: 120 },
  ].concat(actionColumn);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh sách các căn bệnh
        {userRole === "head-doctor" && part === 1 && (
          <button type="button" className="add-link" onClick={() => setPart(2)}>
            Của tôi
          </button>
        )}
        {userRole === "head-doctor" && part === 2 && (
          <button type="button" className="add-link" onClick={() => setPart(1)}>
            Quay lại
          </button>
        )}
        {userRole === "head-doctor" && (
          <NavLink to="/disease/create" className="add-link">
            Thêm căn bệnh
          </NavLink>
        )}
      </div>
      {userRole === "admin" && (
        <DataGrid
          className="datagrid"
          rows={flatData}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      )}
      {(userRole === "head-doctor" || userRole === "doctor") && part === 1 && (
        <DataGrid
          className="datagrid"
          rows={doctorFlatData}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      )}
      {userRole === "head-doctor" && part === 2 && (
        <DataGrid
          className="datagrid"
          rows={doctorOwnFlatData}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      )}
    </div>
  );
}
