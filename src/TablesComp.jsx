import React from "react";
// import "./tablecomp.css";
import * as XLSX from "xlsx";
import products from "./products.json";
const handleDownload = () => {
  const table = document.getElementById("mytable");

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.table_to_sheet(table);

  const customColors = {
    redColor: { patternType: "solid", fgColor: { rgb: "FF0000" } },
    greenColor: { patternType: "solid", fgColor: { rgb: "00FF00" } },
    blueColor: { patternType: "solid", fgColor: { rgb: "0000FF" } },
  };

  const cellColorMap = {
    A1: "redColor",
    B1: "greenColor",
    C1: "blueColor",
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
