import axios from 'axios';
import React, { useState, useEffect, EffectCallback } from 'react';

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
  const [input, SetInput] = useState<string>("")
  const [selectedCoin, setSelectedCoin] = useState<string>("BTC")
  const [coinAmount, setCoinAmount] = useState<number>()
  const [busdPrice, setBusdPrice] = useState<string>("")

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
    SetInput(e.target.value)
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
          <label className="block" htmlFor="bitcoin-recebe">Você receberá:</label>
          <input value={coinAmount} readOnly className="w-2/4 border border-solid border-slate-200 p-2 my-2 mx-0.5 text-lg" type="number" />

          <select value={selectedCoin} onChange={(e) => setSelectedCoin(e.target.value)} name="cryptcoin" className="py-3.5 bg-[#68ed9a] rounded px-1">
            <option value="BTC">BTC</option>
            <option value="BUSD">BUSD</option>
          </select>
        </div>
      </div>
      <button className="absolute top-3/4 left-0 py-4 px-8 rounded-full bg-[#68ed9b] hover:bg-[#5ace7e] duration-100 text-slate-800 font-bold">Comprar</button>
    </form>
  );
}