import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const colaboradores = [
  { id: 1, nome: 'Ana' },
  { id: 2, nome: 'Carlos' },
  { id: 3, nome: 'Mariana' },
];

  return (
    <div>
      {colaboradores.map((colab) => (
        <div key={colab.id}>
          <h3>{colab.nome}</h3>
          <button onClick={() => navigate(`/registrar/${colab.id}`, { state: { colaborador: colab } })}>
            Registrar Informações
          </button>
        </div>
      ))}
    </div>
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


  <div style={{ flex: "1 1 240px" }}>
    <NameDropdown
      names={uniqueMeses}
      selected={selectedMes}
      onChange={(e) => setSelectedMes(e.target.value)}
    />
  </div>
</div>

  );
};
export default Home;

