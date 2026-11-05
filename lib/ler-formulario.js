import { camposPrincipais, camposMultiplos, repeticoes } from "./formulario.js";
 
// Converte o texto vindo do formulário HTML para o tipo certo
function converter(campo, valor) {
  if (valor === null || valor === undefined) return null;
  const texto = String(valor).trim();
  if (texto === "") return null;
  if (campo.tipo === "integer") return parseInt(texto, 10);
  if (campo.tipo === "decimal") return parseFloat(texto.replace(",", "."));
  return texto;
}
 
// Transforma o FormData enviado pela tela no objeto "dados" usado por salvarCadastro()
// Nas repetições, os inputs têm nomes como "composicao_nucleo.3.idade" (tabela.linha.campo)
export function lerFormulario(formData) {
  const dados = {};
 
  for (const campo of camposPrincipais) {
    dados[campo.nome] = converter(campo, formData.get(campo.nome));
  }
 
  for (const campo of camposMultiplos) {
    dados[campo.nome] = formData.getAll(campo.nome); // todos os checkboxes marcados
  }
 
  for (const rep of repeticoes) {
    const linhas = {};
    for (const [chave, valor] of formData.entries()) {
      const [tabela, linha, nome] = chave.split(".");
      if (tabela !== rep.tabela) continue;
      linhas[linha] ??= {};
      linhas[linha][nome] = valor;
    }
    dados[rep.tabela] = Object.values(linhas)
      .map((linha) =>
        Object.fromEntries(rep.campos.map((c) => [c.nome, converter(c, linha[c.nome])]))
      )
      // descarta linhas totalmente vazias
      .filter((linha) => Object.values(linha).some((v) => v !== null));
  }
 
  // Regra "relevant" do XLSForm: se a condição não vale, o campo fica vazio
  for (const campo of camposPrincipais) {
    if (campo.relevante) {
      const marcados = dados[campo.relevante.campo] ?? [];
      if (!marcados.includes(campo.relevante.valor)) dados[campo.nome] = null;
    }
  }
 
  return dados;
}
