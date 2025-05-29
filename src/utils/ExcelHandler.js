import React from "react";
import * as XLSX from "xlsx";
import CustomButton from "./CustomButton";

const ExcelHandler = ({ data, searchQuery, filteredData, customColumns }) => {
  const handleDownloadExcel = () => {
    let dataToDownload = searchQuery !== "" ? filteredData : data;

    // Sort data based on sk_ID
    dataToDownload.sort((a, b) => {
      if (a.karyakarName === "Extra" && b.karyakarName !== "Extra") return 1;
      if (a.karyakarName !== "Extra" && b.karyakarName === "Extra") return -1;
      return a.sk_ID - b.sk_ID;
    });

    if (dataToDownload?.length > 0) {
      const sheetData = dataToDownload?.map((person) => {
        if (customColumns) {
          return customColumns.reduce((acc, col) => {
            acc[col.label] = col.value(person);
            return acc;
          }, {});
        } else {
          return {}; // return fallback value if needed, or handle differently
        }
      });      

      const ws = XLSX.utils.json_to_sheet(sheetData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      ws["!cols"] = customColumns
        ? customColumns?.map((col) => ({ wch: col.width || 20 }))
        : [
            { wch: 5 },
            { wch: 25 },
            { wch: 25 },
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

      // Get today's date in the desired format (DD_MM_YYYY)
      const today = new Date();
      const formattedDate = today.toLocaleDateString("en-GB").split("/").reverse().join("_");

      const a = document.createElement("a");
      a.href = url;
      a.download = `IP-yuvak_sabha_${formattedDate}.xlsx`;
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
