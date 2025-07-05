import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Papa from "papaparse";

import { styles } from "./styles";
import { lightTheme, darkTheme } from "./theme";
import { exportCsv } from "./utils/exportCsv";
import SearchInput from "./components/SearchInput";
import NameDropdown from "./components/NameDropdown";
import DataTable from "./components/DataTable";
import DarkModeToggle from "./components/DarkModeToggle";
import PerformanceChart from "./components/PerformanceChart";
import Registro from "./pages/Registro";

// ✅ Botão que navega até a tela de registro
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
        padding: '8px 16px',
        backgroundColor: '#4caf50',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '12px'
      }}
    >
      📝 Registrar para {colaborador.nome}
    </button>
  );
};

function App() {
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [selectedName, setSelectedName] = useState("");
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
          transform: (v) => v.trim(),
        });
        setData(results.data);
      });
  }, []);

  const uniqueNames = useMemo(() => {
    const names = new Set();
    data.forEach((item) => item.Nome && names.add(item.Nome));
    return Array.from(names).sort();
  }, [data]);

  const filteredNames = useMemo(() => {
    if (!filterText.trim()) return uniqueNames;
    return uniqueNames.filter((n) =>
      n.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [filterText, uniqueNames]);

  const displayData = useMemo(() => {
    if (selectedName) {
      return data.filter((d) => d.Nome === selectedName);
    }
    if (filterText.trim()) {
      return data.filter((d) =>
        d.Nome.toLowerCase().includes(filterText.toLowerCase())
      );
    }
    return [];
  }, [selectedName, filterText, data]);

  const handleSelectChange = (e) => {
    setSelectedName(e.target.value);
    setFilterText("");
  };

  const handleInputChange = (e) => {
    setFilterText(e.target.value);
    setSelectedName("");
  };

  const handleExportCsv = () => {
    exportCsv(displayData, "colaboradores_filtrados.csv");
  };

  const Home = () => (
    <div
      style={{
        ...styles.container,
        backgroundColor: theme.background,
        color: theme.text,
      }}
    >
      <DarkModeToggle
        darkMode={darkMode}
        onToggle={() => setDarkMode(!darkMode)}
      />

      <h2 style={styles.title}>Buscar Colaborador Versão 4</h2>

      <div style={{ display: "flex", gap: "8px", marginBottom: 20, flexWrap: "wrap" }}>
        <SearchInput
          value={filterText}
          onChange={handleInputChange}
          suggestions={uniqueNames}
          onSelect={(nome) => {
            setFilterText(nome);
            setSelectedName("");
          }}
        />

        <NameDropdown
          names={filteredNames}
          selected={selectedName}
          onChange={handleSelectChange}
        />
      </div>

      {(filterText || selectedName) &&
        displayData.length === 0 && data.length > 0 && (
          <p style={styles.noResult}>🔍 Nenhum resultado encontrado.</p>
        )}

      {displayData.length > 0 && (
        <>
          <DataTable rows={displayData} theme={theme} />

          <div style={{ display: 'flex', gap: '12px', marginTop: '12px', flexWrap: 'wrap' }}>
            <button onClick={handleExportCsv} style={styles.exportButton}>
              📤 Exportar CSV
            </button>

            <BotaoRegistro colaborador={displayData[0]} />
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

