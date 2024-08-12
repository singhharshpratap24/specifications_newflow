const { format, createLogger, transports } = require("winston");
const { combine, timestamp, label, printf, json, level } = format;

//Using the printf format.
const customFormat = printf(({ level, message, classname, timestamp }) => {
  return `${timestamp} [${classname}] ${level}: ${message}`;
});

const logpath = './test_results/logger/combined.log'
const CATEGORY = "class name";

const logger = createLogger(
 
    // {
    //     //level: "info",
    //     defaultMeta: { classname: 'not defined' },

    //     format: combine(
    //       timestamp({
    //         format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    //       }),
    //         //format: printf(({ message, classname, level }) => `[${classname}] ${level}: ${message}`),
        
    //       //  printf((info) => `[${info.timestamp}] [${classname}] [${info.meta}] ${info.level}: ${info.message}`)
    //     ),
    //     transports: [
    //         new transports.Console(),
    //         new transports.File({ filename: logpath })],
    // },
    {
        //level: "error",
        format: combine(timestamp(), customFormat),
        transports: [
            new transports.Console(),
            new transports.File({ filename: logpath })],
    }
);

module.exports = logger;