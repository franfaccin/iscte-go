import { pokemonListComplete } from '../config/pokemon-list.js';
import { Pokemon } from '../model/Pokemon.js';
import { getPositionX } from './continua-01-position-x.js';
import { getPositionY } from './continua-01-position-y.js';
import { getVAIsShiny } from './04-shiny.js';
import { getPokemonRarity } from './01-histograma-pokemon-rarity.js';

export const getNewPokemon = () => {
  const pokemonData = getPokemonData();
  const x = getPositionX();
  const y = getPositionY();
  const isShiny = getVAIsShiny();
  return new Pokemon({pokemonData, x, y, isShiny});
}

const getPokemonData = () => {
  const rarity = getPokemonRarity();
  const filteredPokemons = pokemonListComplete.filter(pokemon => pokemon.rarity === rarity);
  const randomPokemonIndex = parseInt(Math.random() * filteredPokemons.length);
  return filteredPokemons[randomPokemonIndex];
}
