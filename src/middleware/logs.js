import winston from 'winston';
import expressWinston from 'express-winston';

const logger = () => {
    if (process.env.LOGS !== 'true') {
        return (req, res, next) => next();
    }
    return expressWinston.logger({
        transports: [
            new winston.transports.Console({
                json: false,
                colorize: true
            })
        ],
        meta: false,
        msg: "HTTP {{req.method}} {{req.url}}",
        expressFormat: true,
        colorize: true
    });
};

module.exports = { logger };
