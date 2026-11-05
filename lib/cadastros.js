import db from "./db.js";
import { camposPrincipais, camposMultiplos, repeticoes } from "./formulario.js";
 
// ---------------------------------------------------------------
// LISTAR — usado na página /cadastros (com busca opcional)
// ---------------------------------------------------------------
export function listarCadastros(busca = "") {
  const termo = `%${busca}%`;
  return db
    .prepare(
      `SELECT c.id, c.codigo_cadastro, c.nome_respondente, c.comunidade_localidade,
              c.municipio_uf, c.data_levantamento,
              (SELECT COUNT(*) FROM composicao_nucleo m WHERE m.cadastro_id = c.id) AS total_membros
         FROM cadastros c
        WHERE c.nome_respondente LIKE ?
           OR c.codigo_cadastro LIKE ?
           OR c.comunidade_localidade LIKE ?
           OR c.municipio_uf LIKE ?
        ORDER BY c.nome_respondente`
    )
    .all(termo, termo, termo, termo);
}
 
// ---------------------------------------------------------------
// OBTER — um cadastro completo, com múltiplas escolhas e repetições
// ---------------------------------------------------------------
export function obterCadastro(id) {
  const cadastro = db.prepare("SELECT * FROM cadastros WHERE id = ?").get(id);
  if (!cadastro) return null;
 
  // Múltipla escolha: vira um array em cada campo (ex.: comunicacao: ["celular", "radio"])
  for (const campo of camposMultiplos) {
    cadastro[campo.nome] = db
      .prepare("SELECT codigo FROM selecoes_multiplas WHERE cadastro_id = ? AND campo = ?")
      .all(id, campo.nome)
      .map((linha) => linha.codigo);
  }
 
  // Repetições: vira um array de linhas (ex.: composicao_nucleo: [{ nome, idade, ... }])
  for (const rep of repeticoes) {
    cadastro[rep.tabela] = db
      .prepare(`SELECT * FROM ${rep.tabela} WHERE cadastro_id = ? ORDER BY id`)
      .all(id);
  }
 
  return cadastro;
}
 
// ---------------------------------------------------------------
// SALVAR — cria (id = null) ou atualiza um cadastro
// "dados" tem o mesmo formato devolvido por obterCadastro()
// ---------------------------------------------------------------
export const salvarCadastro = db.transaction((dados, id = null) => {
  const colunas = camposPrincipais.map((c) => c.nome);
  const valores = colunas.map((nome) => dados[nome] ?? null);
 
  if (id) {
    const sets = colunas.map((nome) => `${nome} = ?`).join(", ");
    db.prepare(
      `UPDATE cadastros SET ${sets}, atualizado_em = datetime('now', 'localtime') WHERE id = ?`
    ).run(...valores, id);
  } else {
    const marcadores = colunas.map(() => "?").join(", ");
    const resultado = db
      .prepare(`INSERT INTO cadastros (${colunas.join(", ")}) VALUES (${marcadores})`)
      .run(...valores);
    id = resultado.lastInsertRowid;
  }
 
  // Múltipla escolha: apaga as antigas e grava as marcadas agora
  db.prepare("DELETE FROM selecoes_multiplas WHERE cadastro_id = ?").run(id);
  const inserirSelecao = db.prepare(
    "INSERT INTO selecoes_multiplas (cadastro_id, campo, codigo) VALUES (?, ?, ?)"
  );
  for (const campo of camposMultiplos) {
    for (const codigo of dados[campo.nome] ?? []) {
      inserirSelecao.run(id, campo.nome, codigo);
    }
  }
 
  // Repetições: mesma estratégia (apaga e regrava as linhas)
  for (const rep of repeticoes) {
    db.prepare(`DELETE FROM ${rep.tabela} WHERE cadastro_id = ?`).run(id);
    const nomes = rep.campos.map((c) => c.nome);
    const inserirLinha = db.prepare(
      `INSERT INTO ${rep.tabela} (cadastro_id, ${nomes.join(", ")})
       VALUES (?, ${nomes.map(() => "?").join(", ")})`
    );
    for (const linha of dados[rep.tabela] ?? []) {
      inserirLinha.run(id, ...nomes.map((nome) => linha[nome] ?? null));
    }
  }
 
  return Number(id);
});
 
// ---------------------------------------------------------------
// EXCLUIR — o ON DELETE CASCADE apaga também as tabelas filhas
// ---------------------------------------------------------------
export function excluirCadastro(id) {
  db.prepare("DELETE FROM cadastros WHERE id = ?").run(id);
}
