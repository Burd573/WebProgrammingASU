var test = new PreCalc(0);

var test1 = '{"op" : "add", "number" : 5}';
var test2 = '{"op" : "push", "number" : 5}';
var test3 = '{"op" : "pop"}';
var test4 = '{"op" : "push", "expr" : {"op" : "subtract", "number" : 2}}';
var test5 = '{"op" : "push", "expr" : {"op" : "add", "number" : 19}}';
var test6 = '{"op" : "pop"}';
var test7 = '{"op" : "print"}';
var test8 = '{"op" : "push", "expr" : {"op" : "add", "expr": {"op" : "pop"}}}';
var test9 = '{"op" : "print"}';
var test10 = '{"op" : "pop"}';
var test11 = '{"op" : "pop"}';
var test12 = '{"op" : "pop"}';

var expA = [
  { exp: { op: "add", number: 5 }, expected: 5 },
  { exp: { op: "push", number: 5 }, expected: 5 },
  { exp: { op: "pop" }, expected: 5 },
  {
    exp: { op: "push", expr: { op: "subtract", number: 2 } },
    expected: -2,
  },
  {
    exp: { op: "push", expr: { op: "add", number: 19 } },
    expected: 17,
  },
  { exp: { op: "pop" }, expected: 17 },
  { exp: { op: "print" }, expected: "[-2, 0]" },
  {
    exp: { op: "push", expr: { op: "add", expr: { op: "pop" } } },
    expected: -2,
  },
  { exp: { op: "print" }, expected: "[-2, 0]" },
  { exp: { op: "pop" }, expected: -2 },
  { exp: { op: "pop" }, expected: 0 },
];

var expB = [
  { "exp": { "op": "add", "number": 0 }, "expected": 0 },
  { "exp": { "op": "add", "number": -1 }, "expected": -1 },
  { "exp": { "op": "subtract", "number": -1 }, "expected": 0 },
  { "exp": { "op": "add", "number": 5 }, "expected": 5 },
  { "exp": { "op": "subtract", "number": 10 }, "expected": -5 },
  { "exp": { "op": "add", "number": 15 }, "expected": 10 },
];

console.log("--------Calc Testing-----------");
console.log(test.calc(test1));
console.log(test.calc(test2));
console.log(test.calc(test3));
console.log(test.calc(test4));
console.log(test.calc(test5));
console.log(test.calc(test6));
console.log(test.calc(test7));
console.log(test.calc(test8));
console.log(test.calc(test9));
console.log(test.calc(test10));
console.log(test.calc(test11));
console.log(test.calc(test12));
console.log("--------Exec Testing-----------");
exec(expA);
console.log("------Test Quotes--------");
exec(expB);
