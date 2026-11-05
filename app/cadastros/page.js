import Link from "next/link";
import { listarCadastros } from "@/lib/cadastros";
 
export const dynamic = "force-dynamic";
 
export default async function ListaCadastros({ searchParams }) {
  const { busca = "" } = await searchParams;
  const cadastros = listarCadastros(busca);
 
  return (
    <>
      <div className="cabecalho-pagina">
        <div>
          <h1>Cadastros</h1>
          <p className="subtitulo">{cadastros.length} cadastro(s) encontrado(s)</p>
        </div>
        <Link href="/cadastros/novo" className="botao">
          + Novo cadastro
        </Link>
      </div>
 
      {/* Formulário GET: ao enviar, a URL vira /cadastros?busca=texto */}
      <form className="busca">
        <input
          type="search"
          name="busca"
          defaultValue={busca}
          placeholder="Buscar por nome, código, comunidade ou município"
        />
        <button className="botao">Buscar</button>
      </form>
 
      <div className="cartao tabela-rolagem">
        {cadastros.length === 0 ? (
          <p className="vazio">Nenhum cadastro encontrado.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Respondente / titular</th>
                <th>Comunidade</th>
                <th>Município / UF</th>
                <th>Pessoas</th>
                <th>Levantamento</th>
              </tr>
            </thead>
            <tbody>
              {cadastros.map((c) => (
                <tr key={c.id}>
                  <td>{c.codigo_cadastro ?? "—"}</td>
                  <td>
                    <Link href={`/cadastros/${c.id}`}>{c.nome_respondente}</Link>
                  </td>
                  <td>{c.comunidade_localidade ?? "—"}</td>
                  <td>{c.municipio_uf ?? "—"}</td>
                  <td>{c.total_membros}</td>
                  <td>
                    {c.data_levantamento
                      ? new Date(`${c.data_levantamento}T00:00:00`).toLocaleDateString("pt-BR")
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
