import React from "react";
import { styles } from "../styles";

export default function DataTable({ rows, theme }) {
  if (!rows.length) return null;

  return (
    <table style={{ ...styles.table }}>
      <thead>
        <tr>
          <th style={{ ...styles.th, backgroundColor: theme.tableHeader, border: `1px solid ${theme.tableBorder}`, color: theme.text }}>Nome</th>
          <th style={{ ...styles.th, backgroundColor: theme.tableHeader, border: `1px solid ${theme.tableBorder}`, color: theme.text }}>Mês</th>
          <th style={{ ...styles.th, backgroundColor: theme.tableHeader, border: `1px solid ${theme.tableBorder}`, color: theme.text }}>Finalizados</th>
          <th style={{ ...styles.th, backgroundColor: theme.tableHeader, border: `1px solid ${theme.tableBorder}`, color: theme.text }}>Score</th>
          <th style={{ ...styles.th, backgroundColor: theme.tableHeader, border: `1px solid ${theme.tableBorder}`, color: theme.text }}>Setor</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            <td style={{ ...styles.td, border: `1px solid ${theme.tableBorder}` }}>{row.Nome}</td>
            <td style={{ ...styles.td, border: `1px solid ${theme.tableBorder}` }}>{row.Mes}</td>
            <td style={{ ...styles.td, border: `1px solid ${theme.tableBorder}` }}>{row.Finalizados}</td>
            <td style={{ ...styles.td, border: `1px solid ${theme.tableBorder}` }}>{row.Score}</td>
            <td style={{ ...styles.td, border: `1px solid ${theme.tableBorder}` }}>{row.Setor}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
