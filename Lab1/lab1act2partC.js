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
    for (var i in this.calcStack) {
      console.log(this.calcStack[i]);
    }
  }

  calc(input) {
    let val = 0;
    let data = JSON.parse(input);
    if (data.hasOwnProperty("expr")) {
      calc(JSON.stringify(data.expr));
    }
    if (data.hasOwnProperty("number")) {
      val = data.number;
    } else {
      val = this.res;
    }

    if (data.op == "push") {
      this.push(num);
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
  }
}

var test = new PreCalc(0);
test.push(4);
test.print();
test.pop();
console.log("pop");
test.print();
