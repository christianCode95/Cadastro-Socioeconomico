import Link from "next/link";
import { obterIndicadores } from "@/lib/indicadores";
 
// Sempre busca dados novos no banco (não gera página estática)
export const dynamic = "force-dynamic";
 
export default function Painel() {
  const { totais, porRegimePosse, porOrganizacao, culturas } = obterIndicadores();
  const maiorArea = Math.max(1, ...culturas.map((c) => c.area ?? 0));
 
  return (
    <>
      <h1>Painel</h1>
      <p className="subtitulo">Resumo dos cadastros socioeconômicos registrados.</p>
 
      <div className="indicadores">
        <div className="cartao indicador">
          <div className="numero">{totais.familias}</div>
          <div className="legenda">famílias cadastradas</div>
        </div>
        <div className="cartao indicador">
          <div className="numero">{totais.pessoas}</div>
          <div className="legenda">pessoas nos núcleos familiares</div>
        </div>
        <div className="cartao indicador">
          <div className="numero">{(totais.area_total ?? 0).toLocaleString("pt-BR")} ha</div>
          <div className="legenda">área total das propriedades</div>
        </div>
        <div className="cartao indicador">
          <div className="numero">{(totais.idade_media ?? 0).toLocaleString("pt-BR")}</div>
          <div className="legenda">idade média (anos)</div>
        </div>
      </div>
 
      <div className="duas-colunas">
        <section className="cartao">
          <h2>Regime de posse da terra</h2>
          <table>
            <tbody>
              {porRegimePosse.map((linha) => (
                <tr key={linha.rotulo}>
                  <td>{linha.rotulo}</td>
                  <td>{linha.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
 
        <section className="cartao">
          <h2>Participação em organizações</h2>
          {porOrganizacao.length === 0 ? (
            <p className="vazio">Nenhum registro.</p>
          ) : (
            <table>
              <tbody>
                {porOrganizacao.map((linha) => (
                  <tr key={linha.rotulo}>
                    <td>{linha.rotulo}</td>
                    <td>{linha.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
 
      <section className="cartao">
        <h2>Principais culturas (área plantada)</h2>
        {culturas.length === 0 ? (
          <p className="vazio">Nenhuma produção vegetal registrada.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Cultura</th>
                <th>Famílias</th>
                <th>Área (ha)</th>
                <th style={{ width: "40%" }}></th>
              </tr>
            </thead>
            <tbody>
              {culturas.map((c) => (
                <tr key={c.cultura}>
                  <td>{c.cultura}</td>
                  <td>{c.familias}</td>
                  <td>{(c.area ?? 0).toLocaleString("pt-BR")}</td>
                  <td>
                    <div className="barra" style={{ width: `${((c.area ?? 0) / maiorArea) * 100}%` }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
 
      <p>
        <Link href="/cadastros" className="botao">
          Ver todos os cadastros
        </Link>
      </p>
    </>
  );
}
