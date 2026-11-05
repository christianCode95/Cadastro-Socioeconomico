// Desenha o input certo para cada tipo de campo do XLSForm
export default function Campo({ campo, nome, valor, opcoes, aoMudar }) {
  const lista = opcoes[campo.lista] ?? [];
 
  switch (campo.tipo) {
    case "select_one":
      return (
        <select name={nome} defaultValue={valor ?? ""}>
          <option value="">— selecione —</option>
          {lista.map((o) => (
            <option key={o.codigo} value={o.codigo}>
              {o.rotulo}
            </option>
          ))}
        </select>
      );
 
    case "select_multiple":
      return (
        <div className="opcoes-multiplas">
          {lista.map((o) => (
            <label key={o.codigo}>
              <input
                type="checkbox"
                name={nome}
                value={o.codigo}
                defaultChecked={valor?.includes(o.codigo)}
                onChange={aoMudar}
              />
              {o.rotulo}
            </label>
          ))}
        </div>
      );
 
    case "integer":
      return <input type="number" step="1" name={nome} defaultValue={valor ?? ""} />;
 
    case "decimal":
      return <input type="number" step="any" name={nome} defaultValue={valor ?? ""} />;
 
    case "date":
      return <input type="date" name={nome} defaultValue={valor ?? ""} />;
 
    case "textarea":
      return <textarea rows={4} name={nome} defaultValue={valor ?? ""} />;
 
    default:
      return (
        <input type="text" name={nome} defaultValue={valor ?? ""} required={campo.obrigatorio} />
      );
  }
}
