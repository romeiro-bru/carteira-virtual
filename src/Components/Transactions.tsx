const bitcoin = require('../assets/icons/bitcoin.png');
const busd = require('../assets/icons/busd.png');
const date = require('../assets/icons/calendar.png');

type AccBalance = {
  wallet: Array<{ id: number, btc: number, busd: number, balance: number }>;
}

const column = [
  { head: "BTC", img: bitcoin },
  { head: "BUSD", img: busd },
  { head: "Id", img: date }
]

export function Transactions({ wallet }: AccBalance) {
  return (
    <section className="mt-6">
      <h2 className="mb-9 text-xl font-medium">Transações</h2>
      <table className="w-full">
        <thead>
          <tr className="flex justify-between flex-wrap p-2 border-t-2 border-slate-300 even:bg-slate-200">
            {column.map((item, i) =>
              <th key={i} className="flex">
                <img src={item.img} className="h-7 mr-0.5" alt={`${item.head} icon`} />
                {item.head}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {wallet !== undefined && wallet.map((item, i) =>
            <tr key={i} className={item.id !== 0 ? 'flex justify-between flex-wrap p-2 border-t-2 border-slate-300 even:bg-slate-200' : 'hidden'}>
              <td>฿ {item.btc.toFixed(6)}</td>
              <td>$ {item.busd.toFixed(3)}</td>
              <td>{item.id}</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}