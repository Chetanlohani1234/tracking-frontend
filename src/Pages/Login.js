import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnloading, setbtnLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setbtnLoading(true);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail) {
      toast.error("Email cannot be empty");
      setbtnLoading(false);

      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address");
      setbtnLoading(false);

      return;
    }

    if (!trimmedPassword) {
      toast.error("Password cannot be empty");
      setbtnLoading(false);

      return;
    }

    AuthService.login(trimmedEmail, trimmedPassword).then(
      () => {
        navigate("/dashboard");
        setbtnLoading(false);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setbtnLoading(false);

        toast.error(resMessage);
      }
    );
  };

  return (
    <>
      <div className="main-login-sec">
        <div className="top-inner-sec-login">
          <div className="top-inner-login-content">
            <h1 className="text-color-white">Welcome!</h1>
            <p>
              Login to your account and become part of something <br />
              amazing!
            </p>
          </div>
        </div>
        <div className="login-form-main-sec">
          <div className="inner-sec-login-form">
            <div className="box-login-form">
              <div className="login-form-heading">
                <h2>Login</h2>
              </div>
              <form onSubmit={handleLogin}>
                <div className="input-field">
                  <div className="login-form-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="login-form-input">
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="input-field">
                  <div className="login-form-icon">
                    <i className="fas fa-unlock-alt"></i>
                  </div>
                  <div className="login-form-input">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      placeholder="Password"
                    />
                  </div>
                </div>

                <div className="login-btn">
                  <button
                    className="main-btn btn-padding"
                    type="submit"
                    disabled={btnloading}
                  >
                    {btnloading ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
