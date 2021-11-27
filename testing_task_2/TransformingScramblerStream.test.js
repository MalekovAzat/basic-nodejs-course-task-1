const Scrambler = require("../caesar_cli_tool_task_1/TransformScrambler");

describe("TransfromScramblerTest stream for ceasar case", () => {
  it("Should return shifted to one symbol for upper case", (done) => {
    const scrumblerStream = new Scrambler({ shift: 1, mode: "+" });

    scrumblerStream.on("data", (chunk) => {
      expect(chunk.toString("utf8")).toBe("BCD");
      done();
    });

    scrumblerStream.write("ABC");
  });

  it("Should return not shifted line", (done) => {
    const scrumblerStream = new Scrambler({ shift: 1, mode: "+" });
    scrumblerStream.on("data", (chunk) => {
      expect(chunk.toString("utf8")).toBe("!@#$%^&*()");
      done();
    });
    scrumblerStream.write("!@#$%^&*()");
  });

  it("Should return shifted to one symbol for lower case", (done) => {
    const scrumblerStream = new Scrambler({ shift: 1, mode: "+" });
    scrumblerStream.on("data", (chunk) => {
      expect(chunk.toString("utf8")).toBe("bcdefgh");
      done();
    });
    scrumblerStream.write("abcdefg");
  });

  it("Should return shifted to one random string", (done) => {
    const scrumblerStream = new Scrambler({ shift: 1, mode: "+" });
    scrumblerStream.on("data", (chunk) => {
      expect(chunk.toString("utf8")).toBe("1234btebBTEBTE??bte/btelkbtei");
      done();
    });
    scrumblerStream.write("1234asdaASDASD??asd/asdkjasdh");
  });

  it("Should call function several times", (done) => {
    const scrumblerStream = new Scrambler({ shift: 1, mode: "+" });

    let spy = jest
      .spyOn(scrumblerStream, "_shiftSymbol")
      .mockImplementation(
        (originSymbol, shift = 0, mode = "+") => originSymbol
      );

    scrumblerStream.on("data", (chunk) => {
      expect(chunk.toString("utf8")).toBe("1234asdaASDASD??asd/asdkjasdh\n");
      expect(spy.mock.calls.length).toBe(
        "1234asdaASDASD??asd/asdkjasdh\n".length
      );
      done();
    });
    scrumblerStream.write("1234asdaASDASD??asd/asdkjasdh\n");
  });
});
