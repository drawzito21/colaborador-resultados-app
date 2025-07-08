import React from "react";

function DataTable({ rows, theme }) {
  const columnWidth = "15%";

  const cellStyle = {
    padding: "8px",
    borderBottom: "1px solid #eee",
    textAlign: "center",
    width: columnWidth
  };

  const headerStyle = {
    padding: "8px",
    borderBottom: "1px solid #ddd",
    textAlign: "center",
    backgroundColor: theme.tableHeader || "#f5f5f5",
    fontWeight: "bold",
    width: columnWidth,
    whiteSpace: "nowrap"
  };

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: theme.tableBackground,
        color: theme.text
      }}
    >
      <thead>
  <tr>
    <th style={headerStyle}>Nome</th>
    <th style={headerStyle}>Setor</th>
    <th style={headerStyle}>Mês/Ano</th>
    <th style={headerStyle}>Assumidos</th>
    <th style={headerStyle}>Finalizados</th>
    <th style={headerStyle}>Score</th>
  </tr>
</thead>

      <tbody>
  {rows.map((item, idx) => (
    <tr key={idx}>
      <td style={{ ...cellStyle, textAlign: "left" }}>{item.Nome || "–"}</td>
      <td style={cellStyle}>{item.Setor || "–"}</td>
      <td style={cellStyle}>
        {item.Mês && item.Ano ? `${item.Mês} de ${item.Ano}` : "–"}
      </td>
      <td style={cellStyle}>{item.Assumidos || 0}</td>
      <td style={cellStyle}>{item.Finalizados || 0}</td>
      <td style={cellStyle}>
        {isNaN(item.Score) ? "–" : item.Score.toFixed(2)}
      </td>
    </tr>
  ))}
</tbody>

    </table>
  );
}

export default DataTable;

