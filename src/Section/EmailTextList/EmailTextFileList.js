import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataService from "../../services/data.service";
import { ToastContainer, toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";

const EmailTextFileList = () => {
  const params = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const [subject, setSubject] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const userID = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const emailTags = [
    {
      name: "First Name",
      value: "{{first}}",
    },
    {
      name: "Email",
      value: "{{email}}",
    },
  ];

  const handleTagClick = (tagValue) => {
    if (editorRef.current) {
      editorRef.current.insertContent(tagValue);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const editorContent = editorRef.current
      ? editorRef.current.getContent()
      : "";

    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    formData.append("subject", subject);
    formData.append("text", editorContent);

    DataService.emailSendFile(formData)
      .then(() => {
        toast.success("Email Sent Successfully!!!");
        setBtnLoading(false);
        setSubject("");
        setSelectedFile(null);
        if (editorRef.current) {
          editorRef.current.setContent("");
        }
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(resMessage);
        setBtnLoading(false);
      });
  };

  return (
    <>
      <ToastContainer />

      <div className="inner-sec-bulk-gmail">
        <form onSubmit={handleSubmit}>
          <div className="label-field">
            <label>
              Select File <span className="red-required">*</span>
            </label>
            <input
              type="file"
              className="form-control"
              accept=".xlsx"
              onChange={handleFileChange}
            />
          </div>
          <div className="label-field margin-top">
            <label>
              Subject <span className="red-required">*</span>
            </label>
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="label-field">
            <label>
              Text <span className="red-required">*</span>
            </label>
            <div className="d-flex">
              <div className="col-9">
                <Editor
                  apiKey="v0ip0qppa6tx5219zcux6zor3lpvn1yla3uwnme1btty213m"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
              </div>
              <div className="email_tagsSec">
                <h4>Merge Tags</h4>
                <ul>
                  {emailTags.map((tag, i) => (
                    <li key={i} onClick={() => handleTagClick(tag.value)}>
                      {tag?.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="email-send-btn-sec">
            <button type="submit" className="main-btn" disabled={btnLoading}>
              {btnLoading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "Send Email"
              )}
            </button>
            {/* <button type="submit" className="main-btn" disabled={btnLoading}>
              {btnLoading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "Schedule Email"
              )}
            </button>
            <button type="submit" className="main-btn" disabled={btnLoading}>
              {btnLoading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "Draft"
              )}
            </button> */}
          </div>
        </form>
      </div>
    </>
  );
};

export default EmailTextFileList;
