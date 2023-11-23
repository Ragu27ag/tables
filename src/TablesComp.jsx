import React from "react";
// import "./tablecomp.css";
import * as XLSX from "xlsx";
import products from "./products.json";
const handleDownload = async () => {
  const table = document.getElementById("mytable");

  // const wb = XLSX.utils.book_new();
  // const ws = XLSX.utils.table_to_sheet(table);

  // const customColors = {
  //   redColor: { patternType: "solid", fgColor: { rgb: "FF0000" } },
  //   greenColor: { patternType: "solid", fgColor: { rgb: "00FF00" } },
  //   blueColor: { patternType: "solid", fgColor: { rgb: "0000FF" } },
  // };

  // const cellColorMap = {
  //   A1: "redColor",
  //   B1: "greenColor",
  //   C1: "blueColor",
  // };

  // // Apply custom colors to cells
  // Object.keys(cellColorMap).forEach((cellAddress) => {
  //   const colorKey = cellColorMap[cellAddress];
  //   console.log("ck", colorKey);
  //   console.log("ck", customColors[colorKey]);
  //   ws[cellAddress].s = customColors[colorKey];
  // });

  // XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  // XLSX.writeFile(wb, "final.xlsx");

  /* create a workbook */
  const worksheet = XLSX.utils.table_to_sheet(table);

  // Apply cell styles
  XLSX.utils.sheet_add_aoa(worksheet, [["", ""]], { origin: "A1" }); // Placeholder to create cell objects
  const range = { s: { c: 0, r: 0 }, e: { c: 1, r: 1 } }; // Define a range

  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellAddress = { c: C, r: R };
      const cellRef = XLSX.utils.encode_cell(cellAddress);

      // Modify individual cell style properties as needed
      if (!worksheet[cellRef]) worksheet[cellRef] = {};
      worksheet[cellRef].s = {
        font: { color: { rgb: "#FF0000" } }, // Font color
        border: { top: { style: "thin", color: { rgb: "#000000" } } }, // Top border
      };
    }
  }

  // Create a workbook and add the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Save the workbook as an Excel file
  XLSX.writeFile(workbook, "exported_table2.xlsx", { cellStyles: true });
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
