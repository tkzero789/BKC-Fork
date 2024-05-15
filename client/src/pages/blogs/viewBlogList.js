import axios from "axios";
import Footer from "../../components/ForPages/Footer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Pagination from "@mui/material/Pagination";

const ViewBlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const blogsPerPage = 5;

  useEffect(() => {
    axios
      .get("https://symptom-checker-with-mern-stack.onrender.com/blog")
      .then((res) => {
        const blogData = res.data.sort((a, b) => {
          const aDate =
            a.createdAt.split(" ")[1].split("/").reverse().join("-") +
            "T" +
            a.createdAt.split(" ")[0];
          const bDate =
            b.createdAt.split(" ")[1].split("/").reverse().join("-") +
            "T" +
            b.createdAt.split(" ")[0];
          return new Date(bDate) - new Date(aDate); // sort in descending order
        });
        setTimeout(() => {
          setBlogs(blogData);
          console.log(blogData);
          setIsLoading(false);
        }, 600);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  // Filter blogs with status "Accepted"
  const acceptedBlogs = blogs.filter((blog) => blog.status === "Accepted");

  // Calculate total pages
  useEffect(() => {
    const totalPages = Math.ceil(acceptedBlogs.length / blogsPerPage);
    setTotalPages(totalPages);
  }, [acceptedBlogs]);

  // Get current blogs
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = acceptedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  return (
    <>
      {isLoading ? (
        <div>Loading....</div>
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
              ,<Typography className="text-dark">Tin tức</Typography>,
            </Breadcrumbs>
          </div>
          <div className="blog-list w-100">
            <div className="content-container">
              <h1>Tin tức - Y học thường thức</h1>
              <div className="blog-list-items">
                {currentBlogs.map((blog) => {
                  if (blog.status === "Pending") {
                    return null;
                  } else if (blog.status === "Accepted") {
                    const thumbnailImage = blog.content?.content.find(
                      (item) => item.type === "image"
                    );
                    return (
                      <div className="blog-list-item" key={blog.id}>
                        {/* Mobile blog link title */}
                        <div className="mobile-blog-link d-none">
                          <Link to={`/view-blog-list/${blog.id}`}>
                            {blog.title ? blog.title : "Does not have a title"}
                          </Link>
                        </div>
                        {/* Mobile blog image and intro */}
                        <div className="mobile-blog-img-and-intro d-none">
                          <div className="d-flex">
                            <Link
                              className="mobile-blog-thumbnail-img"
                              to={`/view-blog-list/${blog.id}`}
                            >
                              {thumbnailImage && (
                                <img
                                  src={thumbnailImage.attrs.src}
                                  alt={
                                    thumbnailImage.attrs.alt ||
                                    "Thumbnail image"
                                  }
                                />
                              )}
                            </Link>
                            <div className="mobile-blog-intro">
                              <span>
                                {blog.intro
                                  ? blog.intro
                                  : "Does not have an intro"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="c-3 md-4">
                          <Link
                            className="blog-thumbnail-img"
                            to={`/view-blog-list/${blog.id}`}
                          >
                            {thumbnailImage && (
                              <img
                                src={thumbnailImage.attrs.src}
                                alt={
                                  thumbnailImage.attrs.alt || "Thumbnail image"
                                }
                              />
                            )}
                          </Link>
                        </div>
                        <div className="c-9 md-8">
                          <div className="blog-link-and-intro">
                            <Link to={`/view-blog-list/${blog.id}`}>
                              {blog.title
                                ? blog.title
                                : "Does not have a title"}
                            </Link>
                            <span>
                              {blog.intro
                                ? blog.intro
                                : "Does not have an intro"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              <div className="blog-pagination">
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(event, page) => paginate(page)}
                  color="primary"
                  shape="rounded"
                />
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default ViewBlogList;
