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
      .get(`https://symptom-checker-with-mern-stack.onrender.com/disease/`)
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
      .get(
        `https://symptom-checker-with-mern-stack.onrender.com/disease-temp/`,
        apiConfig
      )
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
                  <div className="editButton">Sửa</div>
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
    { field: "timeCreated", headerName: "Ngày viết", width: 160 },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 120,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ].concat(actionColumn);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh sách các căn bệnh
        {userRole === "head-doctor" && part === 1 && (
          <button type="button" onClick={() => setPart(2)}>
            Căn bệnh được tạo bởi tôi
          </button>
        )}
        {userRole === "head-doctor" && part === 2 && (
          <button type="button" onClick={() => setPart(1)}>
            Xem tất cả căn bệnh
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
          getRowClassName={(params) =>
            `rowWithStatus ${params.row.status.replace(" ", "-")}`
          }
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          sx={{
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "transparent",
              boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            },
          }}
        />
      )}
      {(userRole === "head-doctor" || userRole === "doctor") && part === 1 && (
        <DataGrid
          className="datagrid"
          rows={doctorFlatData}
          getRowId={(row) => row._id}
          getRowClassName={(params) =>
            `rowWithStatus ${params.row.status.replace(" ", "-")}`
          }
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          sx={{
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "transparent",
              boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            },
          }}
        />
      )}
      {userRole === "head-doctor" && part === 2 && (
        <DataGrid
          className="datagrid"
          rows={doctorOwnFlatData}
          getRowId={(row) => row._id}
          getRowClassName={(params) =>
            `rowWithStatus ${params.row.status.replace(" ", "-")}`
          }
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          sx={{
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "transparent",
              boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            },
          }}
        />
      )}
    </div>
  );
}
