import React, { useState } from 'react'

export default function Login_Page({onLogin}) {
    const [username, setUsername] = useState("test@gmail.com");
    const [password, setPassword] = useState("Test@123");    

    const handleLogin = () => {
        if (username === "test@gmail.com" && password === "Test@123") {
            localStorage.setItem("isLoggedIn", true);
            onLogin();
        } else {
            alert("Entered username or password is Invalid");
        }
    }
  return (
    <div style={{ height: "100vh" }} className="login_bg">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style={{ borderRadius: "1rem" }}>
            <div class="row g-0">
              <div class="col-md-6 col-lg-5 d-none d-md-block">
                <img
                  src={""}
                  alt="login form"
                  class="img-fluid"
                  style={{ borderRadius: "1rem 0 0 1rem", opacity: "0.8" }}
                />
              </div>
              <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">
                  <form>
                    <div class="d-flex align-items-center justify-content-center mb-3 pb-1">                        
                      <span class="h1 fw-bold mb-0">Login</span>
                    </div>
                    <h5 class="fw-normal mb-3 pb-3">
                      Please enter your email and password!
                    </h5>
                    <div class="form-outline mb-4">
                      <label class="form-label">
                        Username:
                      </label>
                      <input
                        type="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        class="form-control form-control-lg"
                      />
                    </div>
                    <div class="form-outline mb-4">
                      <label class="form-label">
                        Password:
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        class="form-control form-control-lg"
                      />
                    </div>
                    <div class="pt-1 mb-4">
                      <button
                        class="btn btn-dark btn-lg btn-block"
                        type="button"
                        onClick={handleLogin}
                      >
                        Login
                      </button>
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
  )
}
