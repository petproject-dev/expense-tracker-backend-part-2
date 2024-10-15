import express, { Request, Response } from 'express';
import config from './config';

const app = express();

app.get('/api/ping', (req: Request, res: Response) => {
    res.json({"message":"pong"});
})

app.listen(config.port, () => console.log(`Server listening on port ${config.port}`));