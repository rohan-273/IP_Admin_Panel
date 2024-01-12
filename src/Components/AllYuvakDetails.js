import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ScrollToTop from "react-scroll-up";

const AllYuvakDetails = ({ allPersons, onBack, persons }) => {
  const location = useLocation();
  const filteredDataTable = location.state.filteredDataTable;

  const [searchTerm, setSearchTerm] = useState("");

  const filteredPersons = persons.filter((person) => {
    const matchesSearchTerm =
      person.karyakarName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (filteredDataTable?.find((item) => person?.id === item.id) &&
        searchTerm.toLowerCase() === "present") ||
      (!filteredDataTable?.find((item) => person?.id === item.id) &&
        searchTerm.toLowerCase() === "absent");

    return matchesSearchTerm;
  });

  let srNo = 1;

  return (        
      <div className="p-5" style={{ height: "100vh" }}>
        <h2>All Yuvak Details</h2>
        <div>
          <label>
            Search :
            <input
              type="text"
              value={searchTerm}
              className="form-control"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
        </div>
        <Link to="/" className="btn btn-info mb-3" onClick={onBack}>
          Back
        </Link>
        <table className="table table_shadow">
          <thead>
            <tr>
              <th>Sr no.</th>
              <th>Yuvak Name</th>
              <th>Mobile</th>
              <th>Karyakar Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPersons.map((person) => (
              <tr key={person.id}>
                <td>{srNo++}</td>
                <td>{person.name}</td>
                <td>{person.mobile}</td>
                <td>{person.karyakarName}</td>
                <td>
                  {filteredDataTable?.find((item) => person?.id === item.id)
                    ? "Present"
                    : "Absent"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ScrollToTop showUnder={160}>
          <i
            className="fa fa-arrow-circle-o-up"
            aria-hidden="true"
            style={{ fontSize: 40 }}
          ></i>
        </ScrollToTop>
      </div> 
  );
};

export default AllYuvakDetails;
