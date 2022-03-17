var init = 0;
var res = init;

const calc = (input) => {
  let val = 0;
  let data = JSON.parse(input);
  if (data.hasOwnProperty("expr")) {
    calc(JSON.stringify(data.expr));
  }
  if (data.hasOwnProperty("number")) {
    val = data.number;
  } else {
    val = res;
  }
  if (data.op == "add") {
    res += val;
  }
  if (data.op == "subtract") {
    res -= val;
  }
};

const exec = (arr) => {
  res = init;
  for (let i in arr) {
    let op = JSON.stringify(arr[i].exp);
    calc(op);
    console.log(res + "=" + arr[i].expected);
  }
};
