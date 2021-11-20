const fs = require("fs");
const CustomException = require("./CustomException");

function _onlyOne(argv, reqArgv) {
  const countOfEachArg = reqArgv.map(
    (arg) => argv.filter((checkArg) => checkArg === arg).length
  );

  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  return countOfEachArg.reduce(reducer) === 1;
}

function _noOrOnlyOne(argv, reqArgv) {
  const countOfEachArg = reqArgv.map(
    (arg) => argv.filter((checkArg) => checkArg === arg).length
  );

  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  return countOfEachArg.reduce(reducer) <= 1;
}

// if anleast one elem from reqArgv in arg return true
function _atLeastOne(argv, reqArgv) {
  for (let arg of reqArgv) {
    if (argv.indexOf(arg) !== -1) {
      return true;
    }
  }
  return false;
}

function validateArgv(argv) {
  // check if flags present
  if (_atLeastOne(argv, [["-c", "--config"]])) {
    throw new CustomException("Provide requirement '-c' or '--config' flag\n");
  }
  // check if only one
  if (!_onlyOne(argv, ["-c", "--config"])) {
    throw new CustomException("Provided too much '-c' or '--config' flags\n");
  }
  // not in the list or only one
  if (!_noOrOnlyOne(argv, ["-i", "--input"])) {
    throw new CustomException("Provided too much '-i' or '--input' flags\n");
  }
  // not in the list or only one
  if (!_noOrOnlyOne(argv, ["-o", "--output"])) {
    throw new CustomException("Provided too much '-0' or '--output' flags\n");
  }

  const configFlagIndex = argv.indexOf("-c") || argv.indexOf("--config");
  if (configFlagIndex > -1) {
    const configRegEx =
      /^((([CR]{1}[01]{1})|([A]{1}))-)*(([CR]{1}[01]{1})|([A]{1}))$/g;
    const confStr = argv[configFlagIndex + 1];
    if (!configRegEx.test(confStr)) {
      throw new CustomException(`Incorrect config ${confStr}\n`);
    }
  }

  // check rest args
  const inputArgIndex = argv.indexOf("-i") || argv.indexOf("--input");
  if (inputArgIndex !== -1) {
    const inputPath = argv[inputArgIndex + 1];
    if (!fs.existsSync(inputPath)) {
      throw new CustomException(
        "Provided file path is not exist for input file\n"
      );
    }
    try {
      if (!fs.accessSync(inputPath, fs.constants.R_OK)) {
      }
    } catch (e) {
      throw new CustomException(`No read access to ${inputPath}\n`);
    }
  }

  const ouptutArgIndex = argv.indexOf("-o") || argv.indexOf("--output");
  if (ouptutArgIndex !== -1) {
    const ouputPath = argv[ouptutArgIndex + 1];
    if (!fs.existsSync(ouputPath)) {
      throw new CustomException(
        "Provided file path is not exist for output file\n"
      );
    }

    try {
      if (!fs.accessSync(ouputPath, fs.constants.W_OK)) {
      }
    } catch (e) {
      throw new CustomException(`No write access to ${ouputPath}\n`);
    }
  }
}

module.exports = validateArgv;
