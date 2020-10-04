const fs = require('fs')

const errorHandler = (message, errorCode, inputMessage) => {
    process.stdout.write(`${message}! ${inputMessage}`)
    process.exit(errorCode);
    throw new Error(`${message}! ${inputMessage}`);
};

const validatePath = (inputPath, outputPath) => {
    try {
        fs.accessSync(inputPath, fs.constants.R_OK);
        fs.accessSync(inputPath, fs.constants.F_OK);
    } catch (err) {
        if (err.code === 'EPERM') {
            errorHandler('Input file is not readable', 8, inputPath);
        }
        if (err.code === 'ENOENT') {
            errorHandler('Input file is not exist', 7, inputPath);
        }
    }

    try {
        fs.accessSync(outputPath, fs.constants.F_OK);
        fs.accessSync(outputPath, fs.constants.W_OK);
    } catch (err) {
        if (err.code === 'ENOENT') {
            errorHandler('Output file is not exist', 9, outputPath);
        }
        if (err.code === 'EPERM') {
            errorHandler('Input file is not writable', 10, outputPath);
        }
    }
};

const commandValidate = (shift, input, output, actionType) => {

    if(!shift){
        errorHandler('Required', 4,`Argument "shift" is require`)
    }

    if(!Number.isInteger(+shift)){
        errorHandler('Invalid type', 5, `Argument "shift" must be number`)
    }

    if(!actionType){
        errorHandler('Required', 3, `Argument "actionType" is require`);
    }

    if(actionType && actionType !== 'encode' && actionType !== 'decode'){
        errorHandler('Invalid parameter', 6, `Argument "actionType" must be encode/decode`);
    }

    validatePath(input, output)
};

module.exports = {
    commandValidate,
    errorHandler,
};
