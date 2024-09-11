const logger = (message) => {
  console.log(message);
};
const capitalLogger = (message) => {
  console.log(message.toUpperCase());
};
module.exports = { logger, capitalLogger };
