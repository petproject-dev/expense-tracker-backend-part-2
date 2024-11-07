import { Request, Response, NextFunction } from 'express';
import Exception from '../common/Exception';
import Logger from '../common/Logger';

const logger = new Logger();

const errorHandler = (
	err: Error | Exception,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (res.headersSent) {
		return next(err);
	}

	logger.error(err);

	if (err instanceof Exception) {
		res.status(err.statusCode || 500).json({ error: err.message });
	}

	res.status(500).json({ error: err.message || 'Internal Server Error' });
};

export default errorHandler;
