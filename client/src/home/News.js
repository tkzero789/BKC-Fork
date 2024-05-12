import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

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

  return (
    <>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <section className="news w-100">
          <div className="content-container">
            <div className="news-wrapper">
              <div className="news-header">Newest blogs</div>
              <div className="news-section">
                <div className="c-7 m-12">
                  <div className="news-section-left">
                    <div className="news-left-wrapper">
                      <NavLink
                        className="news-link-left"
                        to={`/blog/${mostRecentBlog.id}/view`}
                      >
                        <div className="img-container-left">
                          <img
                            className="news-img-left"
                            src={mostRecentBlog.image}
                            alt={mostRecentBlog.title}
                          ></img>
                        </div>
                        <div className="news-title-left">
                          {mostRecentBlog.title}
                        </div>
                      </NavLink>
                    </div>
                  </div>
                </div>
                <div className="c-5 m-12">
                  <div className="news-section-right">
                    {nextBlogs?.map((blog) => (
                      <div className="news-link-wrapper" key={blog.id}>
                        <NavLink
                          className="news-link-right"
                          to={`/blog/${blog.id}/view`}
                        >
                          <div className="img-container-right">
                            <img
                              className="news-img-right"
                              src={blog.image}
                              alt={blog.title}
                            ></img>
                          </div>
                          <div className="news-title-right">{blog.title}</div>
                        </NavLink>
                      </div>
                    ))}
                    <div className="news-btn-wrapper">
                      <NavLink className="news-btn-link" to="/view-blog-list">
                        Xem tất cả tin tức
                      </NavLink>
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
