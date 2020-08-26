import pino from 'pino';

function logger() {
  return pino({
    name: 'donus-challenge-code',
    level: 'debug',
    prettifier: {
      levelFirst: true,
      colorize: true
    }
  });
}

export default logger();