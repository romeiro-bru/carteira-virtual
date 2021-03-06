import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from '../Components/Form';
import { SideBar } from '../Components/SideBar';
import { Transactions } from '../Components/Transactions';

const apiBtc = "https://www.mercadobitcoin.net/api/BTC/ticker";

type ApiBtc = {
  ticker: {
    last: string;
  }
};

export type Data = {
  btc: number;
  busd: number;
  balance: number;
  id: number;
}

const initVal: Data = {
  balance: 100000,
  btc: 0,
  busd: 0,
  id: 0
}

const ls = localStorage.getItem("storeAccData")
const initData = ls !== null && ls !== undefined ? JSON.parse(ls) : [initVal]

export function Home() {
  const [wallet, setWallet] = useState<Data[]>(initData)
  const [btcPrice, setBtcPrice] = useState(0)

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

  useEffect(() => {
    localStorage.setItem("storeAccData", JSON.stringify(wallet))
  }, [wallet])

  return (
    <div className="flex flex-wrap justify-evenly mt-8">
      <SideBar wallet={wallet} btcPrice={btcPrice} />
      <main className="relative w-2/4 py-4 px-8 bg-white rounded-md shadow-md text-slate-700 text-left">
        <Form setWallet={setWallet} wallet={wallet} btcPrice={btcPrice} />
        {wallet[1] && <Transactions wallet={wallet} />}
      </main>
    </div>
  );
}