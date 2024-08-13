import { useEffect, useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import AdminPanel from "./Components/AdminPanel";
import data from "./_helpers/data.json";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AllYuvakDetails from "./Components/AllYuvakDetails";
import PageNotFound from "./_helpers/PageNotFound";

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
    <Router basename={'/IP_Admin_Panel'}>
      <div>
        {!isLoggedIn ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Routes>
            <Route
              path="/all-yuvak-details"
              element={<AllYuvakDetails persons={data.persons} />}
            />
            <Route
              path="/dashboard"
              element={
                <AdminPanel persons={data.persons} onLogout={handleLogout} />
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
