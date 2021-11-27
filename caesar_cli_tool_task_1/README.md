# basic-nodejs-course-task-1

## How to test cli tool

The main file is `caesar_cli.js` which hold the implementation of the cli tool.  
Cli tool supports several command line arguments:

- `-c`, `--config` - required - used for provide a configuration like "`C0-C1`"
- `-i`, `--input` - used for set the input file, for example "`./input.txt`". If not set the input is `process.stdin`
- `-o`, `--output` - used for set the output file, for example "`./output.txt`".If not set the output is `process.stdout`

Examples of use:

```bash
node caesar_cli -c "C1-R1-C0-C0-A-R0-R1-R1-A-C1" -i "./input.txt" -o "./output.txt"
```
