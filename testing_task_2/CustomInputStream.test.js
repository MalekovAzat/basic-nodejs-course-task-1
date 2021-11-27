const { read } = require("fs");
const CustomInputStream = require("../caesar_cli_tool_task_1/CustonInputStream");

describe("Custom readable stream", () => {
  it("Should provide data from file without changes", (done) => {
    const readableStream = new CustomInputStream(
      "./caesar_cli_tool_task_1/input.txt"
    );
    readableStream.on("data", (chunk) => {
      expect(chunk.toString("utf8")).toBe(
        'This is secret. Message about "_" symbol!'
      );
      done();
    });
  });

  it("Should create stdin stream with no exception", () => {
    const readableStream = new CustomInputStream("");

    expect(readableStream.filename).toBe("");
  });

  it("Should throw the exception cause cannot open the file", (done) => {
    const readableStream = new CustomInputStream("12312asd");

    readableStream.on("error", (error) => {
      expect(error.message).toBe(
        "ENOENT: no such file or directory, open '12312asd'"
      );
      done();
    });
  });

  it("Should throw the exception cause wrong descriptior", (done) => {
    const readableStream = new CustomInputStream("");

    readableStream.fd = 10;
    readableStream.read();
    readableStream.on("error", (error) => {
      expect(error.message).toBe(
        "EAGAIN: resource temporarily unavailable, read"
      );
      done();
    });
  });
});
