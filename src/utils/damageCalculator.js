import { TypeService } from "../services/TypeService";

export const calculateDamage = (attacker, defender) => {
  const atkStat = attacker.stats?.attack || 50; 
  const defStat = defender.stats?.defense || 50;
  
  const attackerType = attacker.types && attacker.types.length > 0 ? attacker.types[0] : 'normal';
  const defenderTypes = defender.types || ['normal'];

  const typeChart = TypeService.getChart();
  let typeMultiplier = 1.0;

  if (typeChart[attackerType]) {
    defenderTypes.forEach((defType) => {
      if (typeChart[attackerType].strong.includes(defType)) typeMultiplier *= 2.0;
      if (typeChart[attackerType].weak.includes(defType)) typeMultiplier *= 0.5;
      if (typeChart[attackerType].immune?.includes(defType)) typeMultiplier *= 0;
    });
  }

  const basePower = Math.floor(Math.random() * 20) + 15;
  const statRatio = atkStat / defStat;
  
  let finalDamage = Math.floor(basePower * statRatio * typeMultiplier);

  if (finalDamage <= 0) {
    finalDamage = 1;
  }

  return finalDamage;
};