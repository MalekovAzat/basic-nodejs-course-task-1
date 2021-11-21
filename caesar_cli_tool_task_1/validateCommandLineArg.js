const fs = require("fs");
const CustomException = require("./CustomException");

// count how many times elements from arr2 included in arr1
function count(arr1, arr2) {
  let count = 0;
  // get all elements from arr1 if they in arr2
  const elements = arr1.filter((elem) => arr2.indexOf(elem) > -1);

  return elements.length;
}

function validateArgv(argv) {
  // console.log("!@# argv", count(argv, ["-c", "--config"]) === 0, argv);
  if (count(argv, ["-c", "--config"]) === 0) {
    throw new CustomException("Provide requirement '-c' or '--config' flag\n");
  }
  // check if only one
  if (count(argv, ["-c", "--config"]) > 1) {
    throw new CustomException("Provided too much '-c' or '--config' flags\n");
  }
  // not in the list or only one
  if (count(argv, ["-i", "--input"]) > 1) {
    throw new CustomException("Provided too much '-i' or '--input' flags\n");
  }
  // not in the list or only one
  if (count(argv, ["-o", "--output"]) > 1) {
    throw new CustomException("Provided too much '-0' or '--output' flags\n");
  }

  let configFlagIndex = argv.indexOf("-c");
  configFlagIndex =
    configFlagIndex > -1 ? configFlagIndex : argv.indexOf("--config");
  if (configFlagIndex > -1) {
    const configRegEx =
      /^((([CR]{1}[01]{1})|([A]{1}))-)*(([CR]{1}[01]{1})|([A]{1}))$/g;
    const confStr = argv[configFlagIndex + 1];
    if (!configRegEx.test(confStr)) {
      throw new CustomException(`Incorrect config ${confStr}\n`);
    }
  }

  // check rest args
  let inputArgIndex = argv.indexOf("-i");
  inputArgIndex = inputArgIndex > -1 ? inputArgIndex : argv.indexOf("--input");
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

  let ouptutArgIndex = argv.indexOf("-o");
  ouptutArgIndex =
    ouptutArgIndex > -1 ? ouptutArgIndex : argv.indexOf("--output");
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
