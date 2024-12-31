import express, { Request, Response } from 'express';
import config from './config';
import { expensesController } from './expenses/expenses.controller';
import errorHandler from './helpers/middlewares/errorHandler';
import { logger } from './helpers/Logger';

const bootstrap = () => {
  const app = express();

  const useMiddlewares = () => {
    app.use(express.json());
  };

  const useRoutes = () => {
    app.use('/api/expenses', expensesController);
    app.get('/api/ping', (req: Request, res: Response) => {
      res.json({ message: 'pong' });
    });
  };

  const useExceptionFilter = () => {
    app.use(errorHandler);
    app.use('*', (req: Request, res: Response) => {
      res.status(404).send('Page not found');
    });
  };

  const init = () => {
    useMiddlewares();
    useRoutes();
    useExceptionFilter();

    const server = app.listen(config.port, () =>
      console.log(`Server listening on port ${config.port}`),
    );

    process.on('SIGTERM', () => {
      logger.error('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        logger.log('HTTP server closed');
      });
    });
  };

  return { init };
};

export const { init } = bootstrap();
