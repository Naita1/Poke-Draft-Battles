const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors'); 

const app = express();
const port = 3001;

app.use(cors());
app.use(express.static(path.join(__dirname, 'front')));  

const generateRandomIDs = (count, max = 898) => {
  const ids = new Set();
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * max) + 1);
  }
  return Array.from(ids);
};

const formatPokemonData = (data) => {
  const stats = {};
  data.stats.forEach((s) => {
    stats[s.stat.name] = s.base_stat;
  });

  return {
    id: data.id,
    name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
    image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
    types: data.types.map((type) => type.type.name),
    height: data.height / 10,
    weight: data.weight / 10,
    experience: data.base_experience,
    abilities: data.abilities.map((a) => a.ability.name),
    stats: {
      hp: stats.hp,
      attack: stats.attack,
      defense: stats.defense,
      speed: stats.speed
    }
  };
};

app.get('/', (req, res) => {
  res.send('PokeDraft Server Online!');
});

app.get('/api/random-pokemons', async (req, res) => {
  try {
    const count = 5;
    const ids = generateRandomIDs(count);
    console.log(`[Draft] Buscando IDs: ${ids}`);

    const promises = ids.map(id => axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`));
    const responses = await Promise.all(promises);

    const pokemons = responses.map(r => formatPokemonData(r.data));
    res.json(pokemons);
  } catch (error) {
    console.error('Erro no draft:', error.message);
    res.status(500).json({ error: 'Erro ao buscar Pokémons' });
  }
});

app.get('/api/opponent-pokemons', async (req, res) => {
  try {
    const count = 3;
    const ids = generateRandomIDs(count);
    console.log(`[Oponente] Buscando IDs: ${ids}`);

    const promises = ids.map(id => axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`));
    const responses = await Promise.all(promises);

    const opponents = responses.map(r => formatPokemonData(r.data));
    res.json(opponents);
  } catch (error) {
    console.error('Erro no oponente:', error.message);
    res.status(500).json({ error: 'Erro ao buscar Oponentes' });
  }
});

app.listen(port, () => {
  console.log(` Servidor rodando em http://localhost:${port}`);
});