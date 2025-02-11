
// src/db/db.ts
import Database from 'better-sqlite3';
import { app } from 'electron';
import path from 'path';// src/types/database.ts
export interface Fonctionnaire {
  cin: string;
  Matricule: string;
  NSOM: string;
  Nom_Fr: string;
  Nom_ar: string;
  Sexe: string;
  TEL: string;
  Tel2: string;
  c_grade: string;
  C_Division: string;
  Budget: string;
  nat_conge: string;
  anneePr: number;
  reliqanc: number;
  anneeCourant: number;
  reliqnv: number;
  Adressefr: string;
  Adressear: string;
  n_decision: string;
  Date_decision: string;
  remplacantfr: string;
  remplacantar: string;
  date_naissance: string;
  lieu_naissance: string;
  adresse: string;
  numero_telephone: string;
  niveau_scolaire: string;
  diplome: string;
  date_recrutement: string;
  fonction: string;
  code_situation: string;
  statut: string;
  reg_grade: string;
  Retr_mutation: string;
  Deja_benif: number;
}

export interface Traitement {
  cin: string;
  Matricule: string;
  NSOM: string;
  Nom_Fr: string;
  Nom_ar: string;
  Sexe: string;
  TEL: string;
  Tel2: string;
  c_grade: string;
  grade_fr: string;
  grade_ar: string;
  C_Division: string;
  Division: string;
  Budget: string;
  typecongefr: string;
  typecongear: string;
  anneepr: number;
  reliqanc: number;
  anneeCourant: number;
  reliqnv: number;
  Adressefr: string;
  Adressear: string;
  n_decision: string;
  Date_decision: string;
  remplacantfr: string;
  remplacantar: string;
  code_nat_conge: string;
  datedepart: string;
  dateretour: string;
  jouranneepr: number;
  restejourpr: number;
  jouranneecourant: number;
  restejourcourant: number;
  totaljourconge: number;
  restetotaljour: number;
  datesaisie: string;
  nondeduire: string;
  anneecongeanc: number;
  anneecongecour: number;
  jourexcep: number;
  annejourexcep: number;
  raisonar: string;
  raisonfr: string;
}

export interface Grade {
  Code_grade: number;
  Gradefr: string;
  Gradear: string;
}

export interface Division {
  Code_Division: number;
  Div_fr: string;
  Div_ar: string;
}

export interface TypeConge {
  Code_conge: number;
  Typecongefr: string;
  Typecongear: string;
}

export interface Jours {
  Nbr: number;
  Joursar: string;
  Joursfr: string;
}

// src/db/queries.ts
export const queries = {
  // Fonctionnaire queries
  getFonctionnaire: `
    SELECT * FROM fontionnaire WHERE cin = ?
  `,
  getAllFonctionnaires: `
    SELECT * FROM fontionnaire
  `,
  searchFonctionnaires: `
    SELECT * FROM fontionnaire 
    WHERE Nom_Fr LIKE ? OR Nom_ar LIKE ? OR Matricule LIKE ?
  `,
  insertFonctionnaire: `
    INSERT INTO fontionnaire (
      cin, Matricule, NSOM, Nom_Fr, Nom_ar, Sexe, TEL, Tel2,
      c_grade, C_Division, Budget, nat_conge, anneePr, reliqanc,
      anneeCourant, reliqnv, Adressefr, Adressear, n_decision,
      Date_decision, remplacantfr, remplacantar, date_naissance,
      lieu_naissance, adresse, numero_telephone, niveau_scolaire,
      diplome, date_recrutement, fonction, code_situation, statut,
      reg_grade, Retr_mutation, Deja_benif
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
  updateFonctionnaire: `
    UPDATE fontionnaire SET
      Matricule = ?, NSOM = ?, Nom_Fr = ?, Nom_ar = ?, Sexe = ?,
      TEL = ?, Tel2 = ?, c_grade = ?, C_Division = ?, Budget = ?,
      nat_conge = ?, anneePr = ?, reliqanc = ?, anneeCourant = ?,
      reliqnv = ?, Adressefr = ?, Adressear = ?, n_decision = ?,
      Date_decision = ?, remplacantfr = ?, remplacantar = ?,
      date_naissance = ?, lieu_naissance = ?, adresse = ?,
      numero_telephone = ?, niveau_scolaire = ?, diplome = ?,
      date_recrutement = ?, fonction = ?, code_situation = ?,
      statut = ?, reg_grade = ?, Retr_mutation = ?, Deja_benif = ?
    WHERE cin = ?
  `,
  deleteFonctionnaire: `
    DELETE FROM fontionnaire WHERE cin = ?
  `,

  // Traitement queries
  getTraitement: `
    SELECT * FROM traitement WHERE cin = ?
  `,
  insertTraitement: `
    INSERT INTO traitement (
      cin, Matricule, NSOM, Nom_Fr, Nom_ar, Sexe, TEL, Tel2,
      c_grade, grade_fr, grade_ar, C_Division, Division, Budget,
      typecongefr, typecongear, anneepr, reliqanc, anneeCourant,
      reliqnv, Adressefr, Adressear, n_decision, Date_decision,
      remplacantfr, remplacantar, code_nat_conge, datedepart,
      dateretour, jouranneepr, restejourpr, jouranneecourant,
      restejourcourant, totaljourconge, restetotaljour, datesaisie,
      nondeduire, anneecongeanc, anneecongecour, jourexcep,
      annejourexcep, raisonar, raisonfr
    ) VALUES (${Array(42).fill('?').join(', ')})
  `,

  // Reference data queries
  getAllGrades: `SELECT * FROM grade`,
  getAllDivisions: `SELECT * FROM division`,
  getAllTypeConges: `SELECT * FROM typeconge`,
  getAllJours: `SELECT * FROM jours`
};



export class DatabaseService {
  private db: Database.Database;

  constructor() {
    const dbPath = path.join(app.getPath('userData'), 'sgrh.db');
    this.db = new Database(dbPath);
    this.initDatabase();
  }

  private initDatabase() {
    // Create tables if they don't exist
    const tables = [
      `CREATE TABLE IF NOT EXISTS fontionnaire (...)`, // Your existing schema
      `CREATE TABLE IF NOT EXISTS traitement (...)`,   // Your existing schema
      `CREATE TABLE IF NOT EXISTS jours (...)`,        // Your existing schema
      `CREATE TABLE IF NOT EXISTS grade (...)`,        // Your existing schema
      `CREATE TABLE IF NOT EXISTS division (...)`,     // Your existing schema
      `CREATE TABLE IF NOT EXISTS typeconge (...)`     // Your existing schema
    ];

    tables.forEach(table => {
      this.db.exec(table);
    });
  }

  // Fonctionnaire operations
  getFonctionnaire(cin: string): Fonctionnaire | undefined {
    return this.db.prepare(queries.getFonctionnaire).get(cin);
  }

  getAllFonctionnaires(): Fonctionnaire[] {
    return this.db.prepare(queries.getAllFonctionnaires).all();
  }

  searchFonctionnaires(searchTerm: string): Fonctionnaire[] {
    const term = `%${searchTerm}%`;
    return this.db.prepare(queries.searchFonctionnaires)
      .all(term, term, term);
  }

  insertFonctionnaire(fonctionnaire: Fonctionnaire) {
    const stmt = this.db.prepare(queries.insertFonctionnaire);
    return stmt.run(Object.values(fonctionnaire));
  }

  updateFonctionnaire(fonctionnaire: Fonctionnaire) {
    const stmt = this.db.prepare(queries.updateFonctionnaire);
    return stmt.run([...Object.values(fonctionnaire), fonctionnaire.cin]);
  }

  // Traitement operations
  insertTraitement(traitement: Traitement) {
    const stmt = this.db.prepare(queries.insertTraitement);
    return stmt.run(Object.values(traitement));
  }

  // Reference data operations
  getAllGrades(): Grade[] {
    return this.db.prepare(queries.getAllGrades).all();
  }

  getAllDivisions(): Division[] {
    return this.db.prepare(queries.getAllDivisions).all();
  }

  getAllTypeConges(): TypeConge[] {
    return this.db.prepare(queries.getAllTypeConges).all();
  }

  getAllJours(): Jours[] {
    return this.db.prepare(queries.getAllJours).all();
  }
}

export const db = new DatabaseService();