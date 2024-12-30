import { Request, Response, NextFunction } from 'express';
import { Schema, ValidationError } from 'yup';
import Exception from '../Exception';

const validator = (schema: Schema, property = 'body') => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const data = property === 'body' ? req.body : req.query;
		try {
			await schema.validate(data);
		} catch (error) {
			const err = error as ValidationError;

			next(new Exception(400, `${err.errors.map((message) => message)}`));
		}

		next();
	};
};

export default validator;
