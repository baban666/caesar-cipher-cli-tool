const ALFABET_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ALFABET_LOWER = ALFABET_UPPER.toLowerCase();
const { Transform } = require('stream');

class TransformStream extends Transform {
  constructor(options) {
    super(options);
    this.modifyFn = options.modifyFn;
    this.shift = options.shift;
  }
  _transform(chunk, encoding, callback) {
    this.push(this.modifyFn(chunk.toString(), this.shift));
    callback();
  }
}

const modifySymbol = (symbol, direction, delta) => {
  const shift = +delta;
  let system;
  if (ALFABET_LOWER.includes(symbol)) system = ALFABET_LOWER;
  if (ALFABET_UPPER.includes(symbol)) system = ALFABET_UPPER;

  if (system && system.includes(symbol)) {
    const index = system.indexOf(symbol);
    const { length } = system;
    let newIndex;
    if (direction === 'decode') {
      newIndex = (index + shift) % length;
    } else {
      newIndex = (length + index - shift) % length;
    }
    return system[newIndex];
  }
  return symbol;
};

const modifyString = (str, direction, value) => {
  return [...str]
    .map(symbol => modifySymbol(symbol, direction, value))
    .join('');
};

const encodeString = (str, value) => modifyString(str, 'encode', value);
const decodeString = (str, value) => modifyString(str, 'decode', value);

module.exports = {
  encode: encodeString,
  decode: decodeString,
  TransformStream
};
