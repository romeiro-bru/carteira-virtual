type AccountInitVal = {
  accountInitVal: number;
}

export function Form({ accountInitVal }: AccountInitVal) {

  return (
    <form className="relative">

      <div className="flex">
        <div>
          <label className="block" htmlFor="bitcoin-compra">Você comprará:</label>
          <input className="w-2/4 border border-solid border-slate-200 p-2 my-2 mx-0.5 text-lg" type="number" />
          <span className="p-3 border">BRL</span>
        </div>
        <div>
          <label className="block" htmlFor="bitcoin-recebe">Você receberá:</label>
          <input className="w-2/4 border border-solid border-slate-200 p-2 my-2 mx-0.5 text-lg" type="number" />
          <span className="p-3 border">BTC</span>
        </div>
      </div>


      <div className="flex">
        <div>
          <label className="block" htmlFor="busd-compra">Você comprará:</label>
          <input className="w-2/5 border border-solid border-slate-200 p-2 my-2 mx-0.5 text-lg" type="number" />
          <span className="p-3 border">BRL</span>
        </div>

        <div>
          <label className="block" htmlFor="bitcoin-recebe">Você receberá:</label>
          <input className="w-2/5 border border-solid border-slate-200 p-2 my-2 mx-0.5 text-lg" type="number" />
          <span className="p-3 border">BUSD</span>
        </div>
      </div>
      <button className="absolute top-64 left-0 py-4 px-8 rounded-full bg-[#68ed9b] hover:bg-[#5ace7e] duration-100 text-slate-800 font-bold">Comprar</button>
    </form>
  );
}