import { pokeApi } from "./apiInstances";

let typeChartCache = null;

export const TypeService = {
  loadTypeChart: async () => {
    if (typeChartCache) return typeChartCache;

    try {
      const { data } = await pokeApi.get("/type");
      const validTypes = data.results.filter(t => !['unknown', 'shadow'].includes(t.name));
      const promises = validTypes.map(type => pokeApi.get(type.url));
      const responses = await Promise.all(promises);

      const formattedChart = {};
      responses.forEach(response => {
        const typeData = response.data;
        formattedChart[typeData.name] = {
          strong: typeData.damage_relations.double_damage_to.map(t => t.name),
          weak: typeData.damage_relations.half_damage_to.map(t => t.name),
          immune: typeData.damage_relations.no_damage_to.map(t => t.name)
        };
      });

      typeChartCache = formattedChart;
      return formattedChart;
    } catch (error) {
      console.error("Erro ao carregar tipos:", error);
      return {}; 
    }
  },

  getChart: () => typeChartCache || {}
};