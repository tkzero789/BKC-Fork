import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import "./table.scss";

export default function BlogTable({ userRole, userInfos }) {
  const [blog, setBlog] = useState([]);
  const [myBlog, setMyBlog] = useState(false);

  // Fetch all blogs data
  useEffect(() => {
    axios
      .get("https://symptom-checker-with-mern-stack.onrender.com/blog")
      .then((res) => {
        const reverseData = res.data.reverse();
        const reverseDataWithNo = reverseData.map((item, index) => ({
          ...item,
          number: index + 1,
        }));
        setBlog(reverseDataWithNo);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, []);

  // Assign blog priority
  const getPriority = (status) => {
    switch (status) {
      case "Request edit":
        return 1;
      case "Pending":
        return 2;
      case "Accepted":
        return 3;
      default:
        return 4;
    }
  };

  // Sort blogs based on status priority
  const sortedBlogs = [...blog].sort(
    (a, b) => getPriority(a.status) - getPriority(b.status)
  );

  // Filter blogs
  const handleMyBlogClick = () => {
    setMyBlog(!myBlog);
  };

  // Display filtered blogs
  const displayedBlogs = myBlog
    ? sortedBlogs.filter((b) => b.doctorID === userInfos.doctorID)
    : sortedBlogs;

  const actionColumn = [
    {
      field: "action",
      headerName: "Thao tác",
      width: 200,
      renderCell: (params) => {
        const blog = params.row;
        return (
          <div className="cellAction">
            <NavLink className="viewLink" to={`/blog/${blog.id}/view`}>
              <div className="viewButton">Xem</div>
            </NavLink>
          </div>
        );
      },
    },
  ];

  const columns = [
    {
      field: "title",
      headerName: "Tựa đề",
      width: 400,
    },
    { field: "author", headerName: "Tác giả", width: 200 },
    { field: "doctorID", headerName: "Mã số bác sĩ", width: 120 },
    { field: "createdAt", headerName: "Ngày tạo", width: 150 },

    {
      field: "status",
      headerName: "Trạng thái",
      width: 140,
      renderCell: (params) => {
        const status = params.row.status.replace(" ", "-");
        return (
          <div className={`cellWithStatus ${status}`}>{params.row.status}</div>
        );
      },
    },
  ].concat(actionColumn);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh sách blogs
        {(userRole === "head-doctor" || userRole === "doctor") && (
          <>
            <button onClick={handleMyBlogClick}>
              {myBlog ? "Xem tất cả blogs" : "Blogs của tôi"}
            </button>
            <NavLink to="/create-blog" className="add-link">
              Thêm bài blog
            </NavLink>
          </>
        )}
      </div>
      <DataGrid
        className="datagrid"
        rows={displayedBlogs}
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
