import Database from 'better-sqlite3';
import { getDbPath } from './config';
import fs from 'fs';
import path from 'path';

let db: Database.Database;

export const initializeDatabase = () => {
  const dbPath = getDbPath();
  
  // Ensure directory exists
  const dbDir = path.dirname(dbPath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  db = new Database(dbPath);
  
  // Load and execute schema
  const schema = fs.readFileSync(
    path.join(__dirname, 'migrations', 'schema.sql'),
    'utf8'
  );
  db.exec(schema);
  
  return db;
};

export const getDb = () => {
  if (!db) {
    return initializeDatabase();
  }
  return db;
};