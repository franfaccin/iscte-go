import { pokemonList } from '../config/pokemon-list.json';
import { Pokemon } from '../model/Pokemon.js';
import { MAX_HEIGHT, MAX_WIDTH } from '../config/config.js';

const TOTAL_POKEMONS = pokemonList.length;
const CHANCE_SHINY = 0.10;

export const getNewPokemon = () => {
  const number = parseInt(Math.random() * TOTAL_POKEMONS);
  const x = parseInt(Math.random() * MAX_WIDTH);
  const y = parseInt(Math.random() * MAX_HEIGHT);
  const isShiny = Math.random() < CHANCE_SHINY;
  return new Pokemon({number, x, y, isShiny});
}
