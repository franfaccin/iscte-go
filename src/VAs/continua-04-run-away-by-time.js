const getRunAwayByTime = () => {
  var u = Math.random();
  return 10 + 50 * Math.sqrt(u);
}

var x = {}
var total = 1000000
for(var i = 0; i < total; i++) {
 	var xfinal = parseFloat(getRunAwayByTime()).toFixed(5);
	x[xfinal] = x[xfinal] ? x[xfinal] + 1 : 1
}

var normalCSV = Object.keys(x).map(z => [z, x[z]/total]).reduce((csv, z) => `${csv}${z[0]};${z[1]}\r\n`, '')

var blob = new Blob([normalCSV], { type: 'text/csv;charset=utf-8;' });
var filename = 'normal_CSV.csv'
var link = document.createElement("a");
if (link.download !== undefined) { // feature detection
    // Browsers that support HTML5 download attribute
    var url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
