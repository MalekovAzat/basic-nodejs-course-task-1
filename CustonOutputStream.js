const { Writable } = require("stream");
const fs = require("fs");

class CustonOutputStream extends Writable {
  constructor(filename) {
    super();
    if (filename) {
      this.fd = fs.openSync(filename, "a");
    } else {
      this.fd = 1;
    }
  }
  _construct(callback) {
    fs.open(this.filename, (err, fd) => {
      if (err) {
        callback(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
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
