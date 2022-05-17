export function Form() {
  return (
    <form className="relative">
      <label className="block" htmlFor="bitcoin-venda">Você comprará:</label>
      <input className="border border-solid border-slate-200 py-3 px-6 my-2 mx-0.5 text-lg" type="number" />
      <span className="py-4 px-5 border">BTC</span>

      <label className="block" htmlFor="busd-venda">Você comprará:</label>
      <input className="border border-solid border-slate-200 py-3 px-6 my-2 mx-0.5 text-lg" type="number" />
      <span className="p-4 border">BUSD</span>

      <button className="absolute top-64 left-0 py-4 px-8 rounded-full bg-[#68ed9b] hover:bg-[#5ace7e] duration-100 text-slate-800 font-bold">Comprar</button>
    </form>
  );
}