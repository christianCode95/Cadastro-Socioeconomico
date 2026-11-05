import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
 
// O arquivo do banco fica em data/cadastro.db (na raiz do projeto)
const pastaDados = path.join(process.cwd(), "data");
fs.mkdirSync(pastaDados, { recursive: true });
 
const db = new Database(path.join(pastaDados, "cadastro.db"));
 
// WAL melhora a leitura/escrita simultânea; foreign_keys liga o ON DELETE CASCADE
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
 
// Cria as tabelas (se ainda não existirem) a partir do arquivo schema.sql
const schema = fs.readFileSync(path.join(process.cwd(), "lib", "schema.sql"), "utf8");
db.exec(schema);
 
export default db;
