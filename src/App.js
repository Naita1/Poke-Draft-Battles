import React, { useState, useEffect } from "react";
import DraftScreen from "./pages/DraftScreen";
import BattleScreen from "./pages/BattleScreen";
import { PokemonService } from "./services/PokemonService";
import { TypeService } from "./services/TypeService";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("LOADING"); 
  const [myTeam, setMyTeam] = useState([]);
  const [enemyTeam, setEnemyTeam] = useState([]);

  useEffect(() => {
    const initGame = async () => {
      await TypeService.loadTypeChart();
      setScreen("DRAFT");
    };
    initGame();
  }, []);

  const handleStartBattle = async (selectedTeam) => {
    try {
      setMyTeam(selectedTeam);
      
      const enemies = await PokemonService.getOpponentTeam();
      setEnemyTeam(enemies);

      setScreen("BATTLE");
    } catch (error) {
      console.error("Erro ao iniciar:", error);
      alert("Erro ao buscar oponentes. Verifique o servidor.");
    }
  };

  const handleReset = () => {
    setScreen("DRAFT");
    setMyTeam([]);
    setEnemyTeam([]);
  };

  if (screen === "LOADING") {
    return <div className="loading">Carregando Pokédex...</div>;
  }

  return (
    <div className="App">
      {screen === "DRAFT" && (
        <DraftScreen onStartBattle={handleStartBattle} />
      )}

      {screen === "BATTLE" && (
        <BattleScreen 
          playerTeam={myTeam} 
          opponentTeam={enemyTeam} 
          onReset={handleReset}
        />
      )}
    </div>
  );
}

export default App;