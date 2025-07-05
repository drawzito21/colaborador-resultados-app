import React, { useMemo } from "react";
import { NameDropdown } from "../components";

export default function Home({
  data,
  selectedName,
  setSelectedName,
  selectedSetor,
  setSelectedSetor,
  selectedMes,
  setSelectedMes
}) {
  const uniqueNames = useMemo(() => {
    const names = new Set();
    data.forEach((item) => item.Nome && names.add(item.Nome));
    return Array.from(names).sort();
  }, [data]);

  const uniqueSetores = useMemo(() => {
    const setores = new Set();
    data.forEach((item) => item.Setor && setores.add(item.Setor));
    return Array.from(setores).sort();
  }, [data]);

  const uniqueMeses = useMemo(() => {
    const meses = new Set();
    data.forEach((item) => item.Mes && meses.add(item.Mes));
    return Array.from(meses).sort();
  }, [data]);

  return (
    <div style={{ paddingBottom: "24px" }}>
      <h3 style={{ marginBottom: "12px" }}>Filtros Avançados</h3>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "24px",
          marginBottom: "24px",
          alignItems: "flex-start"
        }}
      >
        <div style={{ flex: "1 1 240px" }}>
          <NameDropdown
            names={uniqueNames}
            selected={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
          />
        </div>

        <div style={{ flex: "1 1 240px" }}>
          <NameDropdown
            names={uniqueSetores}
            selected={selectedSetor}
            onChange={(e) => setSelectedSetor(e.target.value)}
          />
        </div>

        <div style={{ flex: "1 1 240px" }}>
          <NameDropdown
            names={uniqueMeses}
            selected={selectedMes}
            onChange={(e) => setSelectedMes(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

