import RARITY from '../model/pokemon-rarity';

export const getPokemonRarity = () => {
  const x = Math.random();
  if (x <= 0.6) return RARITY.COMMON;
  if (x > 0.6 && x <= 0.85) return RARITY.UNCOMMON;
  if (x > 0.85 && x <= 0.95) return RARITY.RARE;
  return RARITY.LEGENDARY;
};

export const getHistogramPokemonRarity = () => {
  var x = {};
  var total = 1000000;
  for (var i = 0; i < total; i++) {
    var xfinal = getPokemonRarity();
    x[xfinal] = x[xfinal] ? x[xfinal] + 1 : 1;
  }

  var normalCSV = Object.keys(x)
    .map(z => [z, x[z] / total])
    .reduce((csv, z) => `${csv}${z[0]};${z[1]}\r\n`, '');

  var blob = new Blob([normalCSV], { type: 'text/csv;charset=utf-8;' });
  var filename = 'normal_CSV.csv';
  var link = document.createElement('a');
  if (link.download !== undefined) {
    // feature detection
    // Browsers that support HTML5 download attribute
    var url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
