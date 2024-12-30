import { Request, Response, NextFunction } from 'express';
import Exception from '../Exception';
import { logger } from '../Logger';

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
