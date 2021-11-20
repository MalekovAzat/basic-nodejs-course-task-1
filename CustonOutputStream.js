const { Writable } = require("stream");
const fs = require("fs");

class CustonOutputStream extends Writable {
  constructor(filename) {
    super();
    this.filename = filename;
  }

  _construct(callback) {
    if (this.filename !== "") {
      fs.open(this.filename, "a", (err, fd) => {
        if (err) {
          callback(err);
        } else {
          this.fd = fd;
          callback();
        }
      });
    } else {
      this.fd = 1;
      callback();
    }
  }

  _write(chunk, encoding, callback) {
    fs.write(this.fd, chunk, callback);
  }

  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }
}

module.exports = CustonOutputStream;
