import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataService from "../../services/data.service";
import { ToastContainer, toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";

const EmailTextUserList = () => {
  const params = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const [users, setAllUsers] = useState([]);
  const [allTeam, setAllTeam] = useState([]);
  const [subject, setSubject] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const userID = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllUser();
  }, []);
  const getAllUser = () => {
    setLoading(true);
    DataService.getAllUserChat()
      .then((data) => {
        setAllUsers(data.data.data);
        setLoading(false);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        toast.error(resMessage, {});
      });
  };

  const handleSelectChange = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(selectedValues);
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnLoading(true);
    const editorContent = editorRef.current
      ? editorRef.current.getContent()
      : "";
    const data = {
      subject: subject,
      recipients: selectedOptions,
      text: editorContent,
    };
    DataService.sendEmail(data)
      .then(() => {
        toast.success("Email Sent Successfully!!!");
        setBtnLoading(false);
        setSubject("");
        setSelectedOptions([]);
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
              Select Team <span className="red-required">*</span>
            </label>
            <select
              multiple
              required
              onChange={handleSelectChange}
              value={selectedOptions}
              className="form-select"
              style={{ minHeight: "150px" }}
            >
              <option>Select an option</option>
              {loading && (
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              )}
              {users && users.length > 0
                ? users
                    ?.filter(
                      (user) => user.status === "active" && user._id !== userID
                    )
                    .map((item) => (
                      <option key={item._id} value={item.email}>
                        {item.name}
                      </option>
                    ))
                : ""}
            </select>
            <div className="form-text multiple-Tl-text">
              You Can Select Multiple User by Ctrl+Click
            </div>
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
                  {emailTags.map((tag, i) => {
                    return (
                      <li key={i} onClick={() => handleTagClick(tag.value)}>
                        {tag?.name}
                      </li>
                    );
                  })}
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
            </button> */}
            {/* <button type="submit" className="main-btn" disabled={btnLoading}>
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

export default EmailTextUserList;
