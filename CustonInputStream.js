const { Readable } = require("stream");
const fs = require("fs");

class CustomInputStream extends Readable {
  constructor(filename) {
    super();
    if (filename !== "") {
      this.fd = fs.openSync(filename);
    } else {
      this.fd = 0;
    }
  }

  _read(n) {
    const buf = Buffer.alloc(n);
    fs.read(this.fd, buf, 0, n, null, (err, bytesRead) => {
      if (err) {
        this.destroy(err);
      } else {
        this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
      }
    });
  }

  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }
}

module.exports = CustomInputStream;
