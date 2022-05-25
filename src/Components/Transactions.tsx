type Data = {
  data: Array<{ id: number, btc: number, busd: number, balance: number }>
}

export function Transactions({ data }: Data) {
  return (
    <main className="relative w-2/4 py-4 px-8 bg-white rounded-md shadow-md text-slate-700 text-left">
      <h1 className="mb-9 text-xl font-medium">Transações</h1>
      <ul>
        {data !== undefined ? data.map((item, i) => (
          <li key={i} className="flex justify-between flex-wrap p-2 border-t-2 border-slate-300 even:bg-slate-200" >
            <span>฿ {item.btc}</span>
            <span>$ {item.busd}</span>
          </li>
        )) : ""}
      </ul>
    </main>
  );
}