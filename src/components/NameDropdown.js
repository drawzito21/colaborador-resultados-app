import React from "react";
import { styles } from "../styles";

export default function NameDropdown({ names = [], selected, onChange }) {
  return (
    <select
      value={selected}
      onChange={onChange}
      style={styles.dropdown}
    >
      <option value="">-- Selecione --</option>
      {names.map((name, idx) => (
        <option key={idx} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
}

