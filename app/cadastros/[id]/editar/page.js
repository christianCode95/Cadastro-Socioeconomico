import { notFound } from "next/navigation";
import { obterCadastro } from "@/lib/cadastros";
import { obterOpcoes } from "@/lib/opcoes";
import { salvarCadastroAction } from "../../actions";
import FormCadastro from "@/components/FormCadastro";
 
export const dynamic = "force-dynamic";
 
export default async function EditarCadastro({ params }) {
  const { id } = await params;
  const cadastro = obterCadastro(Number(id));
  if (!cadastro) notFound();
 
  const opcoes = obterOpcoes();
 
  return (
    <>
      <h1>Editar cadastro</h1>
      <p className="subtitulo">{cadastro.nome_respondente}</p>
      <FormCadastro
        acao={salvarCadastroAction.bind(null, cadastro.id)}
        opcoes={opcoes}
        cadastro={cadastro}
      />
    </>
  );
}
