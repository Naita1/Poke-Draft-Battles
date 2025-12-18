import React, { useEffect, useRef } from "react";
import { useBattleEngine } from "../hooks/useBattleEngine";
import "../styles/BattleScreen.css";

const BattleScreen = ({ playerTeam, opponentTeam, onReset }) => {
  const { gameState, startBattle, attack, reset } = useBattleEngine();
  const { 
    playerTeam: currentPlayerTeam, 
    opponentTeam: currentOpponentTeam, 
    activePlayerIndex, 
    activeOpponentIndex, 
    logs, 
    turn, 
    status 
  } = gameState;

   const logsEndRef = useRef(null);

   useEffect(() => {
    startBattle(playerTeam, opponentTeam);
   }, []); 

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

   const handleReset = () => {
    reset(); 
    onReset(); 
  };

   if (status === "VICTORY") {
    return (
      <div className="battle-screen overlay">
        <div className="modal victory">
          <h1> VITÓRIA!</h1>
          <p>Você derrotou todos os oponentes!</p>
          <button onClick={handleReset}>Jogar Novamente</button>
        </div>
      </div>
    );
  }

  if (status === "DEFEAT") {
    return (
      <div className="battle-screen overlay">
        <div className="modal defeat">
          <h1> DERROTA...</h1>
          <p>Seus Pokémon foram derrotados.</p>
          <button onClick={handleReset}>Tentar Novamente</button>
        </div>
      </div>
    );
  }

   if (status === "IDLE" || !currentPlayerTeam.length) {
    return <div className="loading">Preparando Arena...</div>;
  }

   const activePlayer = currentPlayerTeam[activePlayerIndex];
  const activeEnemy = currentOpponentTeam[activeOpponentIndex];

  return (
    <div className="battle-screen">
       <div className="arena">
        
         <div className="fighter-zone opponent-zone">
          <div className="stat-box">
            <h3>{activeEnemy.name}</h3>
            <div className="hp-bar-wrapper">
              <div 
                className="hp-fill enemy" 
                style={{ width: `${(activeEnemy.currentHp / activeEnemy.stats.hp) * 100}%` }}
              />
            </div>
            <p>HP: {activeEnemy.currentHp}/{activeEnemy.stats.hp}</p>
          </div>
          <div className="sprite-container">
              <img src={activeEnemy.image} alt={activeEnemy.name} className="battle-sprite enemy-sprite" />
          </div>
        </div>

         <div className="fighter-zone player-zone">
          <div className="sprite-container">
             <img src={activePlayer.image} alt={activePlayer.name} className="battle-sprite player-sprite" />
          </div>
          <div className="stat-box">
            <h3>{activePlayer.name}</h3>
            <div className="hp-bar-wrapper">
              <div 
                className="hp-fill player" 
                style={{ width: `${(activePlayer.currentHp / activePlayer.stats.hp) * 100}%` }}
              />
            </div>
            <p>HP: {activePlayer.currentHp}/{activePlayer.stats.hp}</p>
          </div>
        </div>
      </div>

       <div className="battle-hud">
        <div className="battle-logs">
          {logs.map((log, index) => (
            <p key={index} className="log-entry">{log}</p>
          ))}
          <div ref={logsEndRef} />
        </div>

        <div className="battle-actions">
          <div className="turn-indicator">
            {turn === "PLAYER" ? "Sua Vez!" : "Vez do Oponente..."}
          </div>
          <button 
            className="attack-btn"
            onClick={attack}
            disabled={turn !== "PLAYER"}
          >
             ATACAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default BattleScreen;