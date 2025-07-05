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
  );
};
export default Home;

