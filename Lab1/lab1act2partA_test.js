var test1 = '{"op" : "add", "number" : 5}';
var test2 = '{"op" : "subtract", "number" : 2}';
var test3 = '{"op" : "add", "number" : 19}';

var expA = [
  { exp: { op: "add", number: 0 }, expected: 0 },
  { exp: { op: "add", number: -1 }, expected: -1 },
  { exp: { op: "subtract", number: -1 }, expected: 0 },
  { exp: { op: "add", number: 5 }, expected: 5 },
  { exp: { op: "subtract", number: 10 }, expected: -5 },
  { exp: { op: "add", number: 15 }, expected: 10 },
];

console.log("--------Calc Testing-----------");
calc(test1);
console.log(res);
calc(test2);
console.log(res);
calc(test3);
console.log(res);
console.log("--------Exec Testing-----------");
exec(expA);
