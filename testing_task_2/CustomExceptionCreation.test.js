const ValidationError = require("../caesar_cli_tool_task_1/CustomException");

describe("ValidationError constructor", () => {
  it("Should create error with name ValidationError", () => {
    z = new ValidationError("message");
    expect(z.name).toBe("ValidationError");
  });

  it("Should create error with provided message", () => {
    z = new ValidationError("provided message");
    expect(z.message).toBe("provided message");
  });

  it("Should create exception with provided message", () => {
    z = new ValidationError("provided message");
    try {
      throw z;
    } catch (e) {
      expect(z.message).toBe("provided message");
    }
  });
});
