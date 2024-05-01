import React from "react";
import * as XLSX from "xlsx";
import CustomButton from "./CustomButton";

const ExcelHandler = ({ data, searchQuery, filteredData }) => {
  const handleDownloadExcel = () => {
    let dataToDownload = searchQuery !== "" ? filteredData : data;

    // Sort data based on sk_ID
    dataToDownload.sort((a, b) => a.sk_ID - b.sk_ID);

    if (dataToDownload.length > 0) {
      const sheetData = dataToDownload.map((person) => ({
        sk_ID: person.sk_ID,
        "Karyakar Name": person.karyakarName,
        "Yuvak Name": person.name,
        "Birth Date": person.birthDate,
        Mobile: person.mobile,
      }));

      const ws = XLSX.utils.json_to_sheet(sheetData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      ws["!cols"] = [
        { wch: 5 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
      ];

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

  return (
    <CustomButton
      onClick={handleDownloadExcel}
      label="Download Excel"
      className="btn btn-success"
    />
  );
};

export default ExcelHandler;
