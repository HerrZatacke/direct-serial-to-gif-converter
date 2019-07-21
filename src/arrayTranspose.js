const arrayTranspose = m => m[0].map((x, i) => m.map(y => y[i]));

module.exports = arrayTranspose;
