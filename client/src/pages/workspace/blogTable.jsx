import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import "./table.scss";

export default function BlogTable({ userRole, userInfos }) {
  const [blog, setBlog] = useState([]);
  const [myBlog, setMyBlog] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/blog")
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

  // Filter blogs
  const handleMyBlogClick = () => {
    setMyBlog(!myBlog);
  };

  // Display filtered blogs
  const displayedBlogs = myBlog
    ? blog.filter((b) => b.doctorID === userInfos.doctorID)
    : blog;

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
      cellClassName: "cell-blog-title",
    },
    { field: "author", headerName: "Tác giả", width: 200 },
    { field: "doctorID", headerName: "Mã số bác sĩ", width: 120 },
    { field: "createdAt", headerName: "Ngày tạo", width: 150 },

    {
      field: "status",
      headerName: "Trạng thái",
      width: 140,
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
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}
