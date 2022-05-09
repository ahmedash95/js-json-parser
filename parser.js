const { Tokenizer } = require('./tokenizer');

class Parser {
  constructor(string) {
    this.tokenizer = new Tokenizer(string);
    this.lookahead = this.tokenizer.next();
  }

  parse() {
    const statements = this.statements();
    
    return statements.length === 1 ? statements[0] : statements;
  }

  statements(stopLookahead = null) {
    if(this.lookahead && this.lookahead.type === stopLookahead) {
      return [];
    }

    const expressions = [this.statement()];

    while (this.lookahead && this.lookahead.type == ',' && this._consume(',')) {
      expressions.push(this.statement());
    }

    return expressions;
  }

  statement() {
    return this.propertyExpression();
  }

  propertyExpression() {
    let left = this.expression();

    while (left.type == "StringLiteral" && this.lookahead && this.lookahead.type === ':') {
      this._consume(':');
      left = {
        type: 'PropertyExpression',
        key: left,
        value: this.expression()
      }
    }

    return left;
  }

  expression() {
    switch (this.lookahead.type) {
      case '[':
        return this.array();
      case '{':
        return this.object();
      default:
        return this.primaryExpression();
    }
  }

  object() {
    this._consume('{');
    const body = this.statements('}');
    this._consume('}');

    return {
      type: 'Object',
      body
    }
  }


  array() {
    this._consume('[');
    const body = this.statements(']');
    this._consume(']');

    return {
      type: 'Array',
      body
    }
  }

  primaryExpression() {
    switch (this.lookahead.type) {
      case 'STRING':
        return this.stringLiteral();
      case 'NUMBER':
        return this.numberLiteral();
      case 'NULL':
        return this.nullLiteral();
      case 'TRUE':
        return this.booleanLiteral(true);
      case 'FALSE':
        return this.booleanLiteral(false);
      default:
        throw new Error(`Unexpected expression: ${this.lookahead.type}`);
    }
  }

  stringLiteral() {
    const token = this._consume('STRING');

    return {
      type: 'StringLiteral',
      value: token.value.slice(1, -1)
    }
  }

  numberLiteral() {
    const token = this._consume('NUMBER');

    return {
      type: 'NumberLiteral',
      value: Number(token.value)
    }
  }

  nullLiteral() {
    this._consume('NULL');
    
    return {
      type: 'NullLiteral'
    }
  }

  booleanLiteral(bool) {
    this._consume(bool ? 'TRUE' : 'FALSE');

    return {
      type: 'BooleanLiteral',
      value: bool
    }
  }


  _consume(type) {
    if(this.lookahead == null) {
      throw new SyntaxError(`Unexpected end of input`);
    }

    if(this.lookahead.type !== type) {
      throw new SyntaxError(`Expected ${type} but got ${this.lookahead.type}`);
    }

    const token = this.lookahead;
    
    this.lookahead = this.tokenizer.next();
    
    return token;
  }

}

module.exports = {
  Parser
}