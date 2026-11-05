"use client";
 
import { useState, useTransition } from "react";
import { secoes, camposMultiplos } from "@/lib/formulario";
import Campo from "./Campo";
import GrupoRepeticao from "./GrupoRepeticao";
 
export default function FormCadastro({ acao, opcoes, cadastro = {} }) {
  const [erro, setErro] = useState(null);
  const [salvando, iniciarTransicao] = useTransition();
 
  // Guarda o que está marcado nos campos select_multiple (para a regra "relevant")
  const [marcados, setMarcados] = useState(() =>
    Object.fromEntries(camposMultiplos.map((c) => [c.nome, cadastro[c.nome] ?? []]))
  );
 
  function atualizarMarcados(evento) {
    const formulario = evento.target.form;
    const nome = evento.target.name;
    setMarcados({ ...marcados, [nome]: new FormData(formulario).getAll(nome) });
  }
 
  function estaVisivel(campo) {
    if (!campo.relevante) return true;
    return marcados[campo.relevante.campo]?.includes(campo.relevante.valor);
  }
 
  function enviar(evento) {
    evento.preventDefault();
    const formData = new FormData(evento.currentTarget);
    iniciarTransicao(async () => {
      const resposta = await acao(formData); // chama a Server Action
      if (resposta?.erro) {
        setErro(resposta.erro);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }
 
  return (
    <form onSubmit={enviar}>
      {erro && <div className="erro">{erro}</div>}
 
      {secoes.map((secao) => (
        <section key={secao.id} className="cartao">
          {secao.bloco && <p className="bloco">{secao.bloco}</p>}
          <h2>{secao.titulo}</h2>
 
          {secao.campos && (
            <div className="grade">
              {secao.campos.filter(estaVisivel).map((campo) =>
                campo.tipo === "select_multiple" ? (
                  <div key={campo.nome} className="campo-multiplo" style={{ gridColumn: "1 / -1" }}>
                    {campo.rotulo}
                    <Campo
                      campo={campo}
                      nome={campo.nome}
                      valor={cadastro[campo.nome]}
                      opcoes={opcoes}
                      aoMudar={atualizarMarcados}
                    />
                  </div>
                ) : (
                  <label key={campo.nome}>
                    {campo.rotulo}
                    {campo.obrigatorio && " *"}
                    <Campo campo={campo} nome={campo.nome} valor={cadastro[campo.nome]} opcoes={opcoes} />
                  </label>
                )
              )}
            </div>
          )}
 
          {secao.repeticao && (
            <GrupoRepeticao
              repeticao={secao.repeticao}
              linhasIniciais={cadastro[secao.repeticao.tabela]}
              opcoes={opcoes}
            />
          )}
        </section>
      ))}
 
      <div className="barra-salvar acoes">
        <button className="botao" disabled={salvando}>
          {salvando ? "Salvando..." : "Salvar cadastro"}
        </button>
      </div>
    </form>
  );
}
