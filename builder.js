const { Parser } = require('./parser');

class JsonBuilder {
  _parse(string) {
    const p = new Parser(string);
    return p.parse();
  }

  build(string) {
    const ast = this._parse(string);
    return this._build(ast);
  }

  _build(node) {
    switch (node.type) {
      case 'Array':
        return this._buildArray(node);
      case 'Object':
        return this._buildObject(node);
      case 'StringLiteral':
      case 'NumberLiteral':
      case 'BooleanLiteral':
        return node.value;
      case 'null':
        return null;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  }

  _buildArray(node) {
    return node.body.map(element => {
      return this._build(element);
    })
  }

  _buildObject(node) {
    let obj = {};
    node.body.forEach(element => {
      obj[element.key.value] = this._build(element.value);
    })

    return obj;
  }
}

module.exports = {
  JsonBuilder
}