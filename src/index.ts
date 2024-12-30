import express, { Request, Response } from 'express';
import config from './config';
import errorHandler from './middlewares/errorHandler';

const app = express();
app.use(express.json());

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
