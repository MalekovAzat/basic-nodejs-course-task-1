const Validator = require("./validateCommandLineArg");
const TransformScrambler = require("./TransformScrambler");
const CustomInputStream = require("./CustonInputStream");
const CustomOutputStream = require("./CustonOutputStream");

const { pipeline } = require("stream");

try {
  Validator(process.argv);
} catch (err) {
  process.stderr.write(err.message);
  process.exit(1);
}

const configFlagIndex = process.argv.indexOf("-c") || argv.indexOf("--config");
const config = process.argv[configFlagIndex + 1].split("-");

const transformStreamList = config.map((conf) => {
  let config = {};
  if (conf.charAt(0) === "C") {
    config = {
      shift: conf.charAt(1) === "0" ? -1 : 1,
      mode: "+",
    };
  } else if (conf.charAt(0) === "R") {
    config = {
      shift: conf.charAt(1) === "0" ? -8 : 8,
      mode: "+",
    };
  } else if (conf.charAt(0) === "A") {
    config = {
      shift: -1,
      mode: "-",
    };
  }
  return new TransformScrambler(config);
});

const inputArgIndex =
  process.argv.indexOf("-i") || process.argv.indexOf("--input");
const inputStream = new CustomInputStream(
  inputArgIndex > -1 ? process.argv[inputArgIndex + 1] : ""
);

const ouptutArgIndex =
  process.argv.indexOf("-o") || process.argv.indexOf("--output");
const outputStream = new CustomOutputStream(
  ouptutArgIndex > -1 ? process.argv[ouptutArgIndex + 1] : ""
);

pipeline(inputStream, ...transformStreamList, outputStream, (err) => {});
