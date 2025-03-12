import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
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
    this.app.use(cors(
      {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    ));
  }

  private routes(): void {
    this.app.use(router);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
