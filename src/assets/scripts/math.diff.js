/**
 * Copyright © 2015 Rodrigo Hausen <http://github.com/hausen/math.diff.js>
 * This file is made available under the GNU Affero General Public License
 * version 3.0 or higher (AGPLv3).
 */

var math_differentiation = {
  substituteConstants: false,
  eName: 'e',
  piName: 'pi'
}

function setIsConstant(node, varname) {
  if (node.type == 'ConstantNode') {
    node.isconstant = true;
    return;
  }

  if (node.type == 'SymbolNode') {
    if (node.name != varname) {
      node.isconstant = true;
    } else {
      node.isconstant = false;
    }
    return;
  }

  var constantChildren = 0;
  var numChildren = 0;
  if (node.args) {
    numChildren = node.args.length;
    for (var i=0; i<numChildren; ++i) {
      setIsConstant(node.args[i], varname);
      if (node.args[i].isconstant) {
        ++constantChildren;
      }
    }
  }
  if (constantChildren == numChildren) {
    node.isconstant = true;
  } else {
    node.isconstant = false;
  }
}

function cloneNode(node, varname) {
  if (node.type == 'ParenthesisNode') {
    return cloneNode(node.content, varname);
  }
  if (math_differentiation.substituteConstants) {
    if (node.type == 'SymbolNode' &&
        node.name == math_differentiation.piName) {
      return getConstantNode(math.pi);
    } else if (node.type == 'SymbolNode' &&
               node.name == math_differentiation.eName) {
      return getConstantNode(math.e);
    }
  }
  var newnode = node.clone();
  setIsConstant(newnode, varname);
  return newnode;
}

function unaryMinusNode(node) {
  if (node.type == 'ConstantNode') {
    var val = parseFloat(node.value);
    var ret = new math.expression.node.ConstantNode(-val);
    ret.isconstant = true;
    return ret;  
  } else if (node.type == 'OperatorNode' && node.fn == 'subtract') {
    var ret = new math.expression.node.OperatorNode('-', 'subtract',
                                                    [node.args[1],
                                                     node.args[0]]);
    ret.isconstant = (node.args[1].isconstant && node.args[0].isconstant);
    return ret;
  } else {
    var ret = new math.expression.node.OperatorNode('-', 'unaryMinus',
                                                    [node]);
    ret.isconstant = node.isconstant;
    return ret;
  }
}

function addNodes(node0, node1) {
  if (node0.type == 'ConstantNode' && node1.type == 'ConstantNode') {
    var val = parseFloat(node0.value) + parseFloat(node1.value);
    var ret = new math.expression.node.ConstantNode(val);
    ret.isconstant = true;
    return ret;  
  } else if (node0.type == 'ConstantNode' && node0.value == '0') {
    return node1;
  } else if (node1.type == 'ConstantNode' && node1.value == '0') {
    return node0;
  } else {
    var ret = new math.expression.node.OperatorNode('+', 'add',
                                                    [node0, node1]);
    ret.isconstant = (node0.isconstant && node1.isconstant);
    return ret;
  }
}

function subtractNodes(node0, node1) {
  if (node0.type == 'ConstantNode' && node1.type == 'ConstantNode') {
    var val = parseFloat(node0.value) - parseFloat(node1.value);
    var ret = new math.expression.node.ConstantNode(val);
    ret.isconstant = true;

    return ret;
  } else if (node1.type == 'ConstantNode' && node1.value == '0') {
    return node0;
  } else if (node0.type == 'ConstantNode' && node0.value == '0') {
    return unaryMinusNode(node1);
  } else {
    var ret = new math.expression.node.OperatorNode('-', 'subtract',
                                                    [node0, node1]);
    ret.isconstant = (node0.isconstant && node1.isconstant);
    return ret;
  }
}

function multiplyNodes(node0, node1) {
  if (node0.type == 'ConstantNode') {
    if (node0.value == '0') {
      return node0;
    } else if (node1.type == 'ConstantNode') {
      var val = parseFloat(node0.value) * parseFloat(node1.value);
      var ret = new math.expression.node.ConstantNode(val);
      ret.isconstant = true;
      return ret;  
    } else if (node1.type == 'OperatorNode' && node1.fn == 'multiply'
               && (node1.args[0].type == 'ConstantNode'
                   || node1.args[1].type == 'ConstantNode') ) {
      if (node1.args[0].type == 'ConstantNode' &&
          node1.args[1].type == 'ConstantNode') {
        var val = parseFloat(node0.value) * parseFloat(node1.args[0].value)
                  * parseFloat(node1.args[1].value);
        var ret = new math.expression.node.ConstantNode(val);
        ret.isconstant = true;
        return ret;  
      } else if (node1.args[0].type == 'ConstantNode') {
        var val = parseFloat(node0.value) * parseFloat(node1.args[0].value);
        var constNode = new math.expression.node.ConstantNode(val);
        constNode.isconstant = true;
        var n = new math.expression.node.OperatorNode('*', 'multiply',
                                                      [constNode,
                                                       node1.args[1]]);
        n.isconstant = node1.args[1].isconstant;
        return n;
      } else {
        var val = parseFloat(node0.value) * parseFloat(node1.args[1].value);
        var constNode = new math.expression.node.ConstantNode(val);
        constNode.isconstant = true;
        var n = new math.expression.node.OperatorNode('*', 'multiply',
                                                      [constNode,
                                                       node1.args[0]]);
        n.isconstant = node1.args[0].isconstant;
        return n;
      }
    } else if (node0.value == '1') {
      return node1;
    } else if (node0.value == '-1') {
      return unaryMinusNode(node1);
    } else {
      var n = new math.expression.node.OperatorNode('*', 'multiply',
                                                    [node0, node1]);
      n.isconstant = node1.isconstant;
      return n;
    }
  } else if (node1.type == 'ConstantNode') {
    return multiplyNodes(node1, node0);
  } else {
    var n = new math.expression.node.OperatorNode('*', 'multiply',
                                                  [node0, node1]);
    n.isconstant = (node0.isconstant && node0.isconstant);
    return n;
  }
}

function divideNodes(node0, node1) {
  if (node1.type == 'ConstantNode' && node1.value == '1') {
    return node0;
  } else if (node1.type == 'ConstantNode' && node1.value == '-1') {
    return multiplyNodes(node0, node1);
  } else if (node0.type == 'ConstantNode' && node0.value == '0') {
    return node0;
  } else if (node0.type == 'ConstantNode' && node1.type == 'ConstantNode') {
    var val = parseFloat(node0.value) / parseFloat(node1.value);
    var ret = new math.expression.node.ConstantNode(val);
    ret.isconstant = true;
    return ret;  
  }
  var n = new math.expression.node.OperatorNode('/', 'divide',
                                                [node0, node1]);
  n.isconstant = (node0.isconstant && node0.isconstant);
  return n;
}

function powNodes(node0, node1) {
  // TODO: how to deal with 0^0?
  if (node1.type == 'ConstantNode' && node1.value == '1' ||
      node0.type == 'ConstantNode' && node0.value == '0' ||
      node0.type == 'ConstantNode' && node0.value == '1') {
    return node0;
  } else if (node1.type == 'ConstantNode' && node1.value == '0') {
    return getConstantNode(1);
  }
  var node = new math.expression.node.OperatorNode('^', 'pow',
                                                   [node0, node1]);
  node.isconstant = (node0.isconstant && node1.isconstant);
  return node;
}

function logNode(node) {
  if (node.type == 'ConstantNode' && node.value == '1') {
    return getConstantNode(0);
  } else if (node.type == 'ConstantNode' && node.value == math.e) {
    return getConstantNode(1);
  } else if (node.type == 'SymbolNode' &&
             node.name == math_differentiation.eName) {
    return getConstantNode(1);
  }
  var n = new math.expression.node.FunctionNode('log', [node]);
  n.isconstant = node.isconstant;
  return n;
}

function sinNode(node) {
  if (node.type == 'ConstantNode') {
    var value = math.sin(parseFloat(node.value));
    var ret = new math.expression.node.ConstantNode(value);
    ret.isconstant = true;
    return ret;
  } else if (node.type == 'SymbolNode' &&
             node.name == math_differentiation.piName) {
    return getConstantNode(0);
  } 
  var n = new math.expression.node.FunctionNode('sin', [node]);
  n.isconstant = node.isconstant;
  return n;
}

function cosNode(node) {
  if (node.type == 'ConstantNode') {
    var value = math.cos(parseFloat(node.value));
    var ret = new math.expression.node.ConstantNode(value);
    ret.isconstant = true;
    return ret;
  } else if (node.type == 'SymbolNode' &&
             node.name == math_differentiation.piName) {
    return getConstantNode(-1);
  } 
  var n = new math.expression.node.FunctionNode('cos', [node]);
  n.isconstant = node.isconstant;
  return n;
}

function tanNode(node) {
  if (node.type == 'ConstantNode') {
    var value = math.tan(parseFloat(node.value));
    var ret = new math.expression.node.ConstantNode(value);
    ret.isconstant = true;
    return ret;
  } else if (node.type == 'SymbolNode' &&
             node.name == math_differentiation.piName) {
    return getConstantNode(0);
  } 
  var n = new math.expression.node.FunctionNode('tan', [node]);
  n.isconstant = node.isconstant;
  return n;
}

function secNode(node) {
  if (node.type == 'ConstantNode') {
    var value = math.sec(parseFloat(node.value));
    var ret = new math.expression.node.ConstantNode(value);
    ret.isconstant = true;
    return ret;
  } else if (node.type == 'SymbolNode' &&
             node.name == math_differentiation.piName) {
    return getConstantNode(-1);
  } 
  var n = new math.expression.node.FunctionNode('sec', [node]);
  n.isconstant = node.isconstant;
  return n;
}

function cscNode(node) {
  if (node.type == 'ConstantNode') {
    var value = math.csc(parseFloat(node.value));
    var ret = new math.expression.node.ConstantNode(value);
    ret.isconstant = true;
    return ret;
  }
  var n = new math.expression.node.FunctionNode('csc', [node]);
  n.isconstant = node.isconstant;
  return n;
}

function cotNode(node) {
  if (node.type == 'ConstantNode') {
    var value = math.cot(parseFloat(node.value));
    var ret = new math.expression.node.ConstantNode(value);
    ret.isconstant = true;
    return ret;
  }
  var n = new math.expression.node.FunctionNode('cot', [node]);
  n.isconstant = node.isconstant;
  return n;
}

function funcNode(node, funcname) {
  var n = new math.expression.node.FunctionNode(funcname, [node]);
  n.isconstant = node.isconstant;
  return n;
}

function diffUnaryMinus(node, varname) {
  return unaryMinusNode(diff(node.args[0], varname));
}

function diffAdd(node, varname) {
  var newnode0 = diff(node.args[0], varname);
  var newnode1 = diff(node.args[1], varname);
  return addNodes(newnode0, newnode1);
}

function diffSubtract(node, varname) {
  var newnode0 = diff(node.args[0], varname);
  var newnode1 = diff(node.args[1], varname);

  return subtractNodes(newnode0, newnode1);
}

function diffMultiply(node, varname) {
  var node0 = diff(node.args[0], varname);
  var node1 = cloneNode(node.args[1], varname);
  var nodeLeft = multiplyNodes(node0, node1);

  var node2 = cloneNode(node.args[0], varname);
  var node3 = diff(node.args[1], varname);
  var nodeRight = multiplyNodes(node2, node3);

  return addNodes(nodeLeft, nodeRight);
}

function diffDivide (node, varname) {
  var dfx = diff(node.args[0], varname); // f'(x)
  var gx = cloneNode(node.args[1], varname); // g(x)
  var nodeLeft = multiplyNodes(dfx, gx); // f'(x)*g(x)

  var fx = cloneNode(node.args[0], varname); //  f(x)
  var dgx = diff(node.args[1], varname); // g'(x)
  var nodeRight = multiplyNodes(fx, dgx); // f(x)*g'(x)

  var num = subtractNodes(nodeLeft, nodeRight); // f'(x)*g(x) - f(x)*g'(x)

  fx = cloneNode(node.args[1], varname);
  var den = powNodes(fx, getConstantNode(2));
  // (f'(x)*g(x) - f(x)*g'(x)) / (g(x))^2

  return divideNodes(num, den);
}

function diffPow(node, varname) { // d/dx f(x)^g(x)
  var fx = cloneNode(node.args[0], varname); // f(x)
  var gx = cloneNode(node.args[1], varname); // g(x)
  if (fx.isconstant && gx.isconstant) {
    return diffConstantNode(fx, varname);
  } else if (gx.isconstant) {
    var gx1 = subtractNodes(cloneNode(gx, varname),
                                getConstantNode(1)); // g-1
    var n = multiplyNodes(gx, powNodes(fx, gx1)); // g*f(x)^(g-1)
    var dfx = diff(fx, varname); // f'(x)
    return multiplyNodes(n, dfx); // g*f(x)^(g-1)*f'(x)
  } else if (fx.isconstant) {
    var n = multiplyNodes(powNodes(fx, gx),
                          logNode(fx)); // f^g(x) log(f)
    return multiplyNodes(n, diff(gx, varname)); // f^g(x) log(f) g'(x)
  } else {
    var dfx = diff(fx, varname); // f'(x)
    var dgx = diff(gx, varname); // g'(x)

    var n = multiplyNodes(dfx, gx); // f'g 
    n = divideNodes(n, fx); // f'g / f
    n = addNodes(dgx, n); // g' + f'g / f
    var log_fx = new math.expression.node.FunctionNode('log', [fx]);
    log_fx.isconstant = fx.isconstant;
    n = multiplyNodes(log_fx, n); // log(f) ( g' + f'g / f )
    var fx_pow_gx = powNodes(fx, gx);
    n = multiplyNodes(fx_pow_gx, n); // f^g log(f) ( g' + f'g / f )
    return n;
  }
}

function diffOperatorNode(node, varname) {
  if (node.fn == 'unaryPlus') {
    return diff(node.args[0], varname);
  } else if (node.fn == 'unaryMinus') {
    return diffUnaryMinus(node, varname);
  } else if (node.fn == 'add') {
    return diffAdd(node, varname);
  } else if (node.fn == 'subtract') {
    return diffSubtract(node, varname);
  } else if (node.fn == 'multiply') {
    return diffMultiply(node, varname);
  } else if (node.fn == 'divide') {
    return diffDivide(node, varname);
  } else if (node.fn == 'pow') {
    return diffPow(node, varname);
  }
}

function diffSin(node, varname) {
  var fx = cloneNode(node.args[0], varname);
  var dfx = diff(node.args[0], varname);
  return multiplyNodes(dfx, cosNode(fx));
}

function diffCos(node, varname) {
  var fx = cloneNode(node.args[0], varname);
  var dfx = diff(node.args[0], varname);
  return multiplyNodes(dfx, unaryMinusNode(sinNode(fx)));
}

function diffTan(node, varname) {
  var fx = cloneNode(node.args[0], varname);
  var dfx = diff(node.args[0], varname);
  var sec = powNodes(secNode(fx), getConstantNode(2));

  return multiplyNodes(dfx, sec);
}

function diffSec(node, varname) {
  var fx = cloneNode(node.args[0], varname);
  var dfx = diff(node.args[0], varname);
  var sectan = multiplyNodes(secNode(fx), tanNode(fx));

  return multiplyNodes(dfx, sectan);
}

function diffCsc(node, varname) {
  var fx = cloneNode(node.args[0], varname);
  var dfx = diff(node.args[0], varname);
  var cotcsc = multiplyNodes(unaryMinusNode(cotNode(fx)),
                            cscNode(fx));

  return multiplyNodes(dfx, cotcsc);
}

function diffCot(node, varname) {
  var fx = cloneNode(node.args[0], varname);
  var dfx = diff(node.args[0], varname);
  var cot2 = powNodes(cscNode(fx), getConstantNode(2));
  return multiplyNodes(dfx, unaryMinusNode(cot2));
}

function diffSqrt(node, varname) {
  var fx = cloneNode(node.args[0], varname); // f(x)
  var dfx = diff(node.args[0], varname); // f'(x)
  var sqrtNode = funcNode(fx, 'sqrt'); // sqrt(f(x))
  var denom = multiplyNodes(getConstantNode(2),
                                 sqrtNode); // 2*sqrt(f(x))
  return divideNodes(dfx, denom); // f'(x) / (2*sqrt(f(x)))
}

function diffLog(node, varname) {
  var fx = cloneNode(node.args[0], varname); // f(x)
  var dfx = diff(node.args[0], varname); // f'(x)
  return divideNodes(dfx, fx); // f'(x) / f(x)
}

function diffFunc (node, varname) {
  // TODO: handle multivariable functions
  var fx = cloneNode(node.args[0], varname);
  var dfx = diff(node.args[0], varname);
  return multiplyNodes(dfx, funcNode(fx, node.name + '\''));
}

function diffFunctionNode(node, varname) {
  if (node.name == 'sin') {
    return diffSin(node, varname);
  } else if (node.name == 'cos') {
    return diffCos(node, varname);
  } else if (node.name == 'tan') {
    return diffTan(node, varname);
  } else if (node.name == 'sec') {
    return diffSec(node, varname);
  } else if (node.name == 'csc') {
    return diffCsc(node, varname);
  } else if (node.name == 'cot') {
    return diffCot(node, varname);
  } else if (node.name == 'sqrt') {
    return diffSqrt(node, varname);
  } else if (node.name == 'log') {
    return diffLog(node, varname);
  } else {
    return diffFunc(node, varname);
  }
}

function diffSymbolNode(node, varname) {
  if (node.name == varname) {
    return getConstantNode(1);
  } else {
    return diffConstantNode(node, varname);
  }
}

function diffConstantNode(node, varname) {
  return getConstantNode(0);
}

function getConstantNode(value) {
  var ret = new math.expression.node.ConstantNode(value);
  ret.isconstant = true;
  return ret;
}

var diff = (function(node, varname) {
  if (node.type == 'ConstantNode' || node.isconstant) {
    return diffConstantNode(node, varname);
  } else if ( node.type == 'SymbolNode') {
    return diffSymbolNode(node, varname);
  } else if (node.type == 'OperatorNode') {
    return diffOperatorNode(node, varname);
  } else if (node.type == 'FunctionNode') {
    return diffFunctionNode(node, varname);
  } else if (node.type == 'ParenthesisNode') {
    return diff(node.content, varname);
  }
});