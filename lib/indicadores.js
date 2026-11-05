import db from "./db.js";
 
// Números gerais e agrupamentos para o painel (página inicial)
export function obterIndicadores() {
  const totais = db
    .prepare(
      `SELECT
         (SELECT COUNT(*) FROM cadastros)                         AS familias,
         (SELECT COUNT(*) FROM composicao_nucleo)                 AS pessoas,
         (SELECT ROUND(SUM(tamanho_propriedade), 1) FROM cadastros) AS area_total,
         (SELECT ROUND(AVG(idade), 1) FROM composicao_nucleo)     AS idade_media`
    )
    .get();
 
  // Quantas famílias em cada regime de posse (com o rótulo vindo da tabela opcoes)
  const porRegimePosse = db
    .prepare(
      `SELECT COALESCE(o.rotulo, 'Não informado') AS rotulo, COUNT(*) AS total
         FROM cadastros c
         LEFT JOIN opcoes o ON o.lista = 'regime_posse' AND o.codigo = c.regime_posse
        GROUP BY c.regime_posse
        ORDER BY total DESC`
    )
    .all();
 
  // Participação em organizações (select_multiple)
  const porOrganizacao = db
    .prepare(
      `SELECT o.rotulo, COUNT(*) AS total
         FROM selecoes_multiplas s
         JOIN opcoes o ON o.lista = 'associativismo' AND o.codigo = s.codigo
        WHERE s.campo = 'organizacoes'
        GROUP BY s.codigo
        ORDER BY total DESC`
    )
    .all();
 
  // Principais culturas pela área plantada somada
  const culturas = db
    .prepare(
      `SELECT cultura, COUNT(DISTINCT cadastro_id) AS familias,
              ROUND(SUM(area_plantada), 1) AS area
         FROM producao_vegetal
        GROUP BY LOWER(cultura)
        ORDER BY area DESC
        LIMIT 10`
    )
    .all();
 
  return { totais, porRegimePosse, porOrganizacao, culturas };
}
