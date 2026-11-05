import Link from "next/link";
import "./globals.css";
 
export const metadata = {
  title: "Cadastro Socioeconômico",
  description: "Sistema de consulta do Cadastro Socioeconômico — Projeto TED INCRA/UFSM",
};
 
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="topo">
          <div className="conteudo">
            <Link href="/" className="marca">
              Cadastro Socioeconômico
            </Link>
            <nav>
              <Link href="/">Painel</Link>
              <Link href="/cadastros">Cadastros</Link>
              <Link href="/cadastros/novo">Novo cadastro</Link>
            </nav>
          </div>
        </header>
 
        <main className="conteudo">{children}</main>
 
        <footer className="rodape">
          Projeto TED INCRA/UFSM · Estágio Técnico em Informática — IFRS Campus Restinga
        </footer>
      </body>
    </html>
  );
}
