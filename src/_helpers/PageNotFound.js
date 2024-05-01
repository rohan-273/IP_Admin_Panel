import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="error-template">
            <h1>Oops!</h1>
            <h2>404 Page Not Found</h2>
            <div className="error-details">
              Sorry, an error has occured, Requested page not found!
            </div>
            <div className="error-actions">            
              <Link to="/dashboard" className="btn btn-info mb-3">
              <i className="fa fa-home" aria-hidden="true"></i> Take Me Home{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
