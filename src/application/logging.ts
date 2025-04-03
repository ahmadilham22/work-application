import winston from 'winston';

// Membuat logger dengan winston
// dengan level debug, level tersebut disarankan untuk proses development dan tidak untuk production
// format dari logger adalah tanggal -> level log -> message
// logger akan ditampilkan di Console dan juga di simpan di logs/app.log
export const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]:  ${
        typeof message === 'object' ? JSON.stringify(message, null, 2) : message
      }`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' }),
  ],
});
