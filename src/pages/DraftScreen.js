import React, { useEffect, useState } from "react";
import { PokemonService } from "../services/PokemonService";
import PokemonCard from "../components/PokemonCard/PokemonCard";
import "../styles/DraftScreen.css";   

const DraftScreen = ({ onStartBattle }) => {
  const [draftPool, setDraftPool] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const loadDraft = async () => {
      try {
        const data = await PokemonService.getRandomDraft();
        setDraftPool(data);
      } catch (error) {
        alert("Erro ao carregar Draft. Verifique se o server.js está rodando!");
      } finally {
        setLoading(false);
      }
    };
    loadDraft();
  }, []);

  const handleSelect = (pokemon) => {
     if (selectedTeam.find((p) => p.id === pokemon.id)) {
      setSelectedTeam(selectedTeam.filter((p) => p.id !== pokemon.id));
    } else {
       if (selectedTeam.length < 3) {
        setSelectedTeam([...selectedTeam, pokemon]);
      }
    }
  };

  const isSelected = (id) => selectedTeam.some((p) => p.id === id);

  if (loading) return <div className="loading">Carregando Pokémons...</div>;

  return (
    <div className="draft-container">
      <header>
        <h1>Monte sua Equipe</h1>
        <p>Escolha 3 Pokémons ({selectedTeam.length}/3)</p>
      </header>

      <div className="cards-grid">
        {draftPool.map((poke) => (
          <PokemonCard
            key={poke.id}
            pokemon={poke}
            isSelected={isSelected(poke.id)}
            onClick={handleSelect}
          />
        ))}
      </div>

      <button
        className="start-btn"
        disabled={selectedTeam.length !== 3}
        onClick={() => onStartBattle(selectedTeam)}
      >
        INICIAR BATALHA 
      </button>
    </div>
  );
};

export default DraftScreen;