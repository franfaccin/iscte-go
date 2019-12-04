import { pokemonList } from '../config/pokemon-list.js';
import { Pokemon } from '../model/Pokemon.js';
import { MAX_HEIGHT, MAX_WIDTH } from '../config/config.js';
import RARITY from '../model/pokemon-rarity.js';

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

const getPokemonRarity = () => {
  const x = Math.random();
  if (x <= 0.6)
    return RARITY.COMMON;
  if (x > 0.6 && x <= 0.85)
    return RARITY.UNCOMMON;
  if (x > 0.85 && x <= 0.95)
    return RARITY.RARE;
  return RARITY.LEGENDARY;
}