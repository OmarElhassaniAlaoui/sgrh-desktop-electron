import initSqlJs, { Database } from "sql.js";
import { useEffect, useState } from "react";

// Define the database schema
const SCHEMA = `
  CREATE TABLE IF NOT EXISTS fontionnaire (
    cin TEXT PRIMARY KEY,
    Matricule TEXT,
    NSOM TEXT,
    Nom_Fr TEXT,
    Nom_ar TEXT,
    Sexe TEXT,
    TEL TEXT,
    Tel2 TEXT,
    c_grade TEXT,
    C_Division TEXT,
    Budget TEXT,
    nat_conge TEXT,
    anneePr INTEGER,
    reliqanc INTEGER,
    anneeCourant INTEGER,
    reliqnv INTEGER,
    Adressefr TEXT,
    Adressear TEXT,
    n_decision TEXT,
    Date_decision TEXT,
    remplacantfr TEXT,
    remplacantar TEXT,
    date_naissance TEXT,
    lieu_naissance TEXT,
    adresse TEXT,
    numero_telephone TEXT,
    niveau_scolaire TEXT,
    diplome TEXT,
    date_recrutement TEXT,
    fonction TEXT,
    code_situation TEXT,
    statut TEXT,
    reg_grade TEXT,
    Retr_mutation TEXT,
    Deja_benif INTEGER
  );

  CREATE TABLE IF NOT EXISTS traitement (
    cin TEXT PRIMARY KEY,
    Matricule TEXT,
    NSOM TEXT,
    Nom_Fr TEXT,
    Nom_ar TEXT,
    Sexe TEXT,
    TEL TEXT,
    Tel2 TEXT,
    c_grade TEXT,
    grade_fr TEXT,
    grade_ar TEXT,
    C_Division TEXT,
    Division TEXT,
    Budget TEXT,
    typecongefr TEXT,
    typecongear TEXT,
    anneepr INTEGER,
    reliqanc INTEGER,
    anneeCourant INTEGER,
    reliqnv INTEGER,
    Adressefr TEXT,
    Adressear TEXT,
    n_decision TEXT,
    Date_decision TEXT,
    remplacantfr TEXT,
    remplacantar TEXT,
    code_nat_conge TEXT,
    datedepart TEXT,
    dateretour TEXT,
    jouranneepr INTEGER,
    restejourpr INTEGER,
    jouranneecourant INTEGER,
    restejourcourant INTEGER,
    totaljourconge INTEGER,
    restetotaljour INTEGER,
    datesaisie TEXT,
    nondeduire TEXT,
    anneecongeanc INTEGER,
    anneecongecour INTEGER,
    jourexcep INTEGER,
    annejourexcep INTEGER,
    raisonar TEXT,
    raisonfr TEXT
  );

  CREATE TABLE IF NOT EXISTS jours (
    Nbr INTEGER PRIMARY KEY,
    Joursar TEXT,
    Joursfr TEXT
  );

    CREATE TABLE IF NOT EXISTS grade (
        Code_grade INTEGER PRIMARY KEY,
        Gradefr TEXT , 
        Gradear TEXT
    );

    CREATE TABLE IF NOT EXISTS division (
        Code_Division INTEGER PRIMARY KEY,
        Div_fr TEXT , 
        Div_ar TEXT
    );

    CREATE TABLE IF NOT EXISTS typeconge (
        Code_conge INTEGER PRIMARY KEY,
        Typecongefr TEXT , 
        Typecongear TEXT
    );
`;

// Initialize the database
export const useDatabase = () => {
  const [db, setDb] = useState<Database | null>(null);

  useEffect(() => {
    const initializeDB = async () => {
      const SQL = await initSqlJs({
        locateFile: (file) => `https://sql.js.org/dist/${file}`,
      });
      const database = new SQL.Database();
      database.exec(SCHEMA);
      setDb(database);
    };

    initializeDB();
  }, []);

  return db;
};
