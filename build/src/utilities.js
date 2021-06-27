"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readLineAndValidate = exports.readLine = void 0;
function readLine(question) {
    // unload options
    const readLine = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    let response = '';
    readLine.setPrompt(question);
    readLine.prompt();
    return new Promise((resolve, reject) => {
        readLine.on('line', (userInput) => {
            response = userInput;
            readLine.close();
        });
        readLine.on('close', () => {
            resolve(response);
        });
    });
}
exports.readLine = readLine;
function readLineAndValidate(question, validator = () => true, options) {
    //
    const readLine = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    let response = '';
    readLine.setPrompt(question);
    readLine.prompt();
    return new Promise((resolve, reject) => {
        readLine.on('line', (userInput) => {
            response = userInput;
            if (validator(userInput, options)) {
                readLine.close();
            }
            else {
                readLine.prompt();
            }
        });
        readLine.on('close', () => {
            resolve(response);
        });
        readLine.on('SIGINT', () => {
            // TODO : Probably don't want the user to just be able to exit later on.
            // ! this is for now since I need a way to just stop the process while im testing
            // eslint-disable-next-line no-process-exit
            process.exit();
        });
    });
}
exports.readLineAndValidate = readLineAndValidate;
//# sourceMappingURL=utilities.js.map