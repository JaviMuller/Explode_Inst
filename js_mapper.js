
function mapJS (f, p) {   
    if(!p) return p; 
    
    var ret = f(p); 
    if (ret !== null) { 
       return ret;
    }
  
    switch(p.type)	{
      case 'Program':
        var body = p.body.map((s) => mapJS(f, s)); 
        return {
          type:       p.type, 
          body:       body, 
          sourceType: p.sourceType 
        }    
      
      case 'ExpressionStatement': 
        var new_expression = mapJS(f, p.expression);
        return { 
          type:       p.type, 
          expression: new_expression
        }
      
      case 'Literal': 
        return {
          type:  p.type, 
          value: p.value, 
          raw:   p.raw
        }
      
      case 'Identifier': 
        return {
          type: p.type, 
          name: p.name
        }    
      
      case 'AssignmentExpression':  
      case 'BinaryExpression': 
      case 'LogicalExpression':
        var left  = mapJS(f, p.left);
        var right = mapJS(f, p.right);
        return {
          left:     left, 
          right:    right,
          operator: p.operator,
          type:     p.type 
        }
      
      case 'MemberExpression': 
        var object   = mapJS(f, p.object);
        var property = mapJS(f, p.property);
        return {
          object:     object, 
          property:   property,
          computed:   p.computed,
          type:       p.type 
        }
  
      case 'CallExpression':
      case 'NewExpression': 
        var callee = mapJS(f, p.callee);
        var args   = p.arguments.map((s) => mapJS(f, s)); 
        return {
          callee:    callee, 
          arguments: args, 
          type:      p.type, 
        }
          
      case 'ObjectExpression': 
        var properties = p.properties.map((s) => mapJS(f, s));
        return {
          type:       p.type, 
          properties: properties
        }
  
      case 'DebuggerStatement': 
      case 'ThisExpression': return { type: p.type }
      
      case 'UnaryExpression': 
        var argument = mapJS(f, p.argument); 
        return { 
          type:     p.type, 
          argument: argument, 
          prefix:   p.prefix, 
          operator: p.operator
        }
  
      case 'BlockStatement':
        var body = p.body.map((s) => mapJS(f, s)); 
        return {
          type:       p.type, 
          body:       body
        }         
      
      case 'DoWhileStatement': 
      case 'WhileStatement': 
        var test = mapJS(f, p.test); 
        var body = mapJS(f, p.body); 
        return { 
          type: p.type, 
          test: test, 
          body: body
        }
      
      case 'ConditionalExpression': 
      case 'IfStatement':
        var test       = mapJS(f, p.test); 
        var consequent = mapJS(f, p.consequent); 
        var alternate  = mapJS(f, p.alternate); 
        return { 
          type:       p.type, 
          test:       test, 
          consequent: consequent, 
          alternate:  alternate
        }
      
      case 'ThrowStatement': 
      case 'ReturnStatement': 
        var argument = mapJS(f, p.argument); 
        return { 
          type:     p.type, 
          argument: argument
        }  
      
      case 'FunctionDeclaration': 
      case 'FunctionExpression': 
        var params = p.params.map((s) => mapJS(f, s));  
        var body   = mapJS(f, p.body);
        return { 
         type:       p.type, 
         id:         p.id, 
         params:     params,
         body:       body, 
         generator:  p.generator, 
         expression: p.expression, 
         async:      p.async
  
        }
      
      case 'VariableDeclaration':
        var declarations = p.declarations.map((s) => mapJS(f, s));  
        return { 
          type:         p.type, 
          declarations: declarations, 
          kind:         p.kind
        }
      
      case 'ArrayExpression': 
        var elements = p.elements.map((s) => mapJS(f, s));
        return { 
          type:     p.type, 
          elements: elements
        }
      
      case 'ContinueStatement': 
      case 'BreakStatement': 
        return { 
          type:  p.type, 
          label: p.label 
        }
      
      case 'CatchClause':
        var param  = mapJS(f, p.param);
        var body   = mapJS(f, p.body);
        return {
          type:  p.type, 
          param: param,
          body:  body
        }
      
      case 'ForStatement': 
        var init   = mapJS(f, p.init);
        var test   = mapJS(f, p.test);
        var update = mapJS(f, p.update);
        var body   = mapJS(f, p.body);
        return {
          type:   p.type, 
          init:   init,
          test:   test, 
          update: update, 
          body:   body
        }
  
      case 'ForInStatement':
        var left  = mapJS(f, p.left);
        var right = mapJS(f, p.right);
        var body  = mapJS(f, p.body);
        return {
          type:  p.type,
          left:  left, 
          right: right,
          body:  body, 
          each:  p.each
        }
      
      case 'LabeledStatement': 
        var body  = mapJS(f, p.body);
        return { 
          type:  p.type,
          label: p.label,
          body:  body
        }
      
      case "Property": 
        var key   = mapJS(f, p.key);
        var value = mapJS(f, p.value);
        return { 
          type:      p.type,
          key:       key, 
          computed:  p.computed, 
          value:     value, 
          kind:      p.kind, 
          method:    p.method, 
          shorthand: p.shorthand
        }
      
      case 'SequenceExpression': 
        var expressions = p.expressions.map((s) => mapJS(f, s)); 
        return { 
          type:        p.type, 
          expressions: expressions
        }
     
      case 'SwitchStatement': 
        var discriminant = mapJS(f, p.discriminant);
        var cases = p.cases.map((s) => mapJS(f, s));
        return { 
          type:         p.type, 
          discriminant: discriminant, 
          cases:        cases
        }
      
      case 'SwitchCase': 
        var test       = mapJS(f, p.test); 
        var consequent = mapJS(f, p.consequent); 
        return { 
          type:       p.type, 
          test:       test, 
          consequent: consequent
        }
      
      case 'TryStatement': 
        var block     = mapJS(f, p.block);
        var handler   = mapJS(f, p.handler);
        var finalizer = mapJS(f, p.finalizer);
        return { 
          type:      p.type, 
          block:     block, 
          handler:   handler,
          finalizer: finalizer
        }
      
      case 'VariableDeclarator': 
        var id     = mapJS(f, p.id);
        var init   = mapJS(f, p.init);
        return { 
          type: p.type, 
          id:   id, 
          init: init
        }
      
      case 'WithStatement': 
        var object = mapJS(f, p.object);
        var body   = mapJS(f, p.body);
        return { 
          type:   p.type, 
          object: object, 
          body:   body
        }
      
      default: return p 
    }    
  }

  module.exports = { mapJS }