// Insere cadastros FICTÍCIOS para testar o sistema.
// Uso: npm run db:seed   (rode antes: npm run db:opcoes)
import db from "../lib/db.js";
import { salvarCadastro } from "../lib/cadastros.js";
 
const exemplos = [
  {
    nome_respondente: "Maria Aparecida da Silva",
    codigo_cadastro: "NH-001",
    comunidade_localidade: "Assentamento Novo Horizonte",
    municipio_uf: "Santa Maria / RS",
    data_levantamento: "2026-08-20",
    responsavel_levantamento: "Equipe TED INCRA/UFSM",
    organizacoes: ["associacao_produtores", "cooperativa_producao"],
    energia_eletrica: "rede_publica",
    abastecimento_agua: "poco",
    comunicacao: ["celular", "internet"],
    perfil_atividade: "ambas",
    tamanho_propriedade: 18.5,
    local_residencia: "imovel_rural",
    regime_posse: "concessao_uso",
    financiamento: ["credito_rural"],
    instituicoes_assistencia: "Emater/RS-Ascar",
    area_assistencia: ["agronomica", "social_organizativa"],
    frequencia_assistencia: "semestral",
    composicao_nucleo: [
      { nome: "Maria Aparecida da Silva", parentesco: "titular", sexo: "feminino", idade: 47, escolaridade: "fundamental_completo", ocupacao: "agricultor", dedicacao_agricultura: "integral" },
      { nome: "João Carlos da Silva", parentesco: "conjuge", sexo: "masculino", idade: 50, escolaridade: "fundamental_incompleto", ocupacao: "agricultor", dedicacao_agricultura: "integral" },
      { nome: "Ana Paula da Silva", parentesco: "filho", sexo: "feminino", idade: 16, escolaridade: "medio_incompleto", ocupacao: "estudante", dedicacao_agricultura: "eventual" },
    ],
    estrutura_fundiaria: [
      { area_ha: 18.5, regime: "propria", distancia_sede_km: 0, area_preservacao_mata: 3.7, area_produtiva: 14.8, registro: "individual" },
    ],
    benfeitorias: [
      { benfeitoria: "Galpão", padrao_construtivo: "madeira", area_m2: 80, ano: 2014 },
      { benfeitoria: "Estufa", padrao_construtivo: "metalico", area_m2: 300, ano: 2022 },
    ],
    maquinas: [{ tipo_maquina: "Trator", modelo: "Agrale 4100", ano_maquina: 2012, forma_posse: "propria" }],
    mao_obra: [{ origem: "familiar", quantidade_pessoas: 2, funcao_propriedade: "Manejo geral", periodo_dedicacao: "Ano todo" }],
    producao_vegetal: [
      { cultura: "Milho", area_plantada: 6, producao_total: 300, unidade: "sacas", percentual_comercializado: 40, forma_comercializacao: "cooperativa" },
      { cultura: "Hortaliças", area_plantada: 0.5, producao_total: 2000, unidade: "kg", percentual_comercializado: 80, forma_comercializacao: "feira_venda_direta" },
    ],
    producao_animal: [
      { linha_producao: "Leite", rebanho_plantel: 12, sistema_criacao: "semi_intensivo", producao_anual: 36000, unidade_animal: "litros", percentual_comercializado_animal: 90 },
    ],
    agroindustria: [
      { produto_processado: "Queijo colonial", quantidade_anual_comercializada: 600, forma_comercializacao_agro: "feira_venda_direta", preco_medio: 45 },
    ],
    observacoes_gerais: "Família interessada em ampliar a produção de hortaliças orgânicas.",
  },
  {
    nome_respondente: "Antônio Pereira dos Santos",
    codigo_cadastro: "NH-002",
    comunidade_localidade: "Assentamento Novo Horizonte",
    municipio_uf: "Santa Maria / RS",
    data_levantamento: "2026-08-21",
    responsavel_levantamento: "Equipe TED INCRA/UFSM",
    organizacoes: ["sindicato_rural", "outra"],
    outra_organizacao: "Grupo de jovens da comunidade",
    energia_eletrica: "fotovoltaica",
    abastecimento_agua: "nascente_vertente",
    comunicacao: ["celular", "radio"],
    perfil_atividade: "autoconsumo",
    tamanho_propriedade: 12,
    local_residencia: "imovel_rural",
    regime_posse: "concessao_uso",
    financiamento: ["recursos_proprios"],
    instituicoes_assistencia: "",
    area_assistencia: [],
    frequencia_assistencia: "esporadica",
    composicao_nucleo: [
      { nome: "Antônio Pereira dos Santos", parentesco: "titular", sexo: "masculino", idade: 62, escolaridade: "nao_alfabetizado", ocupacao: "aposentado", dedicacao_agricultura: "parcial" },
      { nome: "Rosa Maria dos Santos", parentesco: "conjuge", sexo: "feminino", idade: 58, escolaridade: "fundamental_incompleto", ocupacao: "agricultor", dedicacao_agricultura: "integral" },
    ],
    estrutura_fundiaria: [
      { area_ha: 12, regime: "propria", distancia_sede_km: 0, area_preservacao_mata: 2.4, area_produtiva: 9.6, registro: "individual" },
    ],
    animais_trabalho: [{ especie: "Bois", quantidade: 2, finalidade: "Tração (arado)" }],
    producao_vegetal: [
      { cultura: "Feijão", area_plantada: 1, producao_total: 15, unidade: "sacas", percentual_comercializado: 0, forma_comercializacao: "propriedade" },
      { cultura: "Mandioca", area_plantada: 0.5, producao_total: 1500, unidade: "kg", percentual_comercializado: 20, forma_comercializacao: "propriedade" },
    ],
    producao_animal: [
      { linha_producao: "Aves (galinhas)", rebanho_plantel: 40, sistema_criacao: "extensivo", producao_anual: 300, unidade_animal: "dúzias de ovos", percentual_comercializado_animal: 30 },
    ],
  },
  {
    nome_respondente: "Lúcia Fernandes Rocha",
    codigo_cadastro: "SJ-014",
    comunidade_localidade: "Assentamento São José",
    municipio_uf: "Júlio de Castilhos / RS",
    data_levantamento: "2026-09-02",
    responsavel_levantamento: "Equipe TED INCRA/UFSM",
    organizacoes: ["cooperativa_credito", "cooperativa_producao"],
    energia_eletrica: "rede_publica",
    abastecimento_agua: "rede_publica",
    comunicacao: ["celular", "internet", "telefone_fixo"],
    perfil_atividade: "comercial",
    tamanho_propriedade: 25,
    local_residencia: "imovel_rural",
    regime_posse: "concessao_uso",
    financiamento: ["credito_rural", "troca_troca"],
    instituicoes_assistencia: "Cooperativa regional",
    area_assistencia: ["agronomica"],
    frequencia_assistencia: "mensal",
    composicao_nucleo: [
      { nome: "Lúcia Fernandes Rocha", parentesco: "titular", sexo: "feminino", idade: 39, escolaridade: "medio_completo", ocupacao: "agricultor", dedicacao_agricultura: "integral" },
      { nome: "Paulo Rocha", parentesco: "conjuge", sexo: "masculino", idade: 41, escolaridade: "medio_completo", ocupacao: "agricultor", dedicacao_agricultura: "integral" },
      { nome: "Pedro Rocha", parentesco: "filho", sexo: "masculino", idade: 12, escolaridade: "fundamental_incompleto", ocupacao: "estudante", dedicacao_agricultura: "nenhuma" },
      { nome: "Helena Fernandes", parentesco: "pai_mae", sexo: "feminino", idade: 70, escolaridade: "fundamental_incompleto", ocupacao: "aposentado", dedicacao_agricultura: "nenhuma" },
    ],
    estrutura_fundiaria: [
      { area_ha: 20, regime: "propria", distancia_sede_km: 0, area_preservacao_mata: 4, area_produtiva: 16, registro: "individual" },
      { area_ha: 5, regime: "arrendada", distancia_sede_km: 3.5, area_preservacao_mata: 0, area_produtiva: 5, registro: "nao_possui" },
    ],
    maquinas: [
      { tipo_maquina: "Trator", modelo: "Massey Ferguson 265", ano_maquina: 2008, forma_posse: "propria" },
      { tipo_maquina: "Colhedora", modelo: "—", ano_maquina: null, forma_posse: "servico_terceiros" },
    ],
    servicos: [
      { servico_prestado: "Preparo de solo", atividade_cultura: "Soja", quantidade_periodo: "30 h/ano", valor_forma_cobranca: "R$ 180/hora" },
    ],
    mao_obra: [
      { origem: "familiar", quantidade_pessoas: 2, funcao_propriedade: "Lavoura", periodo_dedicacao: "Ano todo" },
      { origem: "contratada", quantidade_pessoas: 1, funcao_propriedade: "Colheita", periodo_dedicacao: "Safra (2 meses)" },
    ],
    producao_vegetal: [
      { cultura: "Soja", area_plantada: 18, producao_total: 950, unidade: "sacas", percentual_comercializado: 100, forma_comercializacao: "cooperativa" },
      { cultura: "Milho", area_plantada: 3, producao_total: 220, unidade: "sacas", percentual_comercializado: 50, forma_comercializacao: "atravessador_intermediario" },
    ],
  },
];
 
// Limpa os cadastros antigos (as tabelas filhas são apagadas em cascata)
db.prepare("DELETE FROM cadastros").run();
 
for (const exemplo of exemplos) {
  const id = salvarCadastro(exemplo);
  console.log(`Cadastro ${id} criado: ${exemplo.nome_respondente}`);
}
