import React from "react";
import { styles } from "../styles";

export default function NameDropdown({ names, selected, onChange }) {
  return (
    <select value={selected} onChange={onChange} style={styles.select}>
      <option value="">-- Selecione um nome --</option>
      {names.map((name, i) => (
        <option key={i} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
}
