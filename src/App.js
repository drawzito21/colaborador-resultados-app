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
  const [filtrosLimpos, setFiltrosLimpos] = useState(false);

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

        const dadosFormatados = results.data.map((item) => {
          const mesLimpo = item.Mês?.trim().toLowerCase() || "";
          const scoreLimpo = item.Score
            ? parseFloat(String(item.Score).replace(",", "."))
            : 0;
          const anoLimpo = item.Ano?.toString().trim() || "";

          return {
            Nome: item.Nome,
            Setor: item.Setor,
            Mês: mesLimpo,
            MesValor: mesLimpo,
            Assumidos: item.Assumidos,
            Finalizados: item.Finalizados,
            Score: scoreLimpo,
            Ano: anoLimpo
          };
        });

        setData(dadosFormatados);
      });
  }, []);

  const uniqueNames = useMemo(() => {
    const names = new Set();
    data.forEach((item) => {
      const matchSetor = selectedSetor ? item.Setor === selectedSetor : true;
      if (item.Nome && matchSetor) {
        names.add(item.Nome);
      }
    });
    return Array.from(names).sort();
  }, [data, selectedSetor]);

  const uniqueSetores = useMemo(() => {
    const setores = new Set();
    data.forEach((item) => item.Setor && setores.add(item.Setor));
    return Array.from(setores).sort();
  }, [data]);

  const uniqueAnos = useMemo(() => {
    const anos = new Set();
    data.forEach((item) => {
      if (item.Ano) {
        anos.add(item.Ano.toString().trim());
      }
    });
    return Array.from(anos).sort().reverse();
  }, [data]);

  const ordemMeses = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
  ];

  const uniqueMeses = useMemo(() => {
    const mesesSet = new Set();
    data.forEach((item) => {
      if (item.MesValor) {
        mesesSet.add(item.MesValor);
      }
    });
    const mesesArray = Array.from(mesesSet);
    return ordemMeses.filter((mes) => mesesArray.includes(mes));
  }, [data]);

  const displayData = useMemo(() => {
    return data.filter((d) => {
      const matchName = selectedName ? d.Nome === selectedName : true;
      const matchSetor = selectedSetor ? d.Setor === selectedSetor : true;
      const matchAno = selectedAno ? d.Ano === selectedAno : true;
      const matchMes = selectedMes ? d.MesValor === selectedMes : true;
      return matchName && matchSetor && matchAno && matchMes;
    });
  }, [selectedName, selectedSetor, selectedAno, selectedMes, data]);

  const handleExportCsv = () => {
    exportCsv(displayData, "colaboradores_filtrados.csv");
  };

  const limparFiltros = () => {
    setSelectedName("");
    setSelectedSetor("");
    setSelectedAno("");
    setSelectedMes("");
    setFiltrosLimpos(true);
    setTimeout(() => setFiltrosLimpos(false), 3000);
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
    backgroundColor: theme.tableBackground || theme.background,
    color: theme.text,
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    padding: "32px",
    marginTop: "32px"
  }}
>

          <h3
  style={{
    marginBottom: "16px",
    fontSize: "20px",
    color: theme.text // <-- Agora com a cor correta do tema
  }}
>
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
              📝 Registrar para {displayData[0].Nome}
            </button>

            {filtrosAtivos && (
              <button
                onClick={limparFiltros}
                style={{
                  ...styles.exportButton,
                  backgroundColor: "#f44336",
                  minWidth: "160px"
                }}
              >
                🧹 Limpar Filtros
              </button>
            )}
          </div>

          {filtrosLimpos && (
            <p style={{ color: "#4caf50", marginTop: "12px", fontWeight: "bold" }}>
              ✅ Filtros removidos
            </p>
          )}

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

