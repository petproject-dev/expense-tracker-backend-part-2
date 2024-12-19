import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import Exception from '../Exception';

const validator = (schema: Schema, property = 'body') => {
	return (req: Request, res: Response, next: NextFunction) => {
		const data = property === 'body' ? req.body : req.query;
		const { error } = schema.validate(data, { abortEarly: false });

		if (error) {
			throw new Exception(
				400,
				`${error.details.map(({ message }) => message)}`,
			);
		}

		next();
	};
};

export default validator;
