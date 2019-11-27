const operations = require("./operations");
const { save, executeEmpIdQuery, executeDateQuery } = operations;
const printMsg = require("./printingMessegeLib");
const { getSaveMessage, getHeader, getTransactionDetails } = printMsg;

const total = function(sum, element) {
  let quantity = +element.qty;
  return sum + quantity;
};

const getNewTransactionObj = function(cmdLineArg, date) {
  let id = cmdLineArg[cmdLineArg.indexOf("--empId") + 1];
  let qty = cmdLineArg[cmdLineArg.indexOf("--qty") + 1];
  let beverage = cmdLineArg[cmdLineArg.indexOf("--beverage") + 1];
  let newTransaction = {
    id: id,
    beverage: beverage,
    qty: qty,
    dateAndTime: date
  };
  return newTransaction;
};

const performSaveCmd = function(args, previousData, utilFunc, path) {
  let date = utilFunc.generateDate().toJSON();
  let id = args[args.indexOf("--empId") + 1];
  let newTransaction = getNewTransactionObj(args, date);
  let savedDetails = save(previousData, newTransaction, path, utilFunc);
  savedDetails = savedDetails.map(getTransactionDetails);
  return getSaveMessage() + getHeader() + savedDetails;
};

const performQueryCmd = function(args, previousData) {
  let id = args[args.indexOf("--empId") + 1];
  let extractedTrans = executeEmpIdQuery(previousData, args);
  if (args.includes("--date")) {
    extractedTrans = executeDateQuery(previousData, args);
  }
  let totalTrans = extractedTrans.reduce(total, 0);
  extractedTrans = extractedTrans.map(getTransactionDetails).join("\n");
  return getHeader() + extractedTrans + "\n" + totalTrans;
};

exports.getNewTransactionObj = getNewTransactionObj;
exports.performSaveCmd = performSaveCmd;
exports.performQueryCmd = performQueryCmd;
exports.total = total;
