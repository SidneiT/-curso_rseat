import React, { useState } from 'react';
import Header from './Components/Header';
import ImageKid from './assets/kid.jpg';
import './App.css';

function App() {
  const [projects, setProjects] = useState([
    'Desenvolvimento de APP',
    'Front-end web'
  ]);

  function handleAddProjeto() {
    setProjects([...projects, 'Novo Projeto' + Math.random()]);
  }

  return (
    <>
      <Header title='Projetos' />

      <img src={ImageKid} alt='Jumping kid' width='300' />

      <ul>
        {projects.map((project, key) => (
          <li key={key}>{project}</li>
        ))}
      </ul>

      <button type='button' onClick={handleAddProjeto}>
        Adicionar
      </button>
    </>
  );
}

export default App;
