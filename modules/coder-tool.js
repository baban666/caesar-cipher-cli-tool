const fs = require('fs');
const { pipeline } = require('stream');
const { TransformStream, encode, decode } = require('./transform-stream');
const { errorHandler } = require('./commands-validate');

const coderTool = (shift, action, input, output, inputPath, outputPath) => {
        const modifyFn = action === 'encode' ? encode : decode;
        const letterTransform = new TransformStream({ modifyFn, shift });
        const letterwrite = output
            ? fs.createWriteStream(outputPath, {
                highWaterMark: 32 * 1024,
                flags: 'a'
            })
            : process.stdout;

        const letterread = input
            ? fs.createReadStream(inputPath, { highWaterMark: 32 * 1024 })
            : process.stdin;

        pipeline(letterread, letterTransform, letterwrite, err => {
            if (err) {
                errorHandler('Pipeline', 13, err.message);
            }
            console.log('Pipeline finished correct');
        });
};

module.exports = {
    coderTool
};
