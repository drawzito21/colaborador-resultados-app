import React from "react";
import NameDropdown from "../components/NameDropdown";
import AnoDropdown from "../components/AnoDropdown";
import MesDropdown from "../components/MesDropdown";
import SetorDropdown from "../components/SetorDropdown";

function Home({
  selectedName,
  setSelectedName,
  selectedSetor,
  setSelectedSetor,
  selectedAno,
  setSelectedAno,
  selectedMes,
  setSelectedMes,
  uniqueNames,
  uniqueSetores,
  uniqueAnos,
  uniqueMeses
}) {
  return (
    <div>
      <h2 style={{ marginBottom: "24px" }}>🔍 Filtros</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "32px"
        }}
      >
        <NameDropdown
          names={uniqueNames}
          selectedName={selectedName}
          setSelectedName={setSelectedName}
        />

        <SetorDropdown
          setores={uniqueSetores}
          selectedSetor={selectedSetor}
          setSelectedSetor={setSelectedSetor}
        />

        <AnoDropdown
          anos={uniqueAnos}
          selectedAno={selectedAno}
          setSelectedAno={setSelectedAno}
        />

        <MesDropdown
          meses={uniqueMeses}
          selectedMes={selectedMes}
          setSelectedMes={setSelectedMes}
        />
      </div>
    </div>
  );
}

export default Home;

