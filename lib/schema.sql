-- =====================================================================
-- Modelo de dados do CADASTRO SÓCIO-ECONÔMICO (XLSForm ODK)
-- form_id: cadastro_socioeconomico_rural  |  versão: 20260812_1
-- Regra geral: os nomes de tabelas e colunas são os mesmos "name"
-- usados no XLSForm, para facilitar a rastreabilidade.
-- =====================================================================
 
-- Aba "choices" do XLSForm: todas as listas de opções
CREATE TABLE IF NOT EXISTS opcoes (
  lista   TEXT    NOT NULL,          -- list_name (ex.: parentesco)
  codigo  TEXT    NOT NULL,          -- name      (ex.: conjuge)
  rotulo  TEXT    NOT NULL,          -- label     (ex.: Cônjuge)
  ordem   INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (lista, codigo)
);
 
-- Uma linha por família cadastrada (campos que NÃO estão em repeat)
CREATE TABLE IF NOT EXISTS cadastros (
  id                        INTEGER PRIMARY KEY AUTOINCREMENT,
  -- Cabeçalho
  nome_respondente          TEXT NOT NULL,
  codigo_cadastro           TEXT UNIQUE,
  comunidade_localidade     TEXT,
  municipio_uf              TEXT,
  data_levantamento         TEXT,      -- AAAA-MM-DD
  responsavel_levantamento  TEXT,
  -- A.2 Organização e associativismo (as opções marcadas ficam em selecoes_multiplas)
  outra_organizacao         TEXT,
  -- A.3 Infraestrutura da moradia
  energia_eletrica          TEXT,      -- lista: energia
  abastecimento_agua        TEXT,      -- lista: agua
  -- A.4 Perfil da atividade produtiva
  perfil_atividade          TEXT,      -- lista: perfil_producao
  tamanho_propriedade       REAL,      -- ha
  -- B.1 Residência e regime de posse
  local_residencia          TEXT,      -- lista: residencia
  regime_posse              TEXT,      -- lista: regime_posse
  proprietarios_parceiros   TEXT,
  -- B.3 Assistência técnica
  instituicoes_assistencia  TEXT,
  frequencia_assistencia    TEXT,      -- lista: frequencia_assistencia
  -- C.4 Observações gerais
  observacoes_gerais        TEXT,
  -- Controle
  criado_em                 TEXT DEFAULT (datetime('now', 'localtime')),
  atualizado_em             TEXT
);
 
-- Perguntas select_multiple: uma linha para cada opção marcada
-- campo = organizacoes | comunicacao | financiamento | area_assistencia
CREATE TABLE IF NOT EXISTS selecoes_multiplas (
  cadastro_id  INTEGER NOT NULL REFERENCES cadastros(id) ON DELETE CASCADE,
  campo        TEXT    NOT NULL,
  codigo       TEXT    NOT NULL,
  PRIMARY KEY (cadastro_id, campo, codigo)
);
 
-- ---------------------------------------------------------------------
-- Grupos de repetição (begin_repeat): uma tabela "filha" para cada um
-- ---------------------------------------------------------------------
 
-- A.1 Composição do núcleo familiar
CREATE TABLE IF NOT EXISTS composicao_nucleo (
  id                     INTEGER PRIMARY KEY AUTOINCREMENT,
  cadastro_id            INTEGER NOT NULL REFERENCES cadastros(id) ON DELETE CASCADE,
  nome                   TEXT,
  parentesco             TEXT,     -- lista: parentesco
  sexo                   TEXT,     -- lista: sexo
  idade                  INTEGER,
  escolaridade           TEXT,     -- lista: escolaridade
  ocupacao               TEXT,     -- lista: ocupacao
  dedicacao_agricultura  TEXT      -- lista: dedicacao_agricultura
);
 
-- B.4 Estrutura fundiária
CREATE TABLE IF NOT EXISTS estrutura_fundiaria (
  id                     INTEGER PRIMARY KEY AUTOINCREMENT,
  cadastro_id            INTEGER NOT NULL REFERENCES cadastros(id) ON DELETE CASCADE,
  area_ha                REAL,
  regime                 TEXT,     -- lista: regime_area
  distancia_sede_km      REAL,
  area_preservacao_mata  REAL,
  area_produtiva         REAL,
  registro               TEXT      -- lista: registro_fundiario
);
 
-- B.5 Benfeitorias
CREATE TABLE IF NOT EXISTS benfeitorias (
  id                  INTEGER PRIMARY KEY AUTOINCREMENT,
  cadastro_id         INTEGER NOT NULL REFERENCES cadastros(id) ON DELETE CASCADE,
  benfeitoria         TEXT,
  padrao_construtivo  TEXT,        -- lista: padrao_construtivo
  area_m2             REAL,
  ano                 INTEGER
);
 
-- B.6 Máquinas e equipamentos
CREATE TABLE IF NOT EXISTS maquinas (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  cadastro_id   INTEGER NOT NULL REFERENCES cadastros(id) ON DELETE CASCADE,
  tipo_maquina  TEXT,
  modelo        TEXT,
  ano_maquina   INTEGER,
  forma_posse   TEXT               -- lista: forma_posse_maquina
);
 
-- B.7 Prestação de serviços a terceiros
CREATE TABLE IF NOT EXISTS servicos (
  id                    INTEGER PRIMARY KEY AUTOINCREMENT,
  cadastro_id           INTEGER NOT NULL REFERENCES cadastros(id) ON DELETE CASCADE,
  servico_prestado      TEXT,
  atividade_cultura     TEXT,
  quantidade_periodo    TEXT,
  valor_forma_cobranca  TEXT
);
 
-- B.8 Mão de obra
CREATE TABLE IF NOT EXISTS mao_obra (
  id                  INTEGER PRIMARY KEY AUTOINCREMENT,
  cadastro_id         INTEGER NOT NULL REFERENCES cadastros(id) ON DELETE CASCADE,
  origem              TEXT,        -- lista: origem_mao_obra
  quantidade_pessoas  INTEGER,
  funcao_propriedade  TEXT,
  periodo_dedicacao   TEXT
);
 
-- B.9 Animais de trabalho
CREATE TABLE IF NOT EXISTS animais_trabalho (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  cadastro_id  INTEGER NOT NULL REFERENCES cadastros(id) ON DELETE CASCADE,
  especie      TEXT,
  quantidade   INTEGER,
  finalidade   TEXT
);
 
-- C.1 Produção vegetal
CREATE TABLE IF NOT EXISTS producao_vegetal (
  id                         INTEGER PRIMARY KEY AUTOINCREMENT,
  cadastro_id                INTEGER NOT NULL REFERENCES cadastros(id) ON DELETE CASCADE,
  cultura                    TEXT,
  area_plantada              REAL,
  producao_total             REAL,
  unidade                    TEXT,
  percentual_comercializado  REAL,
  forma_comercializacao      TEXT  -- lista: comercializacao
);
 
-- C.2 Produção animal
CREATE TABLE IF NOT EXISTS producao_animal (
  id                                INTEGER PRIMARY KEY AUTOINCREMENT,
  cadastro_id                       INTEGER NOT NULL REFERENCES cadastros(id) ON DELETE CASCADE,
  linha_producao                    TEXT,
  rebanho_plantel                   INTEGER,
  sistema_criacao                   TEXT,   -- lista: sistema_criacao
  producao_anual                    REAL,
  unidade_animal                    TEXT,
  percentual_comercializado_animal  REAL
);
 
-- C.3 Agroindústria e processamento caseiro
CREATE TABLE IF NOT EXISTS agroindustria (
  id                               INTEGER PRIMARY KEY AUTOINCREMENT,
  cadastro_id                      INTEGER NOT NULL REFERENCES cadastros(id) ON DELETE CASCADE,
  produto_processado               TEXT,
  quantidade_anual_comercializada  REAL,
  forma_comercializacao_agro       TEXT,    -- lista: comercializacao
  preco_medio                      REAL
);
