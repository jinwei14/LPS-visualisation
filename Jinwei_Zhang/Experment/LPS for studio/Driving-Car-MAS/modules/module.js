module.exports = (engine, program) => {
  engine.define('testPrint', (message) => {
    console.log( message.evaluate());
    return [{ theta: {} }];
  });
};
