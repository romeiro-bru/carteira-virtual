import { Nav } from './Nav';

type AccBalance = {
  accBalance: number;
  busdAmount: number;
  btcAmount: number;
  btcPrice: number
}

const transformCurrency = (btcPrice: number) => btcPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

export function SideBar({ accBalance, btcAmount, busdAmount, btcPrice }: AccBalance) {
  return (
    <section>
      <aside className="bg-white rounded-md shadow-md text-left text-slate-700">
        <h2 className="font-medium text-lg pt-4 pl-4">Saldo</h2>
        <ul className="list-none p-0">
          <li className="flex justify-between py-3 px-5">BRL: <div>{accBalance.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</div></li>
          <li className="flex justify-between py-3 px-5">BTC:  <div>฿ {btcAmount.toFixed(6)}</div></li>
          <li className="flex justify-between pt-3 pb-8 px-5">BUSD: <div>$ {busdAmount.toFixed(3)}</div></li>
          <li className="flex justify-between text-xs text-slate-500 py-5 px-2 border-t-2">Preço BTC: <div>{transformCurrency(btcPrice)}</div></li>
        </ul>
      </aside>
      <Nav />
    </section>
  );
}