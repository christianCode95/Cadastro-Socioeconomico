// Lê a aba "choices" do XLSForm e grava as opções na tabela "opcoes".
// Uso: npm run db:opcoes
import { readSheet } from "read-excel-file/node";
import db from "../lib/db.js";
 
const ARQUIVO = "formulario/Cadastro_Socioeconomico.xlsx";
 
const linhas = await readSheet(ARQUIVO, "choices");
const [cabecalho, ...dados] = linhas;
 
// Descobre em que coluna está cada informação (list_name, name, label)
const iLista = cabecalho.indexOf("list_name");
const iCodigo = cabecalho.indexOf("name");
const iRotulo = cabecalho.indexOf("label");
 
const inserir = db.prepare(`
  INSERT INTO opcoes (lista, codigo, rotulo, ordem)
  VALUES (?, ?, ?, ?)
  ON CONFLICT (lista, codigo) DO UPDATE SET rotulo = excluded.rotulo, ordem = excluded.ordem
`);
 
// Uma transação: ou grava tudo, ou não grava nada
const importar = db.transaction((linhas) => {
  let ordem = 0;
  for (const linha of linhas) {
    const lista = linha[iLista];
    if (!lista) continue; // ignora linhas vazias
    inserir.run(String(lista), String(linha[iCodigo]), String(linha[iRotulo]), ordem++);
  }
  return ordem;
});
 
const total = importar(dados);
console.log(`${total} opções importadas de ${ARQUIVO}`);
