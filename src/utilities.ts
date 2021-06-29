/* eslint-disable @typescript-eslint/no-var-requires */
export interface ITValidator<T> {
  (input: string, options: T): boolean;
}
export function readLine(question: string): Promise<string> {
  // unload options
  const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let response = '';
  readLine.setPrompt(question);
  readLine.prompt();
  return new Promise((resolve, reject) => {
    readLine.on('line', (userInput: string) => {
      response = userInput;
      readLine.close();
    });
    readLine.on('close', () => {
      resolve(response);
    });
  });
}
/**
 *
 * This function takes a prompt, a validator function and arguments the validator may need
 * @param question - prompt for the user.
 * @param validator - a validator function that validates the input
 * @param options - any arguments that a caller would need to validate the input
 * @returns string - the input from the user
 */
export function readLineAndValidate<T>(
  question: string,
  validator: ITValidator<T> = () => true,
  options: T
): Promise<string> {
  //
  const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let response = '';
  readLine.setPrompt(question);
  readLine.prompt();
  return new Promise((resolve, reject) => {
    readLine.on('line', (userInput: string) => {
      response = userInput;
      if (validator(userInput, options)) {
        readLine.close();
      } else {
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
