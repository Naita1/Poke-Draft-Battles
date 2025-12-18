import axios from "axios";

export const gameApi = axios.create({
  baseURL: "/api", 
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 10000,
});