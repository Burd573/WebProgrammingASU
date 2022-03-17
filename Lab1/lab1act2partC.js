class PreCalc {
  constructor(num) {
    this.num = num;
    this.res = 0;
    this.calcStack = [0];
  }

  push(num) {
    if (this.calcStack.length == 0) {
      this.calcStack[0] = num;
    } else {
      this.calcStack.unshift(num);
    }
  }

  pop() {
    if (this.calcStack.length == 0) {
      return "Empty Stack. Unable to pop";
    } else {
      return this.calcStack.shift();
    }
  }

  print() {
    return "[" + this.calcStack.toString() + "]";
  }

  handleMath(op, val) {
    if (op == "add") {
      this.res = this.calcStack[0] + val;
    }
    if (op == "subtract") {
      this.res = this.calcStack[0] - val;
    }
    return this.res;
  }

  handleStack(op, val) {
    if (op == "push") {
      this.push(val);
      return this.res;
    }
    if (op == "pop") {
      this.res = this.pop();
      return this.res;
    }
  }

  handleValue(data, val) {
    if (data.hasOwnProperty("expr")) {
      val = this.calc(JSON.stringify(data.expr));
    }

    if (data.hasOwnProperty("number")) {
      val = data.number;
    } else {
      val = this.res;
    }
    return val;
  }

  calc(input) {
    let val = 0;
    let data = JSON.parse(input);
    val = this.handleValue(data, val);

    if (data.op == "print") {
      return this.print();
    } else {
      this.res = this.handleStack(data.op, val);
      this.res = this.handleMath(data.op, val);
      return this.res;
    }
  }
}

var test = new PreCalc(0);
var ret = 0;

// returns 5 (5+0) but does not store the 5 on the stack. The stack remains [0]
var test1 = '{"op" : "add", "number" : 5}';
ret = test.calc(test1);
console.log(ret);

// returns 5 and puts 5 on the stack [5 0]
var test2 = '{"op" : "push", "number" : 5}';
ret = test.calc(test2);
console.log(ret);

// returns 5 [0]
var test3 = '{"op" : "pop"}';
ret = test.calc(test3);
console.log(ret);

// returns -2 and pushes -2 on top of the stack [-2 0]
var test4 = '{"op" : "push", "expr" : {"op" : "subtract", "number" : 2}}';
ret = test.calc(test4);
console.log(ret);

// returns 17 (-2+19) and pushes 17 to the top of the stack [17 -2 0]
var test5 = '{"op" : "push", "expr" : {"op" : "add", "number" : 19}}';
ret = test.calc(test5);
console.log(ret);

// returns 17 and removes it from the stack [-2 0]
var test6 = '{"op" : "pop"}';
ret = test.calc(test6);
console.log(ret);

// prints [-2 0]
var test7 = '{"op" : "print"}';
ret = test.calc(test7);
console.log(ret);

// returns -2 (-2 + 0) [-2 0]
var test8 = '{"op" : "push", "expr" : {"op" : "add", "expr": {"op" : "pop"}}}';
ret = test.calc(test8);
console.log(ret);

// prints [-2 0]
var test9 = '{"op" : "print"}';
ret = test.calc(test9);
console.log(ret);

// returns -2 [0]
var test10 = '{"op" : "pop"}';
ret = test.calc(test10);
console.log(ret);

// returns 0 []
var test11 = '{"op" : "pop"}';
ret = test.calc(test11);
console.log(ret);

// returns (what? You have an empty stack now)
var test12 = '{"op" : "pop"}';
ret = test.calc(test12);
console.log(ret);
