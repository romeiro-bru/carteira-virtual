import axios from 'axios';
import { useState, useEffect } from 'react';
import { Form } from './Components/Form/Form';
import { Nav } from './Components/Nav';
import { Header } from './Components/Header';

const apiBtc = "https://www.mercadobitcoin.net/api/BTC/ticker";

type ApiBtc = {
  ticker: {
    last: string;
  }
};

function App() {
  const [accBalance, setAccBalance] = useState<number>(100000)
  const [btcPrice, setBtcPrice] = useState<string>("0")

  useEffect(() => {
    const fetchBtcPrice = async () => {
      try {
        const response = await axios.get<ApiBtc>(apiBtc)
        setBtcPrice(response.data.ticker.last)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBtcPrice()
  }, [])

  const transformCurrency = parseInt(btcPrice).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

  return (
    <div className="App">
      <Header />
      <div className="flex flex-wrap justify-evenly">
        <section>
          <aside className="bg-white rounded-md shadow-md text-left text-slate-700">
            <h2 className="font-medium text-lg pt-4 pl-4">Saldo</h2>
            <ul className="list-none p-0">
              <li className="py-3 px-5">BRL: {accBalance.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</li>
              <li className="py-3 px-5">BTC: ฿ 0.00</li>
              <li className="pt-3 pb-8 px-5">BUSD: 0.00</li>
              <li className="p-5 border-t-2">Preço BTC: {transformCurrency}</li>
            </ul>
          </aside>
          <Nav />
        </section>
        <main className="relative w-2/4 py-4 px-8 bg-white rounded-md shadow-md text-slate-700 text-left">
          <h1 className="mb-9 text-xl font-medium">Compra de Criptomoedas</h1>
          <Form btcPrice={btcPrice} setAccBalance={setAccBalance} accBalance={accBalance} />
        </main>
      </div>
    </div>
  );
}

export default App;
