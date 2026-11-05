// Funções de exibição — NÃO acessam o banco, por isso podem ser usadas em qualquer componente.
 
// Converte um código no rótulo legível (ex.: "conjuge" -> "Cônjuge")
export function rotuloDe(opcoes, lista, codigo) {
  const opcao = opcoes[lista]?.find((o) => o.codigo === codigo);
  return opcao ? opcao.rotulo : codigo;
}
 
// Formata o valor de um campo de acordo com o seu tipo
export function formatarValor(campo, valor, opcoes) {
  const vazio = valor === null || valor === undefined || valor === "";
  if (vazio || (Array.isArray(valor) && valor.length === 0)) return "—";
 
  switch (campo.tipo) {
    case "select_one":
      return rotuloDe(opcoes, campo.lista, valor);
    case "select_multiple":
      return valor.map((codigo) => rotuloDe(opcoes, campo.lista, codigo)).join("; ");
    case "date":
      return new Date(`${valor}T00:00:00`).toLocaleDateString("pt-BR");
    case "decimal":
      return Number(valor).toLocaleString("pt-BR");
    default:
      return String(valor);
  }
}
