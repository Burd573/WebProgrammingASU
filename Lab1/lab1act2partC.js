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
      console.log("Empty Stack. Unable to pop");
      return;
    } else {
      return this.calcStack.shift();
    }
  }

  print() {
    return "[" + this.calcStack.toString() + "]";
  }

  calc(input) {
    let val = 0;
    let data = JSON.parse(input);
    //handle nested
    if (data.hasOwnProperty("expr")) {
      calc(JSON.stringify(data.expr));
    }

    //handle math

    //handle stack

    if (data.hasOwnProperty("number")) {
      val = data.number;
    } else {
      val = this.res;
    }

    if (data.op == "push" && data.hasOwnProperty("number")) {
      this.push(data.number);
    }
    if (data.op == "pop") {
      this.pop();
    }

    if (data.op == "add") {
      this.res += val;
    }
    if (data.op == "subtract") {
      this.res -= val;
    }

    return val;
  }
}

var test = new PreCalc(0);

// returns 5 (5+0) but does not store the 5 on the stack. The stack remains [0]
var test1 = '{"op" : "add", "number" : 5}';
console.log(test.calc(test1) + " " + test.print());

// returns 5 and puts 5 on the stack [5 0]
var test2 = '{"op" : "push", "number" : 5}';
console.log(test.calc(test2) + " " + test.print());

// returns 5 [0]
var test3 = '{"op" : "pop"}';
console.log(test.calc(test3) + " " + test.print());

// returns -2 and pushes -2 on top of the stack [-2 0]
var test4 = '{"op" : "push", "expr" : {"op" : "subtract", "number" : 2}}';
// returns 17 (-2+19) and pushes 17 to the top of the stack [17 -2 0]
var test5 = '{"op" : "push", "expr" : {"op" : "add", "number" : 19}}';
// returns 17 and removes it from the stack [-2 0]
var test6 = '{"op" : "pop"}';
// prints [-2 0]
var test7 = '{"op" : "print"}';
// returns -2 (-2 + 0) [-2 0]
var test8 = '{"op" : "push", "expr" : {"op" : "add", "expr": {"op" : "pop"}}}';
// prints [-2 0]
var test9 = '{"op" : "print"}';
// returns -2 [0]
var test10 = '{"op" : "pop"}';
// returns 0 []
var test11 = '{"op" : "pop"}';
// returns (what? You have an empty stack now)
var test12 = '{"op" : "pop"}';
