export default function Loading() {
  return (
    <div className="flex items-center justify-center flex-col gap-2 py-8 w-full">
      <div className="flex gap-3">
        <span className="block w-3 h-3 bg-orange-400 rounded-full animate-wave [animation-delay:-0.0s]"></span>
        <span className="block w-3 h-3 bg-orange-400 rounded-full animate-wave [animation-delay:-0.2s]"></span>
        <span className="block w-3 h-3 bg-orange-400 rounded-full animate-wave [animation-delay:-0.4s]"></span>
        <span className="block w-3 h-3 bg-orange-400 rounded-full animate-wave [animation-delay:-0.6s]"></span>
      </div>
      <div>
        <h1 className="font-bold text-2xl first-letter:text-orange-400 tracking-wide">
          Carregando...
        </h1>
      </div>
    </div>
  );
}
