const { exec } = require("child_process");

const Scrambler = require("../caesar_cli_tool_task_1/TransformScrambler");

describe("TransfromScramblerTest shift to one (Caesar case)", () => {
  const scrumbler = new Scrambler({ shift: 1, mode: "+" });
  it("Should return shifted to one symbol for upper case", () => {
    expect(scrumbler._shiftSymbol("A", 1, "+")).toBe("B");
    expect(scrumbler._shiftSymbol("Z", 1, "+")).toBe("A");
    expect(scrumbler._shiftSymbol("B", 1, "+")).toBe("C");
  });

  it("Should return not shifted not alphabetical symbols", () => {
    expect(scrumbler._shiftSymbol("?", 1, "+")).toBe("?");
    expect(scrumbler._shiftSymbol("!", 1, "+")).toBe("!");
    expect(scrumbler._shiftSymbol("&", 1, "+")).toBe("&");
    expect(scrumbler._shiftSymbol("(", 1, "+")).toBe("(");
  });
  it("Should return shifted to one symbol for lower case", () => {
    expect(scrumbler._shiftSymbol("a", 1, "+")).toBe("b");
    expect(scrumbler._shiftSymbol("z", 1, "+")).toBe("a");
    expect(scrumbler._shiftSymbol("b", 1, "+")).toBe("c");
    expect(scrumbler._shiftSymbol("b")).toBe("b");
  });
});

describe("TransfromScramblerTest shift to 8 (ROT-8 case)", () => {
  const scrumbler = new Scrambler({ shift: 8, mode: "+" });
  it("Should return shifted to 8 symbol for upper case", () => {
    expect(scrumbler._shiftSymbol("A", 8, "+")).toBe("I");
    expect(scrumbler._shiftSymbol("Z", 8, "+")).toBe("H");
    expect(scrumbler._shiftSymbol("B", 8, "+")).toBe("J");
  });

  it("Should return not shifted not alphabetical symbols", () => {
    expect(scrumbler._shiftSymbol("?", 8, "+")).toBe("?");
    expect(scrumbler._shiftSymbol("!", 8, "+")).toBe("!");
    expect(scrumbler._shiftSymbol("&", 8, "+")).toBe("&");
    expect(scrumbler._shiftSymbol("(", 8, "+")).toBe("(");
  });
  it("Should return shifted to 8 symbol for lower case", () => {
    expect(scrumbler._shiftSymbol("a", 8, "+")).toBe("i");
    expect(scrumbler._shiftSymbol("z", 8, "+")).toBe("h");
    expect(scrumbler._shiftSymbol("b", 8, "+")).toBe("j");
  });
});

describe("TransfromScramblerTest reverse (Atbash case)", () => {
  const scrumbler = new Scrambler({ shift: -1, mode: "-" });
  it("Should return reversed symbols for upper case", () => {
    expect(scrumbler._shiftSymbol("A", -1, "-")).toBe("Z");
    expect(scrumbler._shiftSymbol("Z", -1, "-")).toBe("A");
    expect(scrumbler._shiftSymbol("B", -1, "-")).toBe("Y");
  });

  it("Should return not shifted not alphabetical symbols", () => {
    expect(scrumbler._shiftSymbol("?", -1, "-")).toBe("?");
    expect(scrumbler._shiftSymbol("!", -1, "-")).toBe("!");
    expect(scrumbler._shiftSymbol("&", -1, "-")).toBe("&");
    expect(scrumbler._shiftSymbol("(", -1, "-")).toBe("(");
  });
  it("Should return reversed symbols for lower case", () => {
    expect(scrumbler._shiftSymbol("a", -1, "-")).toBe("z");
    expect(scrumbler._shiftSymbol("z", -1, "-")).toBe("a");
    expect(scrumbler._shiftSymbol("b", -1, "-")).toBe("y");
  });
});
