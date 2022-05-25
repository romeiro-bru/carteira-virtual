import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from '../Components/Form';
import { SideBar } from '../Components/SideBar';
// import { Transactions } from '../Components/Transactions';

const apiBtc = "https://www.mercadobitcoin.net/api/BTC/ticker";

type ApiBtc = {
  ticker: {
    last: string;
  }
};

type Data = {
  btc: number;
  busd: number;
  balance: number;
  id: number;
}

export function Home() {
  const [wallet, setWallet] = useState<Data[]>([])
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

  useEffect(() => {
    // const ls = localStorage.getItem("storeAccData")
    // ls !== null && setData(JSON.parse(ls))
    setWallet([...wallet, { balance: accBalance, btc: btcAmount, busd: busdAmount, id: Date.now() }])
  }, [accBalance, btcAmount, busdAmount])

  useEffect(() => {
    localStorage.setItem("storeAccData", JSON.stringify(wallet))
  }, [wallet])

  return (
    <div className="flex flex-wrap justify-evenly mt-8">
      <SideBar accBalance={accBalance} btcAmount={btcAmount} busdAmount={busdAmount} btcPrice={btcPrice} />
      <Form setWallet={setWallet} wallet={wallet} busdAmount={busdAmount} btcAmount={btcAmount} setBusdAmount={setBusdAmount} setBtcAmount={setBtcAmount} btcPrice={btcPrice} setAccBalance={setAccBalance} accBalance={accBalance} />
      {/* <Transactions wallet={wallet} /> */}
    </div>
  );
}