import React, { useEffect, useRef, useState } from "react";
import PersonDetails from "./PersonDetails";
import Select from "react-select";
import ScrollToTop from "react-scroll-up";
import { useNavigate } from "react-router-dom";
import CustomModal from "../utils/CustomModal";
import CustomButton from "../utils/CustomButton";
import { isToday } from "../utils";
import ExcelHandler from "../utils/ExcelHandler";

export default function AdminPanel({ persons, onLogout }) {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const tableRef = useRef(null);
  const navigate = useNavigate();

  let srno = 1;

  const openModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  useEffect(() => {
    const storedTableData = localStorage.getItem("tableData");
    if (storedTableData) {
      setTableData(JSON.parse(storedTableData));
    }
  }, []);

  const handleViewAllYuvakDetails = () => {
    navigate("/all-yuvak-details", {
      allpersons: persons,
      state: { filteredDataTable },
    });
  };

  const handlePersonChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    const selectedPerson = selectedOption
      ? persons?.find((person) => person.id === selectedOption.value)
      : null;
    setSelectedPerson(selectedPerson);
  };

  const handleAddToTable = () => {
    if (!selectedPerson) {
      openModal("Please select any Yuvak.");
      return;
    }

    // Check if the selected person already exists in the table data
    const isAlreadyAdded = tableData.some(
      (person) => person.id === selectedPerson.id
    );
    if (isAlreadyAdded) {
      openModal("This Yuvak entry is already added...");
      return;
    }

    if (selectedPerson) {
      setTableData((prevData) => [selectedPerson, ...prevData]);
      localStorage.setItem(
        "tableData",
        JSON.stringify([selectedPerson, ...tableData])
      );
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      setSelectedPerson(null);
      setTableData([]);
      localStorage.removeItem("tableData");
      localStorage.removeItem("isLoggedIn");
      onLogout();
    }
  };

  const handleDeleteData = (personId) => {
    const updatedTableData = tableData?.filter(
      (person) => person.id !== personId
    );
    setTableData(updatedTableData);
    localStorage.setItem("tableData", JSON.stringify(updatedTableData));
  };

  const filteredDataTable = tableData?.filter((person) =>
    person?.karyakarName?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const options = persons?.map((person) => ({
    value: person.id,
    label: person.name,
  }));

  return (
    <div className="m-3">
      <div className="row">
        <div className="col-md-6">
          <CustomButton
            onClick={handleViewAllYuvakDetails}
            label="View All Yuvak Details"
            className="btn btn-info"
          />
        </div>
        <div className="col-md-6 text-right">
          <CustomButton
            onClick={handleLogout}
            label="Logout"
            className="btn btn-danger"
          />
        </div>
      </div>
      <hr />
      <div className="row mt-3" style={{ alignItems: "flex-end" }}>
        <div className="col-md-6">
          <label>Search Yuvak Name: </label>
          <Select
            options={options}
            value={selectedOption}
            onChange={handlePersonChange}
            placeholder="Yuvak Name"
            isClearable={true}
          />
        </div>
        <div className="col-md-6">
          <CustomButton
            onClick={handleAddToTable}
            label="Add"
            className="button"
          />
        </div>
      </div>

      {selectedPerson && <PersonDetails person={selectedPerson} />}

      <div className="mt-3">
        <label>Search by Karyakar Name: </label>
        <input
          type="text"
          placeholder="Karyakar Name"
          className="form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredDataTable?.length > 0 && (
        <div className="mt-4 table_shadow">
          <h2>Attendence Sheet</h2>
          <ExcelHandler
            data={tableData}
            searchQuery={searchQuery}
            filteredData={filteredDataTable}
          />
          <table className="table mt-2" ref={tableRef}>
            <thead>
              <tr>
                <th>Sr no.</th>
                <th>Yuvak Name</th>
                <th>Birth Date</th>
                <th>Mobile no</th>
                <th>Sampark Karyakar</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDataTable?.map((person) => (
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
                  <td>{srno++}</td>
                  <td>{person.name}</td>
                  <td>{person.birthDate}</td>
                  <td>{person.mobile}</td>
                  <td>{person.karyakarName}</td>
                  <td>
                    <CustomButton
                      onClick={() => handleDeleteData(person.id)}
                      label="Delete"
                      className="btn btn-danger"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ScrollToTop showUnder={160}>
        <i
          className="fa fa-arrow-circle-o-up"
          aria-hidden="true"
          style={{ "font-size": 40 }}
        ></i>
      </ScrollToTop>
      <CustomModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        message={modalMessage}
      />
    </div>
  );
}
