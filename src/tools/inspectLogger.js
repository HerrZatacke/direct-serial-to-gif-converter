/* eslint-disable no-console */
if (process.execArgv.includes('--inspect')) {
  const originalLog = console.log;
  const originalWrite = process.stdout.write;

  console.log = (...rest) => {
    process.stdout.write = () => {};
    originalLog.call(console, ...rest);
    process.stdout.write = originalWrite;
  };
}
