import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ScrollToTop from "react-scroll-up";
import { isWithinBirthdayRange } from "../utils";
import "../css/AllYuvakDetails.css";
import cake from "../_helpers/cake.webp";
import ExcelHandler from "../utils/ExcelHandler";

const AllYuvakDetails = ({ onBack, persons }) => {
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

  const customColumns = [
    { label: "Sk ID", value: (person) => person.sk_ID, width: 10 },
    { label: "Sampark Karyakar", value: (person) => person.karyakarName, width: 25 },
    { label: "Yuvak Name", value: (person) => person.name, width: 25 },
    { label: "Birth Date", value: (person) => person.birthDate, width: 15 },
    { label: "Mobile no", value: (person) => person.mobile, width: 15 },
    {
      label: "Status",
      value: (person) =>
        filteredDataTable?.find((item) => person?.id === item.id)
          ? "Present"
          : "Absent",
      width: 10,
    },
  ];

  return (
    <div className="m-3">
      <div className="d-flex justify-content-between align-items-center">
        <h3>All Yuvak Details</h3>
        <Link to="/dashboard" className="btn btn-info mb-3" onClick={onBack}>
          Back
        </Link>
      </div>
      <hr />
      <div className="d-flex justify-content-between align-items-center">
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
        <div>
          <ExcelHandler
            data={persons}
            searchQuery={searchTerm}
            filteredData={filteredPersons}
            customColumns={customColumns}
          />
        </div>
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
          {filteredPersons?.map((person) => {
            const isWithinRange = isWithinBirthdayRange(
              new Date(
                person.birthDate.split("-")[2],
                person.birthDate.split("-")[1] - 1,
                person.birthDate.split("-")[0]
              )
            );

            return (
              <tr
                key={person.id}
                style={{
                  background: isWithinRange ? "#efd687" : "inherit",
                }}
              >
                <td>{person.sk_ID}</td>
                <td>{person.karyakarName}</td>
                <td>
                  {person.name}{" "}
                  {isWithinRange && (
                    <img
                      src={cake}
                      alt="birthday_cake"
                      className="birthday_cake"
                    />
                  )}
                </td>
                <td>{person.birthDate}</td>
                <td>{person.mobile}</td>
                <td
                  style={{
                    color: filteredDataTable?.find(
                      (item) => person?.id === item.id
                    )
                      ? "green"
                      : "red",
                  }}
                >
                  {filteredDataTable?.find((item) => person?.id === item.id)
                    ? "Present"
                    : "Absent"}
                </td>
              </tr>
            );
          })}
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
