const { spawn } = require("child_process");
const validateArgv = require("../caesar_cli_tool_task_1/validateCommandLineArg");

describe("ValudationErrorTool check count of command line attributes", () => {
  beforeAll(() => {
    spawn("chmod", ["a-rw", "./caesar_cli_tool_task_1/output3.txt"]);
  }, 1000);

  it("Not enought '--config' or '-c' generate ValidateError", () => {
    const commandLineArgs = ["-i", "./input.tx", "-o", "./output.txt"];
    let error = null;
    try {
      validateArgv(commandLineArgs);
    } catch (e) {
      error = e;
    }
    expect(error.name).toBe("ValidationError");
    expect(error.message).toBe("Provide requirement '-c' or '--config' flag\n");
  });

  it("Too much '--config' or '-c' generate ValidateError", () => {
    const commandLineArgs1 = [
      "-c",
      "C0",
      "--config",
      "C1",
      "-i",
      "./input.tx",
      "-o",
      "./output.txt",
    ];
    const commandLineArgs2 = [
      "-c",
      "C0",
      "-i",
      "./input.tx",
      "-o",
      "./output.txt",
      "-c",
      "C1",
    ];
    let error = null;
    try {
      validateArgv(commandLineArgs1);
    } catch (e) {
      error = e;
    }
    expect(error.name).toBe("ValidationError");
    expect(error.message).toBe("Provided too much '-c' or '--config' flags\n");

    try {
      validateArgv(commandLineArgs2);
    } catch (e) {
      error = e;
    }
    expect(error.name).toBe("ValidationError");
    expect(error.message).toBe("Provided too much '-c' or '--config' flags\n");
  });

  it("Too much '--input' or '-i' generate ValidateError", () => {
    const commandLineArgs1 = [
      "-c",
      "C0",
      "-i",
      "./input.tx",
      "-o",
      "./output.txt",
      "--input",
      "./input.tx",
    ];
    const commandLineArgs2 = [
      "-c",
      "C0",
      "-i",
      "./input.tx",
      "-o",
      "./output.txt",
      "-i",
      "./input.tx",
    ];
    let error = null;
    try {
      validateArgv(commandLineArgs1);
    } catch (e) {
      error = e;
    }
    expect(error.name).toBe("ValidationError");
    expect(error.message).toBe("Provided too much '-i' or '--input' flags\n");

    try {
      validateArgv(commandLineArgs2);
    } catch (e) {
      error = e;
    }
    expect(error.name).toBe("ValidationError");
    expect(error.message).toBe("Provided too much '-i' or '--input' flags\n");
  });

  it("Too much '--output' or '-o' generate ValidateError", () => {
    const commandLineArgs1 = [
      "-c",
      "C0",
      "-i",
      "./input.tx",
      "-o",
      "./output.txt",
      "--output",
      "./output.txt",
    ];
    const commandLineArgs2 = [
      "-c",
      "C0",
      "-i",
      "./input.tx",
      "-o",
      "./output.txt",
      "-o",
      "./output.txt",
    ];
    let error = null;
    try {
      validateArgv(commandLineArgs1);
    } catch (e) {
      error = e;
    }
    expect(error.name).toBe("ValidationError");
    expect(error.message).toBe("Provided too much '-0' or '--output' flags\n");

    try {
      validateArgv(commandLineArgs2);
    } catch (e) {
      error = e;
    }
    expect(error.name).toBe("ValidationError");
    expect(error.message).toBe("Provided too much '-0' or '--output' flags\n");
  });

  it("Too much '--output' or '-o' generate ValidateError", () => {
    const commandLineArgs1 = [
      "-c",
      "C0",
      "-i",
      "./input.tx",
      "-o",
      "./output.txt",
      "--output",
      "./output.txt",
    ];
    const commandLineArgs2 = [
      "-c",
      "C0",
      "-i",
      "./input.tx",
      "-o",
      "./output.txt",
      "-o",
      "./output.txt",
    ];
    let error = null;
    try {
      validateArgv(commandLineArgs1);
    } catch (e) {
      error = e;
    }
    expect(error.name).toBe("ValidationError");
    expect(error.message).toBe("Provided too much '-0' or '--output' flags\n");

    try {
      validateArgv(commandLineArgs2);
    } catch (e) {
      error = e;
    }
    expect(error.name).toBe("ValidationError");
    expect(error.message).toBe("Provided too much '-0' or '--output' flags\n");
  });
});

describe("ValudationErrorTool check config is correct", (done) => {
  it("Should not return any error for correct config", () => {
    const args1 = ["-c", "C1-C0-A-R1-R0-A-R0-R0-C1-A"];
    const args2 = ["--config", "A-A-A-R1-R0-R0-R0-C1-C1-A"];
    const args3 = ["-c", "C1-R1-C0-C0-A-R0-R1-R1-A-C1"];

    validateArgv(args1);
    validateArgv(args2);
    validateArgv(args3);
  });

  it("Should return error if the config is incorrect or empty", () => {
    const args1 = ["-c", "C1-C-A-R1-R0-A-R0-R0-C1-A"];
    const args2 = ["--config", "A-A-A-R1-R0-R0-R0-C1-C1-A-"];
    const args3 = ["-c", ""];
    let error = null;
    try {
      validateArgv(args1);
    } catch (e) {
      error = e;
    }
    expect(error.name).toBe("ValidationError");
    expect(error.message).toBe(`Incorrect config ${args1[1]}\n`);

    try {
      validateArgv(args2);
    } catch (e) {
      error = e;
    }
    expect(error.name).toBe("ValidationError");
    expect(error.message).toBe(`Incorrect config ${args2[1]}\n`);
    try {
      validateArgv(args3);
    } catch (e) {
      error = e;
    }
    expect(error.name).toBe("ValidationError");
    expect(error.message).toBe(`Incorrect config ${args3[1]}\n`);
  });
});

describe("ValudationErrorTool check path to files", () => {
  it("Should return error with not exist file path for input", () => {
    const args1 = [
      "-c",
      "C1-C0-A-R1-R0-A-R0-R0-C1-A",
      "-i",
      "./somepath/input.txt",
    ];
    let error = null;
    try {
      validateArgv(args1);
    } catch (e) {
      error = e;
    }
    expect(error.name).toBe("ValidationError");
    expect(error.message).toBe(
      "Provided file path is not exist for input file\n"
    );
  });

  it("Should return error with not exist file path for output", () => {
    const args1 = [
      "-c",
      "C1-C0-A-R1-R0-A-R0-R0-C1-A",
      "-o",
      "./somepath/input.txt",
    ];

    let error = null;
    try {
      validateArgv(args1);
    } catch (e) {
      error = e;
    }
    expect(error.name).toBe("ValidationError");
    expect(error.message).toBe(
      "Provided file path is not exist for output file\n"
    );
  });

  it("Should return error of read/write access for input", () => {
    const args1 = [
      "-c",
      "C1-C0-A-R1-R0-A-R0-R0-C1-A",
      "-i",
      "./caesar_cli_tool_task_1/output3.txt",
    ];
    let error = null;
    try {
      validateArgv(args1);
    } catch (e) {
      error = e;
    }
    expect(error.name).toBe("ValidationError");
    expect(error.message).toBe(`No read access to ${args1[3]}\n`);
  });

  it("Should return error of read/write access for output", () => {
    const args1 = [
      "-c",
      "C1-C0-A-R1-R0-A-R0-R0-C1-A",
      "-o",
      "./caesar_cli_tool_task_1/output3.txt",
    ];
    let error = null;
    try {
      validateArgv(args1);
    } catch (e) {
      error = e;
    }
    expect(error.name).toBe("ValidationError");
    expect(error.message).toBe(`No write access to ${args1[3]}\n`);
  });
});
