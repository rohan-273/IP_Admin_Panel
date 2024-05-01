import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ScrollToTop from "react-scroll-up";
import { isToday } from "../utils";

const AllYuvakDetails = ({ allPersons, onBack, persons }) => {
  const location = useLocation();
  const filteredDataTable = location.state.filteredDataTable;

  const [searchTerm, setSearchTerm] = useState("");

  const filteredPersons = persons
    ?.filter((person) => {
      const matchesSearchTerm =
        person.karyakarName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (filteredDataTable?.find((item) => person?.id === item.id) &&
          searchTerm.toLowerCase() === "present") ||
        (!filteredDataTable?.find((item) => person?.id === item.id) &&
          searchTerm.toLowerCase() === "absent");

      return matchesSearchTerm;
    })
    .sort((a, b) => a.sk_ID - b.sk_ID);

  return (
    <div className="m-3">
      <div className="d-flex justify-content-between align-items-center">
        <h2>All Yuvak Details</h2>
        <Link to="/dashboard" className="btn btn-info mb-3" onClick={onBack}>
          Back
        </Link>
      </div>
      <hr />
      <div className="mb-3">
        <label>
          Search:
          <input
            type="text"
            value={searchTerm}
            className="form-control"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </div>
      <table className="table table_shadow">
        <thead>
          <tr>
            <th>Sk ID</th>
            <th>Sampark Karyakar</th>
            <th>Yuvak Name</th>
            <th>Birth Date</th>
            <th>Mobile no</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredPersons?.map((person) => (
            <tr
              key={person.id}
              style={{
                background: isToday(
                  new Date(
                    person.birthDate.split("-")[2],
                    person.birthDate.split("-")[1] - 1,
                    person.birthDate.split("-")[0]
                  )
                )
                  ? "#a7ebf4"
                  : "inherit",
              }}
            >
              <td>{person.sk_ID}</td>
              <td>{person.karyakarName}</td>
              <td>{person.name}</td>
              <td>{person.birthDate}</td>
              <td>{person.mobile}</td>
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
