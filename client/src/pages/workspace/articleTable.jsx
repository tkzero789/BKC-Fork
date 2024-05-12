import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

import "./table.scss";

export default function ArticleTable({ userRole, userInfos }) {
  const userToken = localStorage.getItem("userToken");
  const apiConfig = {
    headers: { Authorization: `Bearer ${userToken}` },
  };
  const [part, setPart] = useState(1);
  const [articles, setArticles] = useState([]);
  const [tempArticles, setTempArticles] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/article/`)
      .then((res) => {
        const articles = res.data;
        setArticles(articles);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/article-temp/`, apiConfig)
      .then((res) => {
        const articles = res.data;
        setTempArticles(articles);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, []);

  const flatData = [...tempArticles, ...articles].map((item, index) => {
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
        const article = params.row;
        return (
          <div className="cellAction">
            {article.status === "Approved" && (
              <NavLink
                className="viewLink"
                to={`/disease/${article.diseaseId}/article/${article.id}/view`}
              >
                <div className="viewButton">Xem</div>
              </NavLink>
            )}
            {article.status === "Approved" &&
              userInfos.doctorID === params.row.createInfos.doctorID && (
                <NavLink
                  className="viewLink"
                  to={`/disease/${article.diseaseId}/article/${article.id}/edit`}
                >
                  <div className="editButton">Sửa</div>
                </NavLink>
              )}
            {article.status !== "Approved" &&
              userInfos.doctorID === params.row.createInfos.doctorID && (
                <NavLink
                  className="viewLink"
                  to={`/article-temp/${article.idTemp}/approve`}
                >
                  <div className="viewButton">Xem</div>
                </NavLink>
              )}
            {article.status !== "Approved" && userRole === "head-doctor" && (
              <NavLink
                className="viewLink"
                to={`/article-temp/${article.idTemp}/approve`}
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
    { field: "title", headerName: "Tựa đề", width: 200 },
    { field: "diseaseName", headerName: "Bệnh đi kèm", width: 200 },
    { field: "doctorCreated", headerName: "Tác giả", width: 180 },
    { field: "doctorID", headerName: "Mã số bác sĩ", width: 120 },
    { field: "timeCreated", headerName: "Ngày viết", width: 160 },
    { field: "status", headerName: "Trạng thái", width: 120 },
  ].concat(actionColumn);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh sách bài viết
        {userRole !== "admin" && part === 1 && (
          <button type="button" onClick={() => setPart(2)}>
            Bài viết của tôi
          </button>
        )}
        {userRole !== "admin" && part === 2 && (
          <button type="button" onClick={() => setPart(1)}>
            Xem tất cả các bài viết
          </button>
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
      {userRole !== "admin" && part === 1 && (
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
      {userRole !== "admin" && part === 2 && (
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
