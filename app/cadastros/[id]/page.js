import Link from "next/link";
import { notFound } from "next/navigation";
import { obterCadastro } from "@/lib/cadastros";
import { obterOpcoes } from "@/lib/opcoes";
import { secoes } from "@/lib/formulario";
import { formatarValor } from "@/lib/formatar";
import { excluirCadastroAction } from "../actions";
import BotaoExcluir from "@/components/BotaoExcluir";
 
export const dynamic = "force-dynamic";
 
export default async function DetalheCadastro({ params }) {
  const { id } = await params;
  const cadastro = obterCadastro(Number(id));
  if (!cadastro) notFound(); // mostra a página 404
 
  const opcoes = obterOpcoes();
 
  return (
    <>
      <div className="cabecalho-pagina">
        <div>
          <h1>{cadastro.nome_respondente}</h1>
          <p className="subtitulo">
            Código {cadastro.codigo_cadastro ?? "—"} · {cadastro.comunidade_localidade ?? "—"}
          </p>
        </div>
        <div className="acoes">
          <Link href={`/cadastros/${cadastro.id}/editar`} className="botao">
            Editar
          </Link>
          <BotaoExcluir acao={excluirCadastroAction.bind(null, cadastro.id)} />
        </div>
      </div>
 
      {secoes.map((secao) => (
        <section key={secao.id} className="cartao">
          {secao.bloco && <p className="bloco">{secao.bloco}</p>}
          <h2>{secao.titulo}</h2>
 
          {/* Seção com campos simples: lista "rótulo: valor" */}
          {secao.campos && (
            <dl className="dados">
              {secao.campos.map((campo) => (
                <div key={campo.nome}>
                  <dt>{campo.rotulo}</dt>
                  <dd>{formatarValor(campo, cadastro[campo.nome], opcoes)}</dd>
                </div>
              ))}
            </dl>
          )}
 
          {/* Seção de repetição: tabela com uma linha por registro */}
          {secao.repeticao && (
            <TabelaRepeticao
              repeticao={secao.repeticao}
              linhas={cadastro[secao.repeticao.tabela]}
              opcoes={opcoes}
            />
          )}
        </section>
      ))}
    </>
  );
}
 
function TabelaRepeticao({ repeticao, linhas, opcoes }) {
  if (linhas.length === 0) return <p className="vazio">Nenhum registro.</p>;
 
  return (
    <div className="tabela-rolagem">
      <table>
        <thead>
          <tr>
            {repeticao.campos.map((campo) => (
              <th key={campo.nome}>{campo.rotulo}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha) => (
            <tr key={linha.id}>
              {repeticao.campos.map((campo) => (
                <td key={campo.nome}>{formatarValor(campo, linha[campo.nome], opcoes)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
