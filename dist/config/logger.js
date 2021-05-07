import { createLogger, format, transports } from "winston";
const { combine, timestamp, prettyPrint, json } = format;
const logConf = {
    format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), prettyPrint({ colorize: true }), json()),
    transports: [
        new transports.File({
            filename: process.env.LOGGER_COMBINED,
        }),
        new transports.File({
            level: "error",
            filename: process.env.LOGGER_ERROR,
        }),
    ],
};
const logger = createLogger(logConf);
export default logger;
//# sourceMappingURL=logger.js.map