"use client";
 
import { useState } from "react";
import Campo from "./Campo";
 
// Equivale ao begin_repeat do XLSForm: o usuário adiciona/remove quantas linhas quiser
export default function GrupoRepeticao({ repeticao, linhasIniciais = [], opcoes }) {
  // Cada linha recebe uma "chave" única, usada no nome dos inputs
  const [linhas, setLinhas] = useState(() =>
    linhasIniciais.map((dados, i) => ({ chave: i, dados }))
  );
  const [proximaChave, setProximaChave] = useState(linhasIniciais.length);
 
  function adicionar() {
    setLinhas([...linhas, { chave: proximaChave, dados: {} }]);
    setProximaChave(proximaChave + 1);
  }
 
  function remover(chave) {
    setLinhas(linhas.filter((linha) => linha.chave !== chave));
  }
 
  return (
    <div>
      {linhas.length === 0 && <p className="vazio">Nenhum registro adicionado.</p>}
 
      {linhas.map((linha, posicao) => (
        <fieldset key={linha.chave} className="linha-repeticao">
          <legend>
            {repeticao.rotulo} {posicao + 1}
          </legend>
          <div className="grade">
            {repeticao.campos.map((campo) => (
              <label key={campo.nome}>
                {campo.rotulo}
                <Campo
                  campo={campo}
                  nome={`${repeticao.tabela}.${linha.chave}.${campo.nome}`}
                  valor={linha.dados[campo.nome]}
                  opcoes={opcoes}
                />
              </label>
            ))}
          </div>
          <button type="button" className="botao perigo pequeno" onClick={() => remover(linha.chave)}>
            Remover
          </button>
        </fieldset>
      ))}
 
      <button type="button" className="botao secundario" onClick={adicionar}>
        + Adicionar {repeticao.rotulo.toLowerCase()}
      </button>
    </div>
  );
}
