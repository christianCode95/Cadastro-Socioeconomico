import db from "./db.js";
 
// Retorna todas as opções agrupadas por lista:
// { parentesco: [{ codigo: "conjuge", rotulo: "Cônjuge" }, ...], sexo: [...], ... }
export function obterOpcoes() {
  const linhas = db
    .prepare("SELECT lista, codigo, rotulo FROM opcoes ORDER BY lista, ordem")
    .all();
 
  const opcoes = {};
  for (const { lista, codigo, rotulo } of linhas) {
    if (!opcoes[lista]) opcoes[lista] = [];
    opcoes[lista].push({ codigo, rotulo });
  }
  return opcoes;
}
