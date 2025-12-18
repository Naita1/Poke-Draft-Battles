import "./PokemonCard.css";

const typeColors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  water: "#DEF3FD",
  electric: "#FCF7DE",
  rock: "#d5d5d4",
  ground: "#f4e7da",
  default: "#fff",
};

const PokemonCard = ({ pokemon, onClick, isSelected, showHp, isEnemy }) => {
  const bgColor = typeColors[pokemon.types[0]] || typeColors.default;

  const hpPercentage = showHp 
    ? (pokemon.currentHp / pokemon.stats.hp) * 100 
    : 100;

  const getHpColor = () => {
    if (hpPercentage > 50) return "#4caf50"; 
    if (hpPercentage > 20) return "#ffeb3b"; 
    return "#f44336"; 
  };

  return (
    <div 
      className={`pokemon-card ${isSelected ? "selected" : ""} ${isEnemy ? "enemy" : ""}`}
      style={{ backgroundColor: bgColor }}
      onClick={() => onClick && onClick(pokemon)}
    >
      <div className="card-header">
        <span className="hp-text">
            {showHp ? `${pokemon.currentHp}/${pokemon.stats.hp}` : `HP ${pokemon.stats.hp}`}
        </span>
      </div>

      <div className="image-container">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>

      <h3 className="poke-name">{pokemon.name}</h3>
      
      <div className="types">
        {pokemon.types.map(t => <span key={t} className="type-badge">{t}</span>)}
      </div>

      <div className="stats-row">
        <span> {pokemon.stats.attack}</span>
        <span> {pokemon.stats.defense}</span>
      </div>

      {showHp && (
        <div className="hp-bar-container">
          <div 
            className="hp-fill" 
            style={{ width: `${hpPercentage}%`, backgroundColor: getHpColor() }} 
          />
        </div>
      )}
    </div>
  );
};

export default PokemonCard;