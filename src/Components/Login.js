import React, { useState } from "react";
import Akshardham from "../_helpers/Akshardham.jpg";
import logo from "../_helpers/logo.png";
import CustomButton from "../utils/CustomButton";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin@123");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin@gmail.com" && password === "admin@123") {
      localStorage.setItem("isLoggedIn", true);
      navigate("/dashboard");
      onLogin();
    } else {
      alert("Incorrect email or password. Please try again");
    }
  };
  return (
    <div style={{ height: "100vh" }} className="login_bg">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src={Akshardham}
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem", opacity: "0.8" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div
                        className="d-flex align-items-center justify-content-center mb-3 pb-5"
                        style={{ flexDirection: "column" }}
                      >
                        <img
                          src={logo}
                          alt="logo"
                          style={{ height: "auto", width: 100 }}
                        />
                        <span
                          className="h2 fw-bold mb-0"
                          style={{ color: "#ff8400" }}
                        >
                          Indrapuri Yuvak Mandal
                        </span>
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label">Email address</label>
                        <input
                          type="email"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="form-control form-control-lg"
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control form-control-lg"
                        />
                      </div>
                      <div className="pt-1 mb-4">
                        <CustomButton
                          onClick={handleLogin}
                          label="Login"
                          className="btn btn-lg btn-block login-btn"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
