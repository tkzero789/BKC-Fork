import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

import "./table.scss";

export default function ApptTable() {
  const [appts, setAppts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/appointment")
      .then((res) => {
        const reverseData = res.data.reverse();
        const reverseDataWithNo = reverseData.map((item, index) => ({
          ...item,
          number: index + 1,
        }));
        setAppts(reverseDataWithNo);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, []);

  const deleteAppt = (id) => {
    axios
      .delete(`http://localhost:5000/appointment/${id}`)
      .then((res) => {
        setAppts(appts.filter((appt) => appt.id !== id));
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Trạng thái",
      width: 200,
      renderCell: (params) => {
        const appt = params.row;
        return (
          // need to edit here
          <div className="cellAction">
            <NavLink className="viewLink" to={`/appointment/${appt.id}/view`}>
              <div className="viewButton">Xem</div>
            </NavLink>
            {appt.status === "Spam" && (
              <button
                type="button"
                className="deleteButton"
                onClick={() => deleteAppt(appt.id)}
              >
                Xóa
              </button>
            )}
          </div>
        );
      },
    },
  ];

  const columns = [
    { field: "number", headerName: "Stt", width: 50 },
    { field: "phoneNumber", headerName: "SĐT", width: 120 },
    { field: "fullName", headerName: "Tên bệnh nhân", width: 200 },
    { field: "date", headerName: "Ngày đặt hẹn", width: 160 },
    { field: "need", headerName: "Nhu cầu", width: 240 },
    { field: "email", headerName: "Email", width: 240 },
    { field: "createdAt", headerName: "Ngày khởi tạo", width: 160 },
    { field: "status", headerName: "Trạng thái", width: 160 },
  ].concat(actionColumn);

  return (
    <div className="datatable">
      <div className="datatableTitle">Danh sách đặt hẹn</div>
      <DataGrid
        className="datagrid"
        rows={appts}
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}
