import React from "react";
// import "./tablecomp.css";
import * as XLSX from "xlsx";
import products from "./products.json";
const handleDownload = () => {
  const table = document.getElementById("mytable"); // Replace with your table's ID

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.table_to_sheet(table);

  // Define custom colors
  const customColors = {
    redColor: { patternType: "solid", fgColor: { rgb: "FF0000" } }, // Red color
    greenColor: { patternType: "solid", fgColor: { rgb: "00FF00" } }, // Green color
    blueColor: { patternType: "solid", fgColor: { rgb: "0000FF" } }, // Blue color
  };

  // Assign cell addresses and custom color keys
  const cellColorMap = {
    A1: "redColor", // Assigning red color to cell A1
    B2: "greenColor", // Assigning green color to cell B2
    C3: "blueColor", // Assigning blue color to cell C3
    // Add more cell addresses as needed
  };

  // Apply custom colors to cells
  Object.keys(cellColorMap).forEach((cellAddress) => {
    const colorKey = cellColorMap[cellAddress];
    console.log("ck", colorKey);
    console.log("ck", customColors[colorKey]);
    ws[cellAddress].s = customColors[colorKey];
  });

  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, "final.xlsx");
};

const TablesComp = () => {
  return (
    <div>
      {" "}
      <table id="mytable">
        <thead>
          <tr>
            <th className="head-1">Id</th>
            <th className="head-2">Name</th>
            <th className="head-3">Model</th>
            <th className="head-4">Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((pro) => (
            <tr key={pro.id}>
              <td>{pro.id}</td>
              <td>{pro.name}</td>
              <td>{pro.modeName}</td>
              <td>RS :{pro.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default TablesComp;
