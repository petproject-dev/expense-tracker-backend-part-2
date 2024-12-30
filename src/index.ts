import express, { Request, Response } from 'express';
import config from './config';
import { expensesController } from './expenses/expenses.controller';
import errorHandler from './helpers/middlewares/errorHandler';

const app = express();
app.use(express.json());

app.use('/api/expenses', expensesController);
app.get('/api/ping', (req: Request, res: Response) => {
	res.json({ message: 'pong' });
});

app.use(errorHandler);
app.use('*', (req: Request, res: Response) => {
	res.status(404).send('Page not found');
});

app.listen(config.port, () =>
	console.log(`Server listening on port ${config.port}`),
);
