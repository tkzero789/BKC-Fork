import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewBlog({ userRole, userInfos }) {
  const [blog, setBlog] = useState({});
  const { blogId } = useParams();
  const navigate = useNavigate();

  // Fetch blog content based on id
  useEffect(() => {
    axios
      .get(
        `https://symptom-checker-with-mern-stack.onrender.com/blog/${blogId}`
      )
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [blogId]);

  // Update blog status
  function updateStatus(newStatus) {
    axios
      .post(
        `https://symptom-checker-with-mern-stack.onrender.com/blog/update/${blogId}`,
        {
          status: newStatus,
        }
      )
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
    navigate("/blog-table");
  }

  // Delete a blog from database
  const deleteBlog = () => {
    axios
      .delete(
        `https://symptom-checker-with-mern-stack.onrender.com/blog/${blogId}`
      )
      .then((res) => {
        navigate("/blog-table");
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  };

  // Navigate to edit current viewed blog
  function editBlog() {
    navigate(`/blog/${blogId}/edit`);
  }

  console.log(userInfos.doctorID);
  console.log(blog);

  return (
    <>
      <div className="content-container individual-blog">
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <div className="blog-author-info">
            <span>Tác giả: {blog.author} </span>
            <span>{blog.createdAt}</span>
          </div>
          <p>{blog.intro}</p>
          {blog.content?.content?.map((item, index) => {
            if (item.type === "paragraph") {
              if (item.content === undefined) {
                return null;
              }
              return (
                <p key={index}>
                  {item.content?.map((textObj, textObjIndex) => {
                    if (
                      textObj.marks &&
                      textObj.marks.some((mark) => mark.type === "bold")
                    ) {
                      return (
                        <strong>
                          <span key={textObjIndex}>{textObj.text}</span>
                        </strong>
                      );
                    } else {
                      return <span key={textObjIndex}>{textObj.text}</span>;
                    }
                  })}
                </p>
              );
            } else if (item.type === "bulletList") {
              return (
                <ul key={index}>
                  {item.content?.map((listItem, listItemIndex) => (
                    <li key={listItemIndex}>
                      {listItem.content?.map((paragraph, paragraphIndex) => (
                        <span key={paragraphIndex}>
                          {paragraph.content?.map((textObj, textObjIndex) => (
                            <span key={textObjIndex}>{textObj.text}</span>
                          ))}
                        </span>
                      ))}
                    </li>
                  ))}
                </ul>
              );
            } else if (item.type === "orderedList") {
              return (
                <ol key={index}>
                  {item.content?.map((listItem, listItemIndex) => (
                    <li key={listItemIndex}>
                      {listItem.content?.map((paragraph, paragraphIndex) => (
                        <span key={paragraphIndex}>
                          {paragraph.content?.map((textObj, textObjIndex) => (
                            <span key={textObjIndex}>{textObj.text}</span>
                          ))}
                        </span>
                      ))}
                    </li>
                  ))}
                </ol>
              );
            } else if (item.type === "heading" && item.attrs.level === 1) {
              return (
                <h1 key={index}>
                  {item.content?.map((textObj, textObjIndex) => (
                    <span key={textObjIndex}>{textObj.text}</span>
                  ))}
                </h1>
              );
            } else if (item.type === "image") {
              return (
                <div className="blog-img">
                  <img
                    key={index}
                    src={item.attrs.src}
                    alt={item.attrs.alt || ""}
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
      <div className="content-container">
        <div className="d-flex justify-content-end pt-3 pb-5">
          <NavLink
            className="btn btn-outline-secondary me-3"
            to={`/blog-table`}
          >
            Quay lại
          </NavLink>
          {userRole === "admin" && (
            <div className="d-flex">
              <div className="ms-auto me-3">
                <button
                  type="button"
                  className="btn btn-success"
                  disabled={blog.status === "Accepted"}
                  onClick={() => updateStatus("Accepted")}
                >
                  Chấp nhận
                </button>
              </div>
              <div className="me-3">
                <button
                  type="button"
                  className="btn btn-warning"
                  disabled={blog.status === "Request-edit"}
                  onClick={() => updateStatus("Request-edit")}
                >
                  Yêu cầu chỉnh sửa
                </button>
              </div>
              <div className="">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  disabled={
                    blog.status === "Pending" || blog.status === "Accepted"
                  }
                  onClick={() => deleteBlog()}
                >
                  Xoá
                </button>
              </div>
            </div>
          )}
          {(userRole === "head-doctor" || userRole === "doctor") && (
            <div className="col-3">
              <button
                type="button"
                className="btn btn-success"
                disabled={
                  blog.status === "Accepted" ||
                  userInfos.doctorID !== blog.doctorID
                }
                onClick={editBlog}
              >
                Chỉnh sửa
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
