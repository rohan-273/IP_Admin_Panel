import React, { useEffect, useRef, useState } from "react";
import PersonDetails from "./PersonDetails";
import * as XLSX from "xlsx";
import Select from "react-select";
import ScrollToTop from "react-scroll-up";
import { useNavigate } from "react-router-dom";

export default function AdminPanel({ persons, onLogout }) {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const tableRef = useRef(null);
  const navigate = useNavigate();

  let srno = 1;

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

  const handleScrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
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
      alert("Please select any Yuvak.");
      return;
    }
    if (selectedPerson) {
      setTableData((prevData) => [...prevData, selectedPerson]);
      localStorage.setItem(
        "tableData",
        JSON.stringify([...tableData, selectedPerson])
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

  const handleDownloadExcel = () => {
    const dataToDownload = searchQuery !== "" ? filteredDataTable : tableData;

    if (tableRef.current && dataToDownload.length > 0) {
      const sheetData = dataToDownload?.map((person) => ({
        "Yuvak Name": person.name,
        Mobile: person.mobile,
        "Karyakar Name": person.karyakarName,
      }));

      const ws = XLSX.utils.json_to_sheet(sheetData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      const wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: false,
        type: "array",
      });

      const blob = new Blob([wbout], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `IP-yuvak_sabha_${new Date()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
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
          <button className="btn btn-info" onClick={handleViewAllYuvakDetails}>
            View All Yuvak Details
          </button>
        </div>
        <div className="col-md-6 text-right">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
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
          <button className="button" onClick={handleAddToTable}>
            Add
          </button>

          <button
            className="btn btn-primary"
            style={{ right: 15, position: "absolute" }}
            onClick={handleScrollToBottom}
          >
            Scroll to Bottom
          </button>
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
          <h2>Table Data</h2>
          <button className="btn btn-success" onClick={handleDownloadExcel}>
            Download Excel
          </button>
          <table className="table mt-2" ref={tableRef}>
            <thead>
              <tr>
                <th>Sr no.</th>
                <th>Yuvak Name</th>
                <th>Mobile</th>
                <th>Karyakar Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDataTable?.map((person) => (
                <tr key={person.id}>
                  <td>{srno++}</td>
                  <td>{person.name}</td>
                  <td>{person.mobile}</td>
                  <td>{person.karyakarName}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteData(person.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ScrollToTop showUnder={160}>
        <i
          class="fa fa-arrow-circle-o-up"
          aria-hidden="true"
          style={{ "font-size": 40 }}
        ></i>
      </ScrollToTop>
    </div>
  );
}
