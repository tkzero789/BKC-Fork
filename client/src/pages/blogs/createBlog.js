import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState } from "react";
import Italic from "@tiptap/extension-italic";
import Image from "@tiptap/extension-image";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "../../pages/blogs/texteditor.scss";
import { useNavigate } from "react-router-dom";

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
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 }) ? "is-active" : ""
          }
        >
          Tựa đề phụ
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

const CreateBlog = ({ userInfos }) => {
  const navigate = useNavigate();
  const now = new Date();
  const formattedTime = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")} ${String(now.getDate()).padStart(2, "0")}/${String(
    now.getMonth() + 1
  ).padStart(2, "0")}/${now.getFullYear()}`;

  const [blog, setBlog] = useState({
    id: null,
    title: "",
    intro: "",
    image: null,
    content: "",
    author: userInfos.fullName,
    doctorID: userInfos.doctorID,
    createAt: null,
    status: "Pending",
  });

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

  // Submit button
  const handleClick = async (e) => {
    e.preventDefault();
    const updatedBlog = {
      ...blog,
      id: uuidv4(),
      createdAt: formattedTime,
    };

    try {
      await axios.post(
        "https://symptom-checker-with-mern-stack.onrender.com/blog/add",
        updatedBlog
      );
      setBlog(updatedBlog);
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
    try {
      const response = await axios.post(
        `http://localhost:5000/blog/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data); // Log the response data to check if the image is uploaded correctly
      setBlog((prevBlog) => ({
        ...prevBlog,
        image: response.data.link, // Ensure that the server is returning the correct URL for the image
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="content-container create-blog-text-editor">
        <h1>Tạo bài blog/ tin tức mới</h1>
        <span>
          Tác giả: <span className="text-blue-1">{userInfos.fullName}</span>
        </span>
        <div className="text-editor-title">
          <label htmlFor="title">Tựa đề:</label>
          <textarea value={blog.title} onChange={onChangeTitle} />
        </div>
        <div className="text-editor-intro">
          <label htmlFor="intro">Đoạn mở đầu:</label>
          <textarea
            className="intro-textarea"
            value={blog.intro}
            onChange={onChangeIntro}
          />
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
          <div className="pt-2">Chưa có ảnh nào được upload</div>
        )}
        <label htmlFor="info">Nội dung bài blog:</label>
        <div className="text-editor">
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
        </div>

        <div className="text-editor-btn">
          <button className="btn btn-primary ms-auto" onClick={handleClick}>
            Xác nhận tạo
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
