const { spawn } = require("child_process");

describe("Check of the CaesarCli file", () => {
  it("Should check user passes the same cli argument twice", (done) => {
    const ls = spawn("node", [
      "./caesar_cli_tool_task_1/caesar_cli.js",
      "-c",
      "C0-C1",
      "-c",
      "C1-C0",
    ]);
    ls.stdout.on("data", (data) => {});

    ls.stderr.on("data", (data) => {
      data = data.toString("utf8");
      expect(data).toBe("Provided too much '-c' or '--config' flags\n");
    });
    ls.on("close", (code) => {
      expect(code).toBe(1);
      done();
    });
  });

  it("Should check user doesn't pass -c or --config argument", (done) => {
    const ls = spawn("node", ["./caesar_cli_tool_task_1/caesar_cli.js"]);
    ls.stdout.on("data", (data) => {});

    ls.stderr.on("data", (data) => {
      data = data.toString("utf8");
      expect(data).toBe("Provide requirement '-c' or '--config' flag\n");
    });

    ls.on("close", (code) => {
      expect(code).toBe(1);
      done();
    });
  });

  it("Should check user passes -i argument with path that doesn't exist or with no read access", (done) => {
    const ls = spawn("node", [
      "./caesar_cli_tool_task_1/caesar_cli.js",
      "-c",
      "A",
      "-i",
      "./input.txt",
    ]);

    ls.stdout.on("data", (data) => {});

    ls.stderr.on("data", (data) => {
      data = data.toString("utf8");
      expect(data).toBe("Provided file path is not exist for input file\n");
    });

    ls.on("close", (code) => {
      expect(code).toBe(1);
      done();
    });
  });

  it("Should check user passes -o argument with path to directory that doesn't exist or with no read access", (done) => {
    const ls = spawn("node", [
      "./caesar_cli_tool_task_1/caesar_cli.js",
      "-c",
      "A",
      "-o",
      "./output.txt",
    ]);

    ls.stdout.on("data", (data) => {});

    ls.stderr.on("data", (data) => {
      data = data.toString("utf8");
      expect(data).toBe("Provided file path is not exist for output file\n");
    });

    ls.on("close", (code) => {
      expect(code).toBe(1);
      done();
    });
  });

  it("Should check User passes incorrent symbols in argument for --config", (done) => {
    const ls = spawn("node", [
      "./caesar_cli_tool_task_1/caesar_cli.js",
      "-c",
      "A-",
      "-o",
      "./output.txt",
    ]);

    ls.stdout.on("data", (data) => {});

    ls.stderr.on("data", (data) => {
      data = data.toString("utf8");
      expect(data).toBe("Incorrect config A-\n");
    });

    ls.on("close", (code) => {
      expect(code).toBe(1);
      done();
    });
  });

  it("Should check User passes correct sequence of symbols as argument for --config that matches regular expression - No errors case-1", (done) => {
    const ls = spawn("node", [
      "./caesar_cli_tool_task_1/caesar_cli.js",
      "-c",
      "A-A",
    ]);

    ls.stdin.write("Hello");
    ls.stdin.end();

    ls.stdout.on("data", (data) => {
      data = data.toString("utf8");
      expect(data).toBe("Hello");
    });

    ls.stderr.on("data", (data) => {
      data = data.toString("utf8");
      //   expect(data).toBe("Incorrect config A-\n");
    });

    ls.on("close", (code) => {
      expect(code).toBe(0);
      done();
    });
  });

  it("Should check User passes correct sequence of symbols as argument for --config that matches regular expression - No errors case-2 from task", (done) => {
    const ls = spawn("node", [
      "./caesar_cli_tool_task_1/caesar_cli.js",
      "-c",
      "C1-C1-R0-A",
    ]);

    ls.stdin.write('This is secret. Message about "_" symbol!');
    ls.stdin.end();

    ls.stdout.on("data", (data) => {
      data = data.toString("utf8");
      expect(data).toBe('Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!');
    });

    ls.stderr.on("data", (data) => {
      data = data.toString("utf8");
    });

    ls.on("close", (code) => {
      expect(code).toBe(0);
      done();
    });
  });

  it("Should check User passes correct sequence of symbols as argument for --config that matches regular expression - No errors case 3 from task", (done) => {
    const ls = spawn("node", [
      "./caesar_cli_tool_task_1/caesar_cli.js",
      "-c",
      "A-A-A-R1-R0-R0-R0-C1-C1-A",
    ]);

    ls.stdin.write('This is secret. Message about "_" symbol!');
    ls.stdin.end();

    ls.stdout.on("data", (data) => {
      data = data.toString("utf8");
      expect(data).toBe('Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!');
    });

    ls.stderr.on("data", (data) => {
      data = data.toString("utf8");
    });

    ls.on("close", (code) => {
      expect(code).toBe(0);
      done();
    });
  });

  it("Should check User passes correct sequence of symbols as argument for --config that matches regular expression - No errors case 4 from task", (done) => {
    const ls = spawn("node", [
      "./caesar_cli_tool_task_1/caesar_cli.js",
      "-c",
      "C1-R1-C0-C0-A-R0-R1-R1-A-C1",
    ]);

    ls.stdin.write('This is secret. Message about "_" symbol!');
    ls.stdin.end();

    ls.stdout.on("data", (data) => {
      data = data.toString("utf8");
      expect(data).toBe('This is secret. Message about "_" symbol!');
    });

    ls.stderr.on("data", (data) => {
      data = data.toString("utf8");
    });

    ls.on("close", (code) => {
      expect(code).toBe(0);
      done();
    });
  });
});
