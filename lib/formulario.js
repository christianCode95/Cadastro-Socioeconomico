// Definição do formulário em JavaScript — é o "espelho" da aba survey do XLSForm.
// Ela é usada para montar AUTOMATICAMENTE as telas de detalhe e de edição.
//
// Tipos de campo (iguais aos do XLSForm):
//   text | textarea | date | integer | decimal | select_one | select_multiple
// "lista" indica qual lista da aba choices (tabela opcoes) o campo usa.
 
export const secoes = [
  {
    id: "identificacao",
    titulo: "Identificação do cadastro",
    campos: [
      { nome: "nome_respondente", rotulo: "Nome do respondente / titular", tipo: "text", obrigatorio: true },
      { nome: "codigo_cadastro", rotulo: "Código de cadastro", tipo: "text" },
      { nome: "comunidade_localidade", rotulo: "Comunidade / Assentamento / Localidade", tipo: "text" },
      { nome: "municipio_uf", rotulo: "Município / UF", tipo: "text" },
      { nome: "data_levantamento", rotulo: "Data do levantamento", tipo: "date" },
      { nome: "responsavel_levantamento", rotulo: "Responsável pelo levantamento", tipo: "text" },
    ],
  },
 
  // ---------------- A — IDENTIFICAÇÃO DA FAMÍLIA E DA MORADIA ----------------
  {
    id: "A1",
    bloco: "A — Identificação da família e da moradia",
    titulo: "A.1 Composição do Núcleo Familiar",
    repeticao: {
      tabela: "composicao_nucleo",
      rotulo: "Membro da família",
      campos: [
        { nome: "nome", rotulo: "Nome", tipo: "text" },
        { nome: "parentesco", rotulo: "Parentesco", tipo: "select_one", lista: "parentesco" },
        { nome: "sexo", rotulo: "Sexo", tipo: "select_one", lista: "sexo" },
        { nome: "idade", rotulo: "Idade", tipo: "integer" },
        { nome: "escolaridade", rotulo: "Escolaridade", tipo: "select_one", lista: "escolaridade" },
        { nome: "ocupacao", rotulo: "Ocupação", tipo: "select_one", lista: "ocupacao" },
        { nome: "dedicacao_agricultura", rotulo: "Dedicação à agricultura", tipo: "select_one", lista: "dedicacao_agricultura" },
      ],
    },
  },
  {
    id: "A2",
    titulo: "A.2 Organização e Associativismo",
    campos: [
      { nome: "organizacoes", rotulo: "Participa de", tipo: "select_multiple", lista: "associativismo" },
      // relevant: selected(${organizacoes}, 'outra')
      { nome: "outra_organizacao", rotulo: "Outra organização", tipo: "text", relevante: { campo: "organizacoes", valor: "outra" } },
    ],
  },
  {
    id: "A3",
    titulo: "A.3 Infraestrutura da Moradia",
    campos: [
      { nome: "energia_eletrica", rotulo: "Energia elétrica", tipo: "select_one", lista: "energia" },
      { nome: "abastecimento_agua", rotulo: "Abastecimento de água", tipo: "select_one", lista: "agua" },
      { nome: "comunicacao", rotulo: "Comunicação e acesso à informação", tipo: "select_multiple", lista: "comunicacao" },
    ],
  },
  {
    id: "A4",
    titulo: "A.4 Perfil da Atividade Produtiva",
    campos: [
      { nome: "perfil_atividade", rotulo: "Produção", tipo: "select_one", lista: "perfil_producao" },
      { nome: "tamanho_propriedade", rotulo: "Tamanho total da propriedade (ha)", tipo: "decimal" },
    ],
  },
 
  // ---------------- B — UNIDADE DE PRODUÇÃO ----------------
  {
    id: "B1",
    bloco: "B — Unidade de produção",
    titulo: "B.1 Residência e Regime de Posse da Terra",
    campos: [
      { nome: "local_residencia", rotulo: "Local de residência", tipo: "select_one", lista: "residencia" },
      { nome: "regime_posse", rotulo: "Regime de posse", tipo: "select_one", lista: "regime_posse" },
      { nome: "proprietarios_parceiros", rotulo: "Proprietário(s)/parceiro(s), quando aplicável", tipo: "text" },
    ],
  },
  {
    id: "B2",
    titulo: "B.2 Financiamento e Crédito",
    campos: [{ nome: "financiamento", rotulo: "Utiliza", tipo: "select_multiple", lista: "financiamento" }],
  },
  {
    id: "B3",
    titulo: "B.3 Assistência Técnica",
    campos: [
      { nome: "instituicoes_assistencia", rotulo: "Instituição(ões) responsável(is)", tipo: "text" },
      { nome: "area_assistencia", rotulo: "Área", tipo: "select_multiple", lista: "area_assistencia" },
      { nome: "frequencia_assistencia", rotulo: "Frequência", tipo: "select_one", lista: "frequencia_assistencia" },
    ],
  },
  {
    id: "B4",
    titulo: "B.4 Estrutura Fundiária",
    repeticao: {
      tabela: "estrutura_fundiaria",
      rotulo: "Área / parcela",
      campos: [
        { nome: "area_ha", rotulo: "Área (ha)", tipo: "decimal" },
        { nome: "regime", rotulo: "Regime", tipo: "select_one", lista: "regime_area" },
        { nome: "distancia_sede_km", rotulo: "Distância da sede (km)", tipo: "decimal" },
        { nome: "area_preservacao_mata", rotulo: "Preservação/mata (ha)", tipo: "decimal" },
        { nome: "area_produtiva", rotulo: "Área produtiva (ha)", tipo: "decimal" },
        { nome: "registro", rotulo: "Registro INCRA/órgão fundiário", tipo: "select_one", lista: "registro_fundiario" },
      ],
    },
  },
  {
    id: "B5",
    titulo: "B.5 Benfeitorias e Infraestrutura Produtiva",
    repeticao: {
      tabela: "benfeitorias",
      rotulo: "Benfeitoria",
      campos: [
        { nome: "benfeitoria", rotulo: "Benfeitoria", tipo: "text" },
        { nome: "padrao_construtivo", rotulo: "Padrão construtivo", tipo: "select_one", lista: "padrao_construtivo" },
        { nome: "area_m2", rotulo: "Área (m²)", tipo: "decimal" },
        { nome: "ano", rotulo: "Ano", tipo: "integer" },
      ],
    },
  },
  {
    id: "B6",
    titulo: "B.6 Máquinas e Equipamentos",
    repeticao: {
      tabela: "maquinas",
      rotulo: "Máquina/equipamento",
      campos: [
        { nome: "tipo_maquina", rotulo: "Tipo", tipo: "text" },
        { nome: "modelo", rotulo: "Modelo", tipo: "text" },
        { nome: "ano_maquina", rotulo: "Ano", tipo: "integer" },
        { nome: "forma_posse", rotulo: "Forma de posse", tipo: "select_one", lista: "forma_posse_maquina" },
      ],
    },
  },
  {
    id: "B7",
    titulo: "B.7 Prestação de Serviços a Terceiros",
    repeticao: {
      tabela: "servicos",
      rotulo: "Serviço prestado",
      campos: [
        { nome: "servico_prestado", rotulo: "Serviço prestado", tipo: "text" },
        { nome: "atividade_cultura", rotulo: "Atividade/cultura", tipo: "text" },
        { nome: "quantidade_periodo", rotulo: "Quantidade/período", tipo: "text" },
        { nome: "valor_forma_cobranca", rotulo: "Valor ou forma de cobrança", tipo: "text" },
      ],
    },
  },
  {
    id: "B8",
    titulo: "B.8 Mão de Obra",
    repeticao: {
      tabela: "mao_obra",
      rotulo: "Mão de obra",
      campos: [
        { nome: "origem", rotulo: "Origem", tipo: "select_one", lista: "origem_mao_obra" },
        { nome: "quantidade_pessoas", rotulo: "Qtd. de pessoas", tipo: "integer" },
        { nome: "funcao_propriedade", rotulo: "Função na propriedade", tipo: "text" },
        { nome: "periodo_dedicacao", rotulo: "Período de dedicação", tipo: "text" },
      ],
    },
  },
  {
    id: "B9",
    titulo: "B.9 Animais de Trabalho",
    repeticao: {
      tabela: "animais_trabalho",
      rotulo: "Animal de trabalho",
      campos: [
        { nome: "especie", rotulo: "Espécie", tipo: "text" },
        { nome: "quantidade", rotulo: "Quantidade", tipo: "integer" },
        { nome: "finalidade", rotulo: "Finalidade", tipo: "text" },
      ],
    },
  },
 
  // ---------------- C — PRODUÇÃO VEGETAL, ANIMAL E AGROINDÚSTRIA ----------------
  {
    id: "C1",
    bloco: "C — Produção vegetal, animal e agroindústria",
    titulo: "C.1 Produção Vegetal",
    repeticao: {
      tabela: "producao_vegetal",
      rotulo: "Cultura / linha de produção",
      campos: [
        { nome: "cultura", rotulo: "Cultura", tipo: "text" },
        { nome: "area_plantada", rotulo: "Área plantada (ha)", tipo: "decimal" },
        { nome: "producao_total", rotulo: "Produção total", tipo: "decimal" },
        { nome: "unidade", rotulo: "Unidade", tipo: "text" },
        { nome: "percentual_comercializado", rotulo: "% comercializado", tipo: "decimal" },
        { nome: "forma_comercializacao", rotulo: "Forma de comercialização", tipo: "select_one", lista: "comercializacao" },
      ],
    },
  },
  {
    id: "C2",
    titulo: "C.2 Produção Animal",
    repeticao: {
      tabela: "producao_animal",
      rotulo: "Linha de produção",
      campos: [
        { nome: "linha_producao", rotulo: "Linha de produção", tipo: "text" },
        { nome: "rebanho_plantel", rotulo: "Rebanho/plantel (cab.)", tipo: "integer" },
        { nome: "sistema_criacao", rotulo: "Sistema de criação", tipo: "select_one", lista: "sistema_criacao" },
        { nome: "producao_anual", rotulo: "Produção anual", tipo: "decimal" },
        { nome: "unidade_animal", rotulo: "Unidade", tipo: "text" },
        { nome: "percentual_comercializado_animal", rotulo: "% comercializado", tipo: "decimal" },
      ],
    },
  },
  {
    id: "C3",
    titulo: "C.3 Agroindústria e Processamento Caseiro",
    repeticao: {
      tabela: "agroindustria",
      rotulo: "Produto processado",
      campos: [
        { nome: "produto_processado", rotulo: "Produto processado", tipo: "text" },
        { nome: "quantidade_anual_comercializada", rotulo: "Qtd. anual comercializada", tipo: "decimal" },
        { nome: "forma_comercializacao_agro", rotulo: "Forma de comercialização", tipo: "select_one", lista: "comercializacao" },
        { nome: "preco_medio", rotulo: "Preço médio (R$)", tipo: "decimal" },
      ],
    },
  },
  {
    id: "C4",
    titulo: "C.4 Observações Gerais",
    campos: [{ nome: "observacoes_gerais", rotulo: "Observações gerais", tipo: "textarea" }],
  },
];
 
// ---------- Listas auxiliares, calculadas a partir de "secoes" ----------
 
// Todos os campos que não estão em grupos de repetição
const camposSimples = secoes.flatMap((s) => s.campos ?? []);
 
// Campos que viram COLUNAS da tabela cadastros
export const camposPrincipais = camposSimples.filter((c) => c.tipo !== "select_multiple");
 
// Campos de múltipla escolha (gravados na tabela selecoes_multiplas)
export const camposMultiplos = camposSimples.filter((c) => c.tipo === "select_multiple");
 
// Grupos de repetição (cada um é uma tabela filha)
export const repeticoes = secoes.filter((s) => s.repeticao).map((s) => s.repeticao);
