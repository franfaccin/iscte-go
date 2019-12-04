export function Pokemon({pokemonData, x, y, isShiny = false}) {
  this.number = pokemonData.number;
  this.name = pokemonData.name;
  this.key = pokemonData.key;
  this.rarity = pokemonData.rarity;
  this.x = x;
  this.y = y;
  this.isShiny = isShiny;
}
