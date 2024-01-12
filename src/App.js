import { useEffect, useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import AdminPanel from "./Components/AdminPanel";
import data from "./_helpers/data.json";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AllYuvakDetails from "./Components/AllYuvakDetails";
// import Login_Page from "./LocalStorage/Login_Page";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedLoginStatus === "true");
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <Router>      
      <div>
        {!isLoggedIn ? (
          <Login onLogin={handleLogin} />
          ) : (
            <Routes>            
            <Route path="/all-yuvak-details" element={<AllYuvakDetails persons={data.persons} />} />
            <Route
              path="/"
              element={
                <AdminPanel persons={data.persons} onLogout={handleLogout} />
              }
            />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
