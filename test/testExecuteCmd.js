const assert = require("assert");
const executeCmdFunc = require("../src/executeCmdLib");
const { getPair, executeCmd } = executeCmdFunc;

describe("testGetPair", function() {
  it("should return pairs for array conataining even number of elements", function() {
    assert.deepStrictEqual(getPair([1, 2, 3, 4]), [
      [1, 2],
      [3, 4]
    ]);
  });
  it("should return an empty array for empty array as input", function() {
    assert.deepStrictEqual(getPair([]), []);
  });
  it("should return undefined for last element of last pair if array containing odd number of elements", function() {
    assert.deepStrictEqual(getPair([1]), [[1, undefined]]);
  });
});

describe("testExecuteCmd", function() {
  let date = new Date().toJSON();
  it("should record transaction if the option is --save", function() {
    let expected =
      "Transaction Recorded:\nEmployee ID, Beverage, Quantity, Date" +
      "\n" +
      "111,orange,2," +
      date;
    let cmdLineArg = [
      "--save",
      "--beverage",
      "orange",
      "--empId",
      "111",
      "--qty",
      "2"
    ];
    let actual = executeCmd(
      cmdLineArg,
      date,
      { 1: [{ beverage: "orange", qty: 1, dateAndTime: date }] },
      "./test/testFile"
    );
    assert.deepStrictEqual(actual, expected);
  });
  it("should return transactions if the option is --query", function() {
    let printingMsg = "Employee ID,Beverage,Quantity,Date\n";
    let expected = printingMsg + 1 + "," + "orange,3," + date + "\n3";
    let cmdLineArg = ["--query", "--empId", "1"];
    let actual = executeCmd(
      cmdLineArg,
      date,
      { 1: [{ beverage: "orange", qty: 3, dateAndTime: date }] },
      "./test/testFile"
    );
    assert.deepStrictEqual(actual, expected);
  });
  it("should return usage if the input is not valid", function() {
    let usageSave =
      "save ==> --save --beverage [beverageName] --empId [empId] --qty [quantity]\n ";
    let usageQuery = "query ==> --query --empId [existingEmployee]\n\t";
    usageQuery =
      usageQuery + "--query --empId [existingEmployee] --date [valid date]\n\t";
    usageQuery = usageQuery + "--query --date [valid date]";
    let expected = usageSave + usageQuery;
    let cmdLineArg = ["--update", "--empId", "111"];
    let actual = executeCmd(cmdLineArg, date, {}, "./test/testFile");
    assert.deepStrictEqual(actual, expected);
  });
});