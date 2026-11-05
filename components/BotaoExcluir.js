"use client";
 
// Componente de cliente: precisa rodar no navegador para mostrar o confirm()
export default function BotaoExcluir({ acao }) {
  function confirmar(evento) {
    if (!confirm("Excluir este cadastro? Esta ação não pode ser desfeita.")) {
      evento.preventDefault();
    }
  }
 
  return (
    <form action={acao} onSubmit={confirmar}>
      <button className="botao perigo">Excluir</button>
    </form>
  );
}
