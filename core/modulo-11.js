const module11 = (code) => {
  let factor = 2;
  let i = code.length - 1;
  let list = []
  for (i; i >= 0; i--) {
    if (factor == 8) {
      factor = 2;
    }
    list.push(code[i] * factor);
    factor++;
  }

  value = list.reduce((a, b) => a + b);

  return 11 - (value % 11);
}

module.exports = module11;
