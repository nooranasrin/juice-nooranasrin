const validation = require("./validation");
const { isValidSaveArgs, isValidQueryArgs } = validation;
const printMsg = require("./printingMessegeLib");
const { getUsageMsg } = printMsg;
const transactions = require("./performOperations");
const { performSaveCmd, performQueryCmd } = transactions;

const getPair = function(cmdLineArg) {
  let pairs = [];
  for (let index = 0; index <= cmdLineArg.length - 1; index += 2) {
    pairs.push([cmdLineArg[index], cmdLineArg[index + 1]]);
  }
  return pairs;
};

const executeCmd = function(args, utilFunc, path) {
  let transactionFuncs = {
    "--save": performSaveCmd,
    "--query": performQueryCmd
  };
  let beverageRecord = utilFunc.getBeverageRecord(path);
  let pairs = getPair(args.slice(1));
  let isArgsValid = isValidSaveArgs(pairs, args);
  isArgsValid = isArgsValid || isValidQueryArgs(pairs, args, beverageRecord);
  if (isArgsValid) {
    return transactionFuncs[args[0]](args, beverageRecord, utilFunc, path);
  }
  return getUsageMsg();
};

exports.executeCmd = executeCmd;
exports.getPair = getPair;
