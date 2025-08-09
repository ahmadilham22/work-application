import * as dotenv from 'dotenv';
import { logger } from './application/logging';
import { web } from './application/web';

dotenv.config();

web.listen(3000, () => {
  logger.info(`listening to http://localhost:${3000}`);
});
