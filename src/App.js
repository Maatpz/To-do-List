import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const[tarefas, setTarefas] = useState(() => {
    return JSON.parse(localStorage.getItem('tarefas')) || [];
  });
  const [novaTarefa, setNovaTarefa] = useState('');
  const[filtro, setFiltro] = useState('todas');

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== "") {
        setTarefas((prevTarefas) => [
            ...prevTarefas,
            { texto: novaTarefa, concluida: false, animacao: "added" }
        ]);
        setNovaTarefa("");
    }
};

  const alternarTarefa = (index) => {
    const novasTarefas = [...tarefas];
    novasTarefas[index].concluida = !novasTarefas[index].concluida;
    setTarefas(novasTarefas);
  }

  const removerTarefa = (index) => {
    const novasTarefas = [...tarefas];
    novasTarefas[index].animacao = 'removed';
    setTarefas(novasTarefas);
    
    setTimeout(() => {
      setTarefas(novasTarefas.filter((_, i) => i !== index));
    },200);
  };

  const editarTarefa = (index, novoTexto) => {
    const novasTarefas = [...tarefas];
    novasTarefas[index].texto = novoTexto;
    setTarefas(novasTarefas);
  }

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if(filtro === 'pendentes') return !tarefa.concluida;
    if(filtro === 'concluidas') return tarefa.concluida;
    return true;
  });

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      adicionarTarefa();
    } else if(e.key === 'Escape') {
    setNovaTarefa('');
  }
};

  return (
    <div className="container">
      <h1>To-Do-List</h1>
      <div className="input-area">
        <input type='text' value={novaTarefa} onChange={(e) => setNovaTarefa(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder='Digite uma tarefa'/>
        <button onClick={adicionarTarefa}>Adicionar</button>
      </div>
      <div className="filtros">
        <button onClick={() => setFiltro('todas')}>Todas</button>
        <button onClick={() => setFiltro('pendentes')}>Pendentes</button>
        <button onClick={() => setFiltro('concluidas')}>Concluídas</button>
      </div>

      <ul>
        {tarefasFiltradas.map((tarefa, index) => (
          <li key={index} className={tarefa.concluida ? 'completed' : ''}>
            <span onClick={() => alternarTarefa(index)}>{tarefa.texto}</span>
            <button onClick={() => removerTarefa(index)}>Remover</button>
            <button onClick={() => editarTarefa(index, prompt("Editar tarefa:", tarefa.texto))}>Editar</button>
          </li>
        ))}
        </ul>
    </div>
  );
}

export default App;
