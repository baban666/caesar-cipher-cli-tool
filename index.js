const {programCommands} = require('./modules/program-commands');

const run = ({ shift, action, input, output }) => {

};

run(programCommands.opts());

process.on('exit', code => {
  console.log(`Process exited with code ${code}`);
});
