export const getCatchRate = pokeball_type_p => {
  let x;
  do {
    x = Math.random();
  } while (x === 0);
  var xfinal = parseInt(Math.log(x) / Math.log(1 - pokeball_type_p)) + 1;
  return xfinal > 10 ? 10 : xfinal;
};

export const getHistogramCatchRate = () => {
  var x = {};
  var total = 1000000;
  for (var i = 0; i < total; i++) {
    var xfinal = getCatchRate(0.3);
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
