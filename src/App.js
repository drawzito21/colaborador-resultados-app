import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Papa from "papaparse";

import { styles } from "./styles";
import { lightTheme, darkTheme } from "./theme";
import { exportCsv } from "./utils/exportCsv";
import {
  NameDropdown,
  DarkModeToggle,
  DataTable,
  PerformanceChart
} from "./components";
import Registro from "./pages/Registro";

const BotaoRegistro = ({ colaborador }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/registrar/${colaborador.id}`, {
      state: { colaborador }
    });
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "8px 16px",
        backgroundColor: "#4caf50",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        margin: "8px 0",
        minWidth: "200px"
      }}
    >
      📝 Registrar para {colaborador.nome}
    </button>
  );
};

function App() {
  const [data, setData] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [selectedSetor, setSelectedSetor] = useState("");
  const [selectedMes, setSelectedMes] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const theme = darkMode ? darkTheme : lightTheme;

  useEffect(() => {
    fetch("/dados_v4.csv")
      .then((res) => res.text())
      .then((csvText) => {
        const results = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (h) => h.trim(),
          transform: (v) => v.trim()
        });
        setData(results.data);
      });
  }, []);

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

  const displayData = useMemo(() => {
    return data.filter((d) => {
      const matchName = selectedName ? d.Nome === selectedName : true;
      const matchSetor = selectedSetor ? d.Setor === selectedSetor : true;
      const matchMes = selectedMes ? d.Mes === selectedMes : true;
      return matchName && matchSetor && matchMes;
    });
  }, [selectedName, selectedSetor, selectedMes, data]);

  const handleSelectChange = (e) => {
    setSelectedName(e.target.value);
  };

  const handleExportCsv = () => {
    exportCsv(displayData, "colaboradores_filtrados.csv");
  };

  const Home = () => (
    <div
      style={{
        ...styles.container,
        backgroundColor: theme.background,
        color: theme.text
      }}
    >
      <DarkModeToggle
        darkMode={darkMode}
        onToggle={() => setDarkMode(!darkMode)}
      />

      <h2 style={styles.title}>Buscar Colaborador Versão 4</h2>

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
            onChange={handleSelectChange}
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

      {(selectedName || selectedSetor || selectedMes) &&
        displayData.length === 0 &&
        data.length > 0 && (
          <p style={styles.noResult}>🔍 Nenhum resultado encontrado.</p>
        )}

      {displayData.length > 0 && (
        <>
          <DataTable rows={displayData} theme={theme} />

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "12px",
              flexWrap: "wrap",
              alignItems: "flex-start"
            }}
          >
            <div style={{ flex: "1", minWidth: "200px" }}>
              <button
                onClick={handleExportCsv}
                style={{
                  ...styles.exportButton,
                  margin: "8px 0",
                  minWidth: "100%"
                }}
              >
                📤 Exportar CSV
              </button>
            </div>

            <div style={{ flex: "1", minWidth: "200px" }}>
              <BotaoRegistro colaborador={displayData[0]} />
            </div>
          </div>

          <PerformanceChart data={displayData} theme={theme} />
        </>
      )}

      <footer style={styles.footer}>
        Desenvolvido por <strong>André Tavares 😎</strong>
      </footer>
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registrar/:id" element={<Registro />} />
    </Routes>
  );
}

export default App;

