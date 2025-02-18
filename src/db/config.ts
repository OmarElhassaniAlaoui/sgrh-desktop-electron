import path from 'path';
import { app } from 'electron';

export const dbConfig = {
  development: {
    path: path.join(__dirname, 'database.db')
  },
  production: {
    path: path.join(app.getPath('userData'), 'database.db')
  }
};

export const getDbPath = () => {
  const isDev = process.env.NODE_ENV === 'development';
  return isDev ? dbConfig.development.path : dbConfig.production.path;
};