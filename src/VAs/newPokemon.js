import { pokemonList } from '../config/pokemon-list.js';
import { Pokemon } from '../model/Pokemon.js';
import { MAX_HEIGHT, MAX_WIDTH } from '../config/config.js';

const TOTAL_POKEMONS = pokemonList.length;
const CHANCE_SHINY = 0.10;

export const getNewPokemon = () => {
  const number = getPokemonNumber();
  const x = getVAXposition();
  const y = getVAYposition();
  const isShiny = getVAIsShiny();
  return new Pokemon({number, x, y, isShiny});
}

const getPokemonNumber = () => {
  return parseInt(Math.random() * TOTAL_POKEMONS);
}

const getVAIsShiny = () => {
  return Math.random() < CHANCE_SHINY;
}

const getVAXposition = () => {
  return parseInt(Math.random() * MAX_WIDTH);
}

const getVAYposition = () => {
  return parseInt(Math.random() * MAX_HEIGHT);
}
