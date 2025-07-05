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
import Home from "./pages/Home";

function App() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [selectedSetor, setSelectedSetor] = useState("");
  const [selectedAno, setSelectedAno] = useState("");
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

  const uniqueAnos = useMemo(() => {
    const anos = new Set();
    data.forEach((item) => item.Ano && anos.add(item.Ano));
    return Array.from(anos).sort().reverse();
  }, [data]);

  const ordemMeses = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
  ];

  const uniqueMeses = useMemo(() => {
    const mesesSet = new Set();
    data.forEach((item) => {
      if (item.Mes) {
        const partes = item.Mes.trim().split(" ");
        if (partes.length >= 1) {
          mesesSet.add(partes[0].toLowerCase());
        }
      }
    });
    const mesesArray = Array.from(mesesSet);
    return ordemMeses.filter((mes) => mesesArray.includes(mes));
  }, [data]);

  const displayData = useMemo(() => {
    return data.filter((d) => {
      const partesMes = d.Mes ? d.Mes.toLowerCase().trim().split(" ") : [];
      const mesTexto = partesMes[0] || "";
      const matchName = selectedName ? d.Nome === selectedName : true;
      const matchSetor = selectedSetor ? d.Setor === selectedSetor : true;
      const matchAno = selectedAno ? d.Ano.trim() === selectedAno : true;
      const matchMes = selectedMes ? mesTexto === selectedMes : true;
      return matchName && matchSetor && matchAno && matchMes;
    });
  }, [selectedName, selectedSetor, selectedAno, selectedMes, data]);

  const handleExportCsv = () => {
    exportCsv(displayData, "colaboradores_filtrados.csv");
  };

  const filtrosAtivos = selectedName || selectedSetor || selectedAno || selectedMes;

  const homeProps = {
    data,
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
  };

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: theme.background,
        color: theme.text,
        minHeight: "100vh",
        padding: "32px"
      }}
    >
      <DarkModeToggle
        darkMode={darkMode}
        onToggle={() => setDarkMode(!darkMode)}
      />

      <Routes>
        <Route path="/" element={<Home {...homeProps} />} />
        <Route path="/registrar/:id" element={<Registro />} />
      </Routes>

      {filtrosAtivos && displayData.length === 0 && data.length > 0 && (
        <p style={styles.noResult}>🔍 Nenhum resultado encontrado.</p>
      )}

      {filtrosAtivos && displayData.length > 0 && (
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            padding: "32px",
            marginTop: "32px"
          }}
        >
          <h3 style={{ marginBottom: "16px", fontSize: "20px" }}>
            📊 Resultados filtrados
          </h3>

          <DataTable rows={displayData} theme={theme} />

          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "12px",
              marginTop: "24px",
              flexWrap: "wrap"
            }}
          >
            <button
              onClick={handleExportCsv}
              style={{ ...styles.exportButton, minWidth: "160px" }}
            >
              📤 Exportar CSV
            </button>

            <button
              onClick={() =>
                navigate(`/registrar/${displayData[0].id}`, {
                  state: { colaborador: displayData[0] }
                })
              }
              style={{
                ...styles.exportButton,
                backgroundColor: "#4caf50",
                minWidth: "160px"
              }}
            >
              📝 Registrar para {displayData[0].nome}
            </button>
          </div>

          <div
            style={{
              marginTop: "32px",
              borderRadius: "10px",
              padding: "16px",
              backgroundColor: "#fafafa"
            }}
          >
            <PerformanceChart data={displayData} theme={theme} />
          </div>
        </div>
      )}

      <footer style={styles.footer}>
        Desenvolvido por <strong>André Tavares 😎</strong>
      </footer>
    </div>
  );
}

export default App;

