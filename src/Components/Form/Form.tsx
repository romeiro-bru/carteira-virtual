import axios from 'axios';
import React, { useState, useEffect } from 'react';

const apiBusd = "https://economia.awesomeapi.com.br/all/USD-BRL";

type ApiBUSD = {
  USD: {
    bid: string;
  }
};

type AccountVal = {
  accountVal: number;
  btcPrice: string
}

export function Form({ btcPrice }: AccountVal) {
  const [input, setInput] = useState("")
  const [selectedCoin, setSelectedCoin] = useState("BTC")
  const [coinAmount, setCoinAmount] = useState<number>()
  const [busdPrice, setBusdPrice] = useState("")

  useEffect(() => {
    const fetchBUSDPrice = async () => {
      try {
        const response = await axios.get<ApiBUSD>(apiBusd)
        setBusdPrice(response.data.USD.bid)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBUSDPrice()
    if (selectedCoin === "BTC") { setCoinAmount(parseFloat(input) / parseFloat(btcPrice)) }
    if (selectedCoin === "BUSD") { setCoinAmount(parseFloat(input) / parseFloat(busdPrice)) }
  }, [selectedCoin, input])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  return (
    <form className="absolute inset-y-1/4">
      <div className="flex">
        <div>
          <label className="block" htmlFor="bitcoin">Você comprará:</label>
          <input value={input} onChange={handleChange} id="bitcoin" className="w-2/4 border border-solid border-slate-200 p-2 my-2 mx-0.5 text-lg" type="number" />
          <span className="p-3 border">BRL</span>
        </div>
        <div>
          <label className="block">Você receberá:</label>
          <input value={coinAmount} readOnly className="w-2/4 border border-solid border-slate-200 p-2 my-2 mx-0.5 text-lg" type="number" />

          <select value={selectedCoin} onChange={(e) => setSelectedCoin(e.target.value)} name="cryptcoin" className="py-3.5 bg-primary-color rounded px-1">
            <option value="BTC">BTC</option>
            <option value="BUSD">BUSD</option>
          </select>
        </div>
      </div>
      <button className="absolute top-3/4 left-0 py-4 px-8 rounded-full bg-primary-color hover:bg-secondary-color duration-100 text-slate-800 font-bold">Comprar</button>
    </form>
  );
}