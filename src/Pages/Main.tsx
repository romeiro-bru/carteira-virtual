import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from '../Components/Form';
import { SideBar } from '../Components/SideBar';

const apiBtc = "https://www.mercadobitcoin.net/api/BTC/ticker";

type ApiBtc = {
  ticker: {
    last: string;
  }
};

export function Main() {
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

  return (
    <div className="flex flex-wrap justify-evenly">
      <SideBar accBalance={accBalance} btcAmount={btcAmount} busdAmount={busdAmount} btcPrice={btcPrice} />
      <Form busdAmount={busdAmount} btcAmount={btcAmount} setBusdAmount={setBusdAmount} setBtcAmount={setBtcAmount} btcPrice={btcPrice} setAccBalance={setAccBalance} accBalance={accBalance} />
    </div>
  );
}