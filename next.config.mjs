/** @type {import('next').NextConfig} */
const nextConfig = {
  // O better-sqlite3 é um módulo nativo (C++): ele roda só no servidor
  // e não deve ser empacotado pelo Next.js.
  serverExternalPackages: ["better-sqlite3"],
};
 
export default nextConfig;
