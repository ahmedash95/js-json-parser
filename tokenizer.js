const Spec = [
  // White space
  [/^\s+/, null],
  
  // Symbols
  [/^\[/, '['],
  [/^\]/, ']'],
  [/^\{/, '{'],
  [/^\}/, '}'],
  [/^\,/, ','],
  [/^\:/, ':'],

  // Keywords
  [/^\btrue\b/, "TRUE"],
  [/^\bfalse\b/, "FALSE"],
  [/^\bnull\b/, "NULL"],

  // Literals
  [/^"[^"]*"/, 'STRING'],
  [/^\d+/, 'NUMBER'],

]

class Tokenizer {
  constructor(str) {
    this._str = str;
    this._cur = 0;
  }

  peek() {
    if (this._cur == this._str.length) return null;

    return this._str[this._cur];
  }

  next() {
    if (!this.peek()) return null;

    const str = this._str.substring(this._cur);

    for (const [ptrn, type] of Spec) {
      const token = this._match(ptrn, str);

      if (token == null) {
        continue;
      }

      if (type == null) {
        return this.next();
      }

      return {
        type,
        value: token
      }
    }

    throw new SyntaxError(`Unexpected token [${str[0]}]`);
  }

  _match(ptrn, str) {
    const match = ptrn.exec(str);
    if (match == null) return null;

    this._cur += match[0].length;

    return match[0];
  }

}

module.exports = {
  Tokenizer
}