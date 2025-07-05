import React from "react";

function DataTable({ rows, theme }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "16px" }}>
      <thead>
        <tr>
          <th style={headerStyle}>Nome</th>
          <th style={headerStyle}>Setor</th>
          <th style={headerStyle}>Ano</th>
          <th style={headerStyle}>Mês</th>
          <th style={headerStyle}>Score</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? "#f9f9f9" : "#fff" }}>
            <td style={cellStyle}>{row.Nome}</td>
            <td style={cellStyle}>{row.Setor}</td>
            <td style={cellStyle}>{row.Ano}</td>
            <td style={cellStyle}>{row.Mes}</td>
            <td style={cellStyle}>{row.Score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const headerStyle = {
  textAlign: "left",
  padding: "12px",
  backgroundColor: "#eaeaea",
  fontWeight: "bold",
  fontSize: "14px"
};

const cellStyle = {
  padding: "12px",
  fontSize: "14px",
  borderBottom: "1px solid #ddd"
};

export default DataTable;

