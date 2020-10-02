const { Command } = require('commander');
const programCommands = new Command();

programCommands.passCommandToAction(false)
            .storeOptionsAsProperties(false)
            .version('0.0.1');
programCommands.option('-a, --action <string>', 'an action encode/decode')
                .option('-i, --input <string>', 'an input file')
                .option('-s, --shift <number>', 'a shift')
                .option('-o, --output <string>', 'an output file')
                .parse(process.argv);

module.exports = {
    programCommands
};
