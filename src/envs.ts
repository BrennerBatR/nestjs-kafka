import * as dotenvyml from 'dotenv-yaml';
import { resolve as resolvePath } from 'path';

let typeEnv = '../.env';
switch (process.env.NODE_ENV) {
  case 'development':
    typeEnv = '.env.dev.yml';
    break;

  default:
    typeEnv = '.env.dev.yml';
    break;
}
dotenvyml.config({ path: resolvePath(process.cwd(), typeEnv) });
