import { obterOpcoes } from "@/lib/opcoes";
import { salvarCadastroAction } from "../actions";
import FormCadastro from "@/components/FormCadastro";
 
export const dynamic = "force-dynamic";
 
export default function NovoCadastro() {
  const opcoes = obterOpcoes();
 
  return (
    <>
      <h1>Novo cadastro</h1>
      <p className="subtitulo">Preencha as informações do Cadastro Socioeconômico.</p>
      {/* bind(null, null): o primeiro argumento (id) é null = cadastro novo */}
      <FormCadastro acao={salvarCadastroAction.bind(null, null)} opcoes={opcoes} />
    </>
  );
}
