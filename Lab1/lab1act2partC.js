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
      this.calc(JSON.stringify(data.expr));
    }

    //handle math

    //handle stack

    if (data.hasOwnProperty("number")) {
      val = data.number;
    } else {
      val = this.res;
    }
    console.log("val1: " + val);

    if (data.op == "push") {
      console.log("pushing: " + val);
      this.push(val);
    }
    if (data.op == "pop") {
      console.log("popping: " + val);
      this.pop();
    }

    if (data.op == "add") {
      console.log("adding val: " + val + " to res: " + this.res);
      this.res += val;
    }
    if (data.op == "subtract") {
      console.log("subtracting val: " + val + " from res: " + this.res);
      this.res -= val;
    }

    console.log("returning res: " + this.res);
    return this.res;
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
console.log(test.calc(test4) + " " + test.print());

// returns 17 (-2+19) and pushes 17 to the top of the stack [17 -2 0]
var test5 = '{"op" : "push", "expr" : {"op" : "add", "number" : 19}}';
console.log(test.calc(test5) + " " + test.print());

// returns 17 and removes it from the stack [-2 0]
var test6 = '{"op" : "pop"}';
console.log(test.calc(test6) + " " + test.print());

// prints [-2 0]
var test7 = '{"op" : "print"}';
console.log(test.calc(test7) + " " + test.print());

// returns -2 (-2 + 0) [-2 0]
var test8 = '{"op" : "push", "expr" : {"op" : "add", "expr": {"op" : "pop"}}}';
console.log(test.calc(test8) + " " + test.print());

// prints [-2 0]
var test9 = '{"op" : "print"}';
console.log(test.calc(test9) + " " + test.print());

// returns -2 [0]
var test10 = '{"op" : "pop"}';
console.log(test.calc(test10) + " " + test.print());

// returns 0 []
var test11 = '{"op" : "pop"}';
console.log(test.calc(test11) + " " + test.print());

// returns (what? You have an empty stack now)
var test12 = '{"op" : "pop"}';
console.log(test.calc(test12) + " " + test.print());
