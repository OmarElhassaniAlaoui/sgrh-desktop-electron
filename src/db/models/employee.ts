import { getDb } from '../db';

export interface Employee {
  id?: number;
  name: string;
  email: string;
  department: string;
}

export const employeeModel = {
  create: (employee: Omit<Employee, 'id'>) => {
    const db = getDb();
    const stmt = db.prepare(
      'INSERT INTO employees (name, email, department) VALUES (?, ?, ?)'
    );
    return stmt.run(employee.name, employee.email, employee.department);
  },

  findAll: () => {
    const db = getDb();
    return db.prepare('SELECT * FROM employees').all();
  },

  // Add more methods as needed
};