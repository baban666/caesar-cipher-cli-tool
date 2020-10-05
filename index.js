const path = require('path');
const {programCommands} = require('./modules/program-commands');
const { commandValidate } = require('./modules/commands-validate');
const {coderTool} = require('./modules/coder-tool');

const run = ({ shift, action, input, output }) => {
  try {
    const outputPath = output ? path.join(__dirname, output) : null;
    const inputPath = input ? path.join(__dirname, input) : null;

    commandValidate(shift, inputPath, outputPath, action);
    coderTool(shift, action, input, output, inputPath, outputPath);
  } catch (err) {
    console.error(err.message);
  }
};

run(programCommands.opts());

process.on('exit', code => {
  console.log(`Process exited with code ${code}`);
});
