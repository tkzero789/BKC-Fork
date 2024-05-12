import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Italic from "@tiptap/extension-italic";
import Image from "@tiptap/extension-image";
import "../../pages/blogs/texteditor.scss";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="menu-bar">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <i className="bi bi-type-bold"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <i className="bi bi-type-italic"></i>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          <i className="bi bi-type-h1"></i>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          <i className="bi bi-type-h2"></i>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          <i className="bi bi-type-h3"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <i className="bi bi-list-ul"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <i className="bi bi-list-ol"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          <i className="bi bi-quote"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <i className="bi bi-arrow-counterclockwise"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <i className="bi bi-arrow-clockwise"></i>
        </button>
      </div>
    </>
  );
};

const EditBlog = ({ userInfos }) => {
  const navigate = useNavigate();

  const { blogId } = useParams();

  const [blog, setBlog] = useState(null);

  const editor = useEditor({
    extensions: [StarterKit, Italic, Image],
    content: "",
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      setBlog((prev) => ({
        ...prev,
        content: json,
      }));
    },
  });

  // Fetch blog content based on id
  useEffect(() => {
    console.log(blogId);
    axios
      .get(`http://localhost:5000/blog/${blogId}`)
      .then((res) => {
        setBlog(res.data);
        if (editor) {
          editor.commands.setContent(res.data.content);
        }
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [blogId, editor]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  // Submit button
  const handleClick = async (e) => {
    e.preventDefault();
    const now = new Date();
    const formattedTime = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")} ${String(now.getDate()).padStart(2, "0")}/${String(
      now.getMonth() + 1
    ).padStart(2, "0")}/${now.getFullYear()}`;
    const updatedBlog = {
      ...blog,
      status: "Pending",
      createdAt: formattedTime,
    };

    try {
      await axios.post(
        `http://localhost:5000/blog/edit/${blogId}`,
        updatedBlog
      );
      setBlog(updatedBlog);
      console.log(updatedBlog);
    } catch (error) {
      console.log(error);
    }
    navigate("/blog-table");
  };

  // Value from title input
  const onChangeTitle = (e) => {
    setBlog({ ...blog, title: e.target.value });
  };

  // Value from intro input
  const onChangeIntro = (e) => {
    setBlog({ ...blog, intro: e.target.value });
  };

  // Upload image
  const updateInfoImage = async (event) => {
    const formData = new FormData();
    formData.append("image", event.target.files[0]);
    const response = await axios.post(
      `http://localhost:5000/blog/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setBlog((prevBlog) => ({
      ...prevBlog,
      image: response.data.link,
    }));
  };

  return (
    <>
      <div className="content-container create-blog-text-editor">
        <h1>Chỉnh sửa bài blog:</h1>
        <span>Tác giả: {userInfos.fullName}</span>
        <div className="text-editor-title">
          <label htmlFor="title">Tựa đề:</label>
          <textarea value={blog.title} onChange={onChangeTitle} />
        </div>
        <div className="text-editor-intro">
          <label htmlFor="intro">Đoạn mở đầu:</label>
          <textarea value={blog.intro} onChange={onChangeIntro} />
        </div>
        <div className="text-editor-img">
          <label htmlFor="image">Ảnh bài blog:</label>
          <input
            type="file"
            name="image"
            className="form-control border-primary-subtle col-9 mb-2"
            placeholder="Ảnh minh họa"
            onChange={(e) => updateInfoImage(e)}
          />
        </div>
        {blog.image ? (
          <div className="text-editor-img">
            <img src={blog.image} alt="Blog img" />
          </div>
        ) : (
          "Chưa có ảnh nào được upload"
        )}
        <label htmlFor="info">Info</label>
        <div className="text-editor">
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
        </div>

        <div className="text-editor-btn">
          <Link
            className="btn btn-outline-secondary me-5"
            to={`/blog/${blogId}/view`}
          >
            Quay lại
          </Link>
          <button className="btn btn-primary" onClick={handleClick}>
            Xác nhận chỉnh sửa
          </button>
        </div>
      </div>
    </>
  );
};

export default EditBlog;
