"use server";
 
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { salvarCadastro, excluirCadastro } from "@/lib/cadastros";
import { lerFormulario } from "@/lib/ler-formulario";
 
// Server Action: roda NO SERVIDOR, chamada pelo formulário da tela
export async function salvarCadastroAction(id, formData) {
  const dados = lerFormulario(formData);
 
  if (!dados.nome_respondente) {
    return { erro: "Informe o nome do respondente / titular." };
  }
 
  let idSalvo;
  try {
    idSalvo = salvarCadastro(dados, id);
  } catch (erro) {
    if (erro.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return { erro: `Já existe um cadastro com o código "${dados.codigo_cadastro}".` };
    }
    throw erro;
  }
 
  revalidatePath("/", "layout"); // atualiza painel, lista e detalhe
  redirect(`/cadastros/${idSalvo}`);
}
 
export async function excluirCadastroAction(id) {
  excluirCadastro(id);
  revalidatePath("/", "layout");
  redirect("/cadastros");
}
