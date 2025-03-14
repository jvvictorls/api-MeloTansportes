import express from 'express';
import cookieParser from 'cookie-parser';
import router from './Routes';
import 'express-async-errors';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.app.use(express.json());
    this.app.use(cookieParser());

    this.config();

    this.routes();
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
  }

  private routes(): void {
    this.app.use(router);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
