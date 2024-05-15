import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";

export default function News() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/blog")
      .then((res) => {
        const blogData = res.data
          .filter((blog) => blog.status === "Accepted")
          .sort((a, b) => {
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
          setIsLoading(false);
        }, 600);
      })
      .catch((err) => {
        const message = err;
        console.log(message);
        setIsLoading(false);
      });
  }, []);

  const mostRecentBlog = blogs[0]; // the most recent blog is the first one
  const nextBlogs = blogs.slice(1, 4); // the second, third, and fourth most recent blogs

  // Find the first image in the most recent blog's content
  const thumbnailImageMostRecent = mostRecentBlog?.content?.content.find(
    (item) => item.type === "image"
  );

  return (
    <>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <section className="news w-100">
          <div className="content-container">
            <div className="news-wrapper">
              <div className="news-header">Tin tức - Y học thường thức</div>
              <div className="news-section">
                <div className="c-7 md-12">
                  <div className="news-section-left">
                    <div className="news-left-wrapper">
                      <Link
                        className="news-link-left"
                        to={
                          mostRecentBlog
                            ? `/view-blog-list/${mostRecentBlog.id}`
                            : "#"
                        }
                      >
                        <div className="img-container-left">
                          <img
                            className="news-img-left"
                            src={
                              thumbnailImageMostRecent
                                ? thumbnailImageMostRecent.attrs.src
                                : ""
                            }
                            alt={mostRecentBlog ? mostRecentBlog.title : ""}
                          ></img>
                        </div>
                        <div className="news-title-left">
                          {mostRecentBlog ? mostRecentBlog.title : ""}
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="c-5 md-12">
                  <div className="news-section-right">
                    {nextBlogs?.map((blog) => {
                      // Find the first image in the blog's content
                      const thumbnailImage = blog.content?.content.find(
                        (item) => item.type === "image"
                      );

                      return (
                        <div className="news-link-wrapper" key={blog.id}>
                          <Link
                            className="news-link-right"
                            to={blog ? `/view-blog-list/${blog.id}` : "#"}
                          >
                            <div className="img-container-right">
                              <img
                                className="news-img-right"
                                src={
                                  thumbnailImage ? thumbnailImage.attrs.src : ""
                                }
                                alt={blog ? blog.title : ""}
                              ></img>
                            </div>
                            <div className="news-title-right">
                              {blog ? blog.title : ""}
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                    <div className="news-btn-wrapper">
                      <Link className="news-btn-link" to="/view-blog-list">
                        Xem tất cả tin tức
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
