import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { DataGrid } from "@mui/x-data-grid";
import "./table.scss";

export default function NotifTable({ userRole, userInfos }) {
  const userToken = localStorage.getItem("userToken");
  const apiConfig = {
    headers: { Authorization: `Bearer ${userToken}` },
  };
  const [notifs, setNotifs] = useState([]);
  const doctorID = userInfos.doctorID;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/notification/${doctorID}`, apiConfig)
      .then((res) => {
        console.log(res.data);
        const reverseData = res.data.reverse();
        const reverseDataWithNo = reverseData.map((item, index) => ({
          ...item,
          number: index + 1,
        }));
        setNotifs(reverseDataWithNo);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [doctorID]);

  const flatData = notifs.map((item, index) => {
    const fromInfos = item.fromInfos || {};
    const content = item.content || {};
    console.log(item.status);
    return {
      ...item,
      from: fromInfos.name || "",
      medSpecialty: fromInfos.medSpecialty || "",
      contentType: content.type || "",
      detail: content.detail || "",
      number: index + 1,
    };
  });

  function viewLink(notif) {
    axios.post(
      `http://localhost:5000/notification/update-status/${notif.id}`,
      {
        status: "Đã xem",
      },
      apiConfig
    );
    console.log(notif.content.link);
    navigate(notif.content.link);
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Thao tác",
      width: 100,
      renderCell: (params) => {
        const notif = params.row;
        return (
          <div className="cellAction">
            <button
              type="button"
              className="viewButton"
              onClick={() => viewLink(notif)}
            >
              <div>Xem</div>
            </button>
          </div>
        );
      },
    },
  ];

  const columns = [
    { field: "number", headerName: "Stt", width: 50 },
    { field: "from", headerName: "Người gửi", width: 160 },
    { field: "medSpecialty", headerName: "Chuyên khoa", width: 160 },
    { field: "contentType", headerName: "Loại", width: 200 },
    { field: "detail", headerName: "Nội dung", width: 500 },
    { field: "timeSent", headerName: "Thời gian gửi", width: 160 },
    { field: "status", headerName: "Trạng thái", width: 100 },
  ].concat(actionColumn);

  return (
    <div className="datatable">
      <div className="datatableTitle">Thông báo</div>
      <DataGrid
        className="datagrid"
        rows={flatData}
        getRowId={(row) => row._id}
        // columns={columns}
        columns={columns.map((col) => ({
          ...col,
          cellStyle: (params) =>
            params.row.status === "Chưa xem"
              ? { backgroundColor: "#F5F5F5" }
              : {},
        }))}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}
