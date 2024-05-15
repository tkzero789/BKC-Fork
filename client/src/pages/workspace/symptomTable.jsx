import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

import "./table.scss";

export default function SymptomTable({ userRole, userInfos }) {
  const userToken = localStorage.getItem("userToken");
  const [symptoms, setSymptoms] = useState([]);
  const [tempSymptoms, setTempSymptoms] = useState([]);

  useEffect(() => {
    axios
      .get(`https://symptom-checker-with-mern-stack.onrender.com/symptom/`)
      .then((res) => {
        const symptoms = res.data;
        setSymptoms(symptoms);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://symptom-checker-with-mern-stack.onrender.com/symptom-temp/`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((res) => {
        const tempSymptoms = res.data;
        setTempSymptoms(tempSymptoms);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, []);

  const flatData = [...tempSymptoms, ...symptoms].map((symp, index) => ({
    ...symp,
    number: index + 1,
  }));

  const actionColumn = [
    {
      field: "action",
      headerName: "Thao tác",
      width: 200,
      renderCell: (params) => {
        const symptom = params.row;
        return (
          <div className="cellAction">
            {symptom.status === "Approved" && (
              <NavLink className="viewLink" to={`/symptom/${symptom.id}/view`}>
                <div className="viewButton">Xem</div>
              </NavLink>
            )}
            {symptom.status === "Approved" && userRole === "admin" && (
              <NavLink className="viewLink" to={`/symptom/${symptom.id}/edit`}>
                <div className="editButton">Sửa</div>
              </NavLink>
            )}
            {symptom.status !== "Approved" && (
              <NavLink
                className="viewLink"
                to={`/symptom-temp/${symptom.idTemp}/approve`}
              >
                <div className="checkButton">
                  {userRole === "admin" ? "Xét duyệt" : "Xem"}
                </div>
              </NavLink>
            )}
          </div>
        );
      },
    },
  ];

  const columns = [
    { field: "number", headerName: "Stt", width: 100 },
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Triệu chứng", width: 500 },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 160,
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
        Danh sách các triệu chứng
        {userRole === "head-doctor" && (
          <NavLink to="/symptom/create" className="add-link ms-auto">
            Thêm triệu chứng
          </NavLink>
        )}
      </div>
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
    </div>
  );
}
