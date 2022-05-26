type AccBalance = {
  wallet: Array<{ id: number, btc: number, busd: number, balance: number }>;
}

export function Transactions({ wallet }: AccBalance) {
  return (
    <main className="relative w-2/4 py-4 px-8 bg-white rounded-md shadow-md text-slate-700 text-left">
      <h1 className="mb-9 text-xl font-medium">Transações</h1>
      <ul>
        {wallet !== undefined ? wallet.map(item => (
          <li key={item.id}>
            <div className="flex justify-between flex-wrap p-2 border-t-2 border-slate-300 even:bg-slate-200" >$ {item.busd}</div>
            <div className="flex justify-between flex-wrap p-2 border-t-2 border-slate-300 even:bg-slate-200" >฿ {item.btc}</div>
          </li>
        )) : ""}
      </ul>
    </main>
  );
}
