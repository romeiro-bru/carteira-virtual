import axios from 'axios';
import { useState, useEffect } from 'react';
import { Form } from './Components/Form/Form';
import { Nav } from './Components/Nav';
import { Header } from './Components/Header';
// const bitcoin = require('./assets/icons/bitcoin.png');

const apiBtc = "https://www.mercadobitcoin.net/api/BTC/ticker";

type ApiBtc = {
  ticker: {
    last: string;
  }
};

function App() {
  const [accBalance, setAccBalance] = useState(100000)
  const [btcPrice, setBtcPrice] = useState(0)
  const [btcAmount, setBtcAmount] = useState(0)
  const [busdAmount, setBusdAmount] = useState(0)

  useEffect(() => {
    const fetchBtcPrice = async () => {
      try {
        const response = await axios.get<ApiBtc>(apiBtc)
        setBtcPrice(parseFloat(response.data.ticker.last))
      } catch (error) {
        console.log(error)
      }
    }
    fetchBtcPrice()
  }, [])

  const transformCurrency = btcPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

  return (
    <div className="App">
      <Header />
      <div className="flex flex-wrap justify-evenly">
        <section>
          <aside className="bg-white rounded-md shadow-md text-left text-slate-700">
            <h2 className="font-medium text-lg pt-4 pl-4">Saldo</h2>
            <ul className="list-none p-0">
              <li className="flex justify-between py-3 px-5">BRL: <div>{accBalance.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</div></li>
              <li className="flex justify-between py-3 px-5">BTC:  <div>฿ {btcAmount.toFixed(6)}</div></li>

              <li className="flex justify-between pt-3 pb-8 px-5">BUSD: <div>$ {busdAmount.toFixed(3)}</div></li>
              <li className="flex justify-between text-xs text-slate-500 py-5 px-2 border-t-2">Preço BTC: <div>{transformCurrency}</div></li>
            </ul>
          </aside>
          <Nav />
        </section>
        <main className="relative w-2/4 py-4 px-8 bg-white rounded-md shadow-md text-slate-700 text-left">
          <h1 className="mb-9 text-xl font-medium">Compra e Venda de Criptomoedas</h1>
          <Form busdAmount={busdAmount} btcAmount={btcAmount} setBusdAmount={setBusdAmount} setBtcAmount={setBtcAmount} btcPrice={btcPrice} setAccBalance={setAccBalance} accBalance={accBalance} />

        </main>
      </div>
    </div>
  );
}

export default App;
