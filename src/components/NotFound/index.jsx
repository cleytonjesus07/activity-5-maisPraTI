export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-6xl font-bold text-gray-100 first-letter:text-orange-400">
        404
      </h1>
      <p className="mt-4 text-lg text-gray-300">Ops! Página não encontrada.</p>
      <a
        href="/"
        className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-400 transition-colors"
      >
        Voltar para a Home
      </a>
    </div>
  );
}
