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

  // exec(arr) {
  //   var test = new PreCalc(0);
  //   for (let i in arr) {
  //     let op = JSON.stringify(arr[i].exp);
  //     console.log(test.calc(op) + "=" + arr[i].expected);
  //   }
  // }
}

const exec = (arr) => {
  var test = new PreCalc(0);
  for (let i in arr) {
    let op = JSON.stringify(arr[i].exp);
    console.log(test.calc(op) + "=" + arr[i].expected);
  }
};
