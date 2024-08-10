import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataService from "../../services/data.service";
import { ToastContainer, toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import EmailTextUserList from "./EmailTextUserList";
import EmailTextFileList from "./EmailTextFileList";

const EmailTextList = () => {
  const params = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const [users, setAllUsers] = useState([]);
  const [allTeam, setAllTeam] = useState([]);
  const [subject, setSubject] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [selectTeam, setSelectTeam] = useState(true);
  const [selectUser, setSelectUser] = useState(false);
  const [selectFile, setSelectFile] = useState(false);

  const userID = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllTeams();
  }, []);

  const getAllTeams = () => {
    DataService.getAllTeam()
      .then((data) => {
        setAllTeam(data.data.data);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
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
      teamIds: selectedOptions,
      text: editorContent,
    };
    DataService.emailSendTeam(data)
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

  const handleSelectTeam = () => {
    setSelectTeam(true);
    setSelectFile(false);
    setSelectUser(false);
  };

  const handleSelectUser = () => {
    setSelectUser(true);
    setSelectFile(false);
    setSelectTeam(false);
  };

  const handleSelectFile = () => {
    setSelectFile(true);
    setSelectTeam(false);
    setSelectUser(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="main-sec-dashboard">
        <div className="top-bar-content top-bar-flex">
          <h2>Email Text</h2>
        </div>

        <div className="bulk-gmail-sec">
          <div className="top-sec-bulk-gmail-btn">
            <button
              className={`bulk-gmail-btn ${
                selectTeam ? "selectedTeamBtn" : ""
              }`}
              onClick={handleSelectTeam}
            >
              Select Team
            </button>
            <button
              className={`bulk-gmail-btn ${
                selectUser ? "selectedTeamBtn" : ""
              }`}
              onClick={handleSelectUser}
            >
              Select User
            </button>
            <button
              className={`bulk-gmail-btn ${
                selectFile ? "selectedTeamBtn" : ""
              }`}
              onClick={handleSelectFile}
            >
              Select File
            </button>
          </div>
          {selectTeam && (
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
                    {allTeam && allTeam.length > 0
                      ? allTeam.map((item) => (
                          <option key={item._id} value={item._id}>
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
                            <li
                              key={i}
                              onClick={() => handleTagClick(tag.value)}
                            >
                              {tag?.name}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="email-send-btn-sec">
                  <button
                    type="submit"
                    className="main-btn"
                    disabled={btnLoading}
                  >
                    {btnLoading ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      "Send Email"
                    )}
                  </button>
                  {/* <button
                    type="submit"
                    className="main-btn"
                    disabled={btnLoading}
                  >
                    {btnLoading ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      "Schedule Email"
                    )}
                  </button>
                  <button
                    type="submit"
                    className="main-btn"
                    disabled={btnLoading}
                  >
                    {btnLoading ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      "Draft"
                    )}
                  </button> */}
                </div>
              </form>
            </div>
          )}
          {selectUser && <EmailTextUserList />}
          {selectFile && <EmailTextFileList />}
        </div>
      </div>
    </>
  );
};

export default EmailTextList;
