import { useReducer, useEffect } from "react";
import { calculateDamage } from "../utils/damageCalculator"; 

const initialState = {
  status: "IDLE", 
  turn: "PLAYER", 
  playerTeam: [],
  opponentTeam: [],
  activePlayerIndex: 0,
  activeOpponentIndex: 0,
  logs: [], 
};

function battleReducer(state, action) {
  switch (action.type) {
    case "SETUP_BATTLE":
      return {
        ...initialState, 
        status: "BATTLE",
        playerTeam: action.payload.playerTeam.map(p => ({ ...p, currentHp: p.stats.hp })), 
        opponentTeam: action.payload.opponentTeam.map(p => ({ ...p, currentHp: p.stats.hp })),
      };

    case "PLAYER_ATTACK": {
      const attacker = state.playerTeam[state.activePlayerIndex];
      const defender = state.opponentTeam[state.activeOpponentIndex];
      
      const damage = calculateDamage(attacker, defender);
      const newHp = Math.max(0, defender.currentHp - damage); 

      const newOpponentTeam = [...state.opponentTeam];
      newOpponentTeam[state.activeOpponentIndex] = { ...defender, currentHp: newHp };

      const newLogs = [...state.logs, `${attacker.name} causou ${damage} de dano em ${defender.name}!`];

      if (newHp === 0) {
        const isVictory = state.activeOpponentIndex >= state.opponentTeam.length - 1;
        
        if (isVictory) {
           return { ...state, opponentTeam: newOpponentTeam, status: "VICTORY", logs: [...newLogs, "Você venceu a batalha!"] };
        } else {
            return { 
             ...state, 
             opponentTeam: newOpponentTeam, 
             activeOpponentIndex: state.activeOpponentIndex + 1,
             turn: "PLAYER", 
             logs: [...newLogs, `${defender.name} desmaiou! Oponente enviou o próximo.`]
           };
        }
      }

       return {
        ...state,
        opponentTeam: newOpponentTeam,
        logs: newLogs,
        turn: "CPU"
      };
    }

    case "CPU_ATTACK": {
      const attacker = state.opponentTeam[state.activeOpponentIndex];
      const defender = state.playerTeam[state.activePlayerIndex];

      const damage = calculateDamage(attacker, defender);
      const newHp = Math.max(0, defender.currentHp - damage);

      const newPlayerTeam = [...state.playerTeam];
      newPlayerTeam[state.activePlayerIndex] = { ...defender, currentHp: newHp };

      const newLogs = [...state.logs, `Inimigo ${attacker.name} causou ${damage} de dano!`];

      if (newHp === 0) {
        const isDefeat = state.activePlayerIndex >= state.playerTeam.length - 1;

        if (isDefeat) {
          return { ...state, playerTeam: newPlayerTeam, status: "DEFEAT", logs: [...newLogs, "Todos seus Pokémon foram derrotados..."] };
        } else {
          return {
            ...state,
            playerTeam: newPlayerTeam,
            activePlayerIndex: state.activePlayerIndex + 1,
            turn: "PLAYER", 
            logs: [...newLogs, `${defender.name} desmaiou! Você enviou o próximo.`]
          };
        }
      }

      return {
        ...state,
        playerTeam: newPlayerTeam,
        logs: newLogs,
        turn: "PLAYER"
      };
    }

    case "RESET":
        return initialState;

    default:
      return state;
  }
}

 export const useBattleEngine = () => {
  const [gameState, dispatch] = useReducer(battleReducer, initialState);

   const startBattle = (playerTeam, opponentTeam) => {
    dispatch({ type: "SETUP_BATTLE", payload: { playerTeam, opponentTeam } });
  };

   const attack = () => {
    if (gameState.turn === "PLAYER" && gameState.status === "BATTLE") {
      dispatch({ type: "PLAYER_ATTACK" });
    }
  };

  const reset = () => dispatch({ type: "RESET" });

   useEffect(() => {
    if (gameState.turn === "CPU" && gameState.status === "BATTLE") {
       const timer = setTimeout(() => {
        dispatch({ type: "CPU_ATTACK" });
      }, 1500);  

      return () => clearTimeout(timer);
    }
  }, [gameState.turn, gameState.status]);

  return { 
    gameState, 
    startBattle, 
    attack, 
    reset 
  };
};