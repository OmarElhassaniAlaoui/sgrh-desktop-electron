CREATE TABLE employees (
    cin TEXT PRIMARY KEY,
    matricule TEXT UNIQUE,
    nsom TEXT,
    nom_fr TEXT,
    nom_ar TEXT,
    sexe TEXT,
    tel TEXT,
    tel2 TEXT,
    c_grade TEXT,
    c_division TEXT,
    budget TEXT,
    date_recrutement DATE,
    fonction TEXT,
    code_situation TEXT,
    statut TEXT,
    reg_grade TEXT,
    retr_mutation TEXT,
    deja_benif BOOLEAN,
    date_naissance DATE,
    lieu_naissance TEXT,
    adresse TEXT,
    niveau_scolaire TEXT,
    diplome TEXT,
    n_decision TEXT,
    date_decision DATE,
    remplacantfr TEXT,
    remplacantar TEXT,
    anneePr INTEGER,
    reliqanc REAL,
    anneeCourant INTEGER,
    reliqnv REAL
);

CREATE TABLE leave_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cin TEXT,
    start_date DATE,
    end_date DATE,
    leave_type TEXT,
    status TEXT DEFAULT 'pending',
    requested_by TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (cin) REFERENCES employees(cin)
);

CREATE TABLE leave_types (
  code TEXT PRIMARY KEY,
  name_fr TEXT,
  name_ar TEXT
);

INSERT INTO leave_types (code, name_fr, name_ar) VALUES
('ANNUAL', 'Annuel', 'سنوي'),
('SICK', 'Maladie', 'مرض'),
('MATERNITY', 'Maternité', 'أمومة'),
('EXCEPTIONAL', 'Exceptionnel', 'استثنائي');

CREATE TABLE budget_types (
    code TEXT PRIMARY KEY,
    name TEXT
);

INSERT INTO budget_types (code, name) VALUES
('BC', 'Budget Communal'),
('PN', 'Promotion Nationale');