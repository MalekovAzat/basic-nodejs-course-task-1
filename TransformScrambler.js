const { Transform } = require("stream");

class Scrambler extends Transform {
  constructor({ options, shift, mode }) {
    super(options);
    this.alphabetPower = 26;
    this.upperCaseShift = 65;
    this.lowerCaseShift = 97;
    this.shift = shift;
    this.mode = mode;
  }

  _transform(chunk, encoding, callback) {
    const chunkStr = chunk.toString("utf8");

    let res = "";
    for (const symbol of chunkStr) {
      //   res = res.concat(this._shiftSymbol(symbol, this.shift));
      res += this._shiftSymbol(symbol, this.shift, this.mode);
    }

    callback(null, res);
  }

  _shiftSymbol(originSymbol, shift = 0, mode = "+") {
    const symbolPos = originSymbol.charCodeAt(0);
    let asciiShift = 0;

    if (
      symbolPos >= this.lowerCaseShift &&
      symbolPos < this.lowerCaseShift + this.alphabetPower
    ) {
      asciiShift = this.lowerCaseShift;
    } else if (
      symbolPos >= this.upperCaseShift &&
      symbolPos < this.upperCaseShift + this.alphabetPower
    ) {
      asciiShift = this.upperCaseShift;
    }

    if (asciiShift === 0) {
      return originSymbol;
    }

    return String.fromCharCode(
      (((mode === "+" ? 1 : -1) * (symbolPos - asciiShift) +
        shift +
        this.alphabetPower) %
        this.alphabetPower) +
        asciiShift
    );
  }
}

module.exports = Scrambler;
