var init = 0;
var res = init;

const calc = (input) => {
  let data = JSON.parse(input);
  if (data.op == "add") {
    res += data.number;
  }
  if (data.op == "subtract") {
    res -= data.number;
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
