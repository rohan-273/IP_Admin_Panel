import React, { useEffect, useRef, useState } from "react";
import PersonDetails from "./PersonDetails";
import Select from "react-select";
import ScrollToTop from "react-scroll-up";
import { useNavigate } from "react-router-dom";
import CustomModal from "../utils/CustomModal";
import CustomButton from "../utils/CustomButton";
import { isWithinBirthdayRange } from "../utils";
import ExcelHandler from "../utils/ExcelHandler";
import "../css/AdminPanel.css";
import cake from "../_helpers/cake.webp";

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

    const isAlreadyAdded = tableData.some(
      (person) => person.id === selectedPerson.id
    );
    if (isAlreadyAdded) {
      openModal("This Yuvak entry is already added...");
      return;
    }

    const currentTime = new Date().toLocaleTimeString();
    const yuvakWithTime = { ...selectedPerson, time: currentTime }; // time property
    setTableData((prevData) => [yuvakWithTime, ...prevData]);
    localStorage.setItem(
      "tableData",
      JSON.stringify([yuvakWithTime, ...tableData])
    );
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

  // karyakar ids from the json
  const KaryakarIds = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ];

  const totalPresentKaryakars = tableData.filter((person) =>
    KaryakarIds.includes(person.id)
  ).length;

  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <div className="admin-panel-header-left">
          <CustomButton
            onClick={handleViewAllYuvakDetails}
            label="View All Yuvak Details"
            className="button button-primary"
          />
        </div>
        <div className="admin-panel-header-right">
          <CustomButton
            onClick={handleLogout}
            label="Logout"
            className="button button-danger"
          />
        </div>
      </div>
      <hr className="divider" />
      <div className="admin-panel-content">
        <div className="admin-panel-section">
          <label className="admin-panel-label">Search Yuvak Name:</label>
          <div className="search-yuvak">
            <Select
              options={options}
              value={selectedOption}
              onChange={handlePersonChange}
              placeholder="Select Yuvak Name"
              isClearable={true}
              className="select-input"
            />
            <CustomButton
              onClick={handleAddToTable}
              label="Add"
              className="button button-success ml-2"
            />
          </div>
        </div>
        <div className="admin-panel-section">
          {selectedPerson && <PersonDetails person={selectedPerson} />}
        </div>
        <div className="admin-panel-section">
          <label className="admin-panel-label">Search by Karyakar Name:</label>
          <input
            type="text"
            placeholder="Search Karyakar Name"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="admin-panel-section total-present-section">
          <div className="total-present-info">
            <span className="info-label">Total Present Yuvaks:</span>
            <span className="info-value">
              {filteredDataTable?.length - totalPresentKaryakars}
            </span>
          </div>
          <div className="total-present-info">
            <span className="info-label">Total Present Karyakars:</span>
            <span className="info-value">{totalPresentKaryakars}</span>
          </div>
        </div>

        <div className="admin-panel-section full-width">
          {filteredDataTable?.length > 0 && (
            <div className="table-container">
              <div className="table-header">
                <h4 className="table-heading">Attendance Sheet</h4>
                <ExcelHandler
                  data={tableData}
                  searchQuery={searchQuery}
                  filteredData={filteredDataTable}
                />
              </div>
              <table className="custom-table" ref={tableRef}>
                <thead>
                  <tr>
                    <th>Sr no.</th>
                    <th>Yuvak Name</th>
                    <th>Birth Date</th>
                    <th>Mobile no</th>
                    <th>Sampark Karyakar</th>
                    <th>Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDataTable?.map((person) => {
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
                        <td>{srno++}</td>
                        <td>
                          {person.name}
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
                        <td>{person.karyakarName}</td>
                        <td>{person.time}</td>
                        <td>
                          <i
                            className="fa fa-trash"
                            onClick={() => handleDeleteData(person.id)}
                            style={{
                              color: "red",
                              cursor: "pointer",
                              fontSize: 20,
                            }}
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <ScrollToTop showUnder={160}>
        <i className="fa fa-arrow-circle-o-up" aria-hidden="true"></i>
      </ScrollToTop>
      <CustomModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        message={modalMessage}
      />
    </div>
  );
}
