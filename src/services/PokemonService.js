import { gameApi } from "./apiInstances"; 

export const PokemonService = {
  getRandomDraft: async () => {
    try {
      const { data } = await gameApi.get("/random-pokemons?count=5");
      return data;
    } catch (error) {
      console.error("Erro ao buscar draft:", error);
      throw error; 
    }
  },

  getOpponentTeam: async () => {
    try {
      const { data } = await gameApi.get("/opponent-pokemons");
      return data;
    } catch (error) {
      console.error("Erro ao buscar time oponente:", error);
      throw error;
    }
  }
};