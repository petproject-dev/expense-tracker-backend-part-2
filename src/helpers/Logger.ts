import winston, { Logger as WinstonLogger } from 'winston';
import config from '../config';

export default class Logger {
	logger: WinstonLogger;

	constructor() {
		const loggerTransports =
			config.NODE_ENV === 'production'
				? [new winston.transports.File({ filename: 'app.log' })]
				: [new winston.transports.Console()];

		this.logger = winston.createLogger({
			level: 'info',
			format: winston.format.combine(
				winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
				winston.format.printf(({ timestamp, level, message }) => {
					return `${timestamp} [${level.toUpperCase()}]: ${message}`;
				}),
			),
			transports: loggerTransports,
		});
	}

	log(message: string) {
		this.logger.info(message);
	}

	warn(message: string) {
		this.logger.warn(message);
	}

	error(message: string | object) {
		this.logger.error(message);
	}
}
