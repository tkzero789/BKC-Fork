import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Footer from "../../components/ForPages/Footer";
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";

const ViewSpecificBlog = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://symptom-checker-with-mern-stack.onrender.com/blog")
      .then((res) => {
        setTimeout(() => {
          setBlogs(res.data);
          setIsLoading(false);
        }, 400);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(true);
      });
  }, []);

  const blog = blogs.find((blog) => blog.id === id);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="content-container">
            <Breadcrumbs
              className="breadcrumbs"
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link className="text-secondary" to="/home">
                Trang chủ
              </Link>
              ,
              <Link className="text-secondary" to="/view-blog-list">
                Tin tức
              </Link>
              ,<Typography className="text-dark">{blog.title}</Typography>,
            </Breadcrumbs>
          </div>

          <div className="content-container individual-blog">
            <div key={blog.id}>
              <h2>{blog.title}</h2>
              <div className="blog-author-info">
                <div className="d-flex flex-column">
                  <div className="text-secondary-1">
                    Tác giả:{" "}
                    <span className="text-blue-1 fw-bold">{blog.author}</span>
                  </div>
                  <span className="text-secondary-1">
                    Cập nhật lần cuối: {blog.createdAt}
                  </span>
                </div>
                <div className="ms-auto">
                  <Link
                    className="text-decoration-none text-blue fs-3 me-3"
                    to={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      window.location.href
                    )}`}
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-facebook"></i>
                  </Link>
                  <Link
                    className="text-decoration-none text-danger fs-3 me-2"
                    to="#"
                  >
                    <i className="bi bi-envelope-fill"></i>
                  </Link>
                </div>
              </div>
              <p>{blog.intro}</p>
              {blog.content?.content.map((item, itemIndex) => {
                const keyPrefix = `${item.type}-${itemIndex}`;

                if (item.type === "paragraph") {
                  if (item.content === undefined) {
                    return null;
                  }
                  return (
                    <p key={keyPrefix}>
                      {item.content?.map((textObj, textObjIndex) => {
                        const key = `${keyPrefix}-p-${textObjIndex}`;
                        if (
                          textObj.marks &&
                          textObj.marks.some((mark) => mark.type === "bold")
                        ) {
                          return (
                            <strong key={key}>
                              <span>{textObj.text}</span>
                            </strong>
                          );
                        } else {
                          return <span key={key}>{textObj.text}</span>;
                        }
                      })}
                    </p>
                  );
                } else if (item.type === "bulletList") {
                  return (
                    <ul key={keyPrefix}>
                      {item.content?.map((listItem, listItemIndex) => {
                        const liKey = `${keyPrefix}-li-${listItemIndex}`;
                        return (
                          <li key={liKey}>
                            {listItem.content?.map(
                              (paragraph, paragraphIndex) => {
                                const spanKey = `${liKey}-span-${paragraphIndex}`;
                                return (
                                  <span key={spanKey}>
                                    {paragraph.content?.map(
                                      (textObj, textObjIndex) => {
                                        const textKey = `${spanKey}-text-${textObjIndex}`;
                                        return (
                                          <span key={textKey}>
                                            {textObj.text}
                                          </span>
                                        );
                                      }
                                    )}
                                  </span>
                                );
                              }
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  );
                } else if (item.type === "orderedList") {
                  return (
                    <ol key={keyPrefix}>
                      {item.content?.map((listItem, listItemIndex) => {
                        const liKey = `${keyPrefix}-li-${listItemIndex}`;
                        return (
                          <li key={liKey}>
                            {listItem.content?.map(
                              (paragraph, paragraphIndex) => {
                                const spanKey = `${liKey}-span-${paragraphIndex}`;
                                return (
                                  <span key={spanKey}>
                                    {paragraph.content?.map(
                                      (textObj, textObjIndex) => {
                                        const textKey = `${spanKey}-text-${textObjIndex}`;
                                        return (
                                          <span key={textKey}>
                                            {textObj.text}
                                          </span>
                                        );
                                      }
                                    )}
                                  </span>
                                );
                              }
                            )}
                          </li>
                        );
                      })}
                    </ol>
                  );
                } else if (item.type === "image") {
                  const imgKey = `${keyPrefix}-img`;
                  return (
                    <div className="blog-img" key={imgKey}>
                      <img src={item.attrs.src} alt={item.attrs.alt || ""} />
                    </div>
                  );
                } else if (item.type === "heading" && item.attrs.level === 4) {
                  return (
                    <h4 key={keyPrefix}>
                      {item.content?.map((textObj, textObjIndex) => {
                        const key = `${keyPrefix}-h4-${textObjIndex}`;
                        return <span key={key}>{textObj.text}</span>;
                      })}
                    </h4>
                  );
                }
                return null;
              })}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default ViewSpecificBlog;
