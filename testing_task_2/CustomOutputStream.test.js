const CustomOutputStream = require("../caesar_cli_tool_task_1/CustonOutputStream");
const fs = require("fs");
const { on } = require("events");

describe("Custom readable stream", () => {
  const pathToFile = "./caesar_cli_tool_task_1/output2.txt";

  beforeAll(() => {
    //   clear data from file
    fs.writeFileSync(pathToFile, "");
  });

  it("Should write data to file ./output.txt", (done) => {
    const writableStream = new CustomOutputStream(pathToFile);

    writableStream.write('This is secret. Message about "_" symbol!');
    writableStream.end();
    fs.readFile(pathToFile, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      expect(data).toBe('This is secret. Message about "_" symbol!');
      done();
    });
  });

  it("Should create stdout stream with no exception", () => {
    const writableStream = new CustomOutputStream("");
    // writableStream.close();
    expect(writableStream.filename).toBe("");
  });

  it("Should't open the file cause no read access ", (done) => {
    const writableStream = new CustomOutputStream(
      "./caesar_cli_tool_task_1/output3.txt"
    );
    writableStream.write("HELLO");
    writableStream.end();
    writableStream.on("error", (error) => {
      expect(error.message).toBe(
        "EACCES: permission denied, open './caesar_cli_tool_task_1/output3.txt'"
      );
      done();
    });
  });
});
