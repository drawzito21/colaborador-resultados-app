import React, { useState } from "react";
import { styles } from "../styles";

export default function SearchInput({ value, onChange, suggestions = [], onSelect }) {
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);

  const nomesFiltrados = suggestions.filter((nome) =>
    nome.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        placeholder="Buscar colaborador (V4)"
        value={value}
        onChange={(e) => {
          onChange(e);
          setMostrarSugestoes(true);
        }}
        onBlur={() => setTimeout(() => setMostrarSugestoes(false), 100)}
        style={styles.input}
      />

      {mostrarSugestoes && nomesFiltrados.length > 0 && (
        <ul style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          background: "#fff",
          border: "1px solid #ccc",
          listStyle: "none",
          padding: 0,
          margin: 0,
          zIndex: 10,
        }}>
          {nomesFiltrados.map((nome, idx) => (
            <li
              key={idx}
              onMouseDown={() => {
                onSelect(nome);
                setMostrarSugestoes(false);
              }}
              style={{
                padding: "8px",
                borderBottom: "1px solid #eee",
                cursor: "pointer"
              }}
            >
              {nome}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
