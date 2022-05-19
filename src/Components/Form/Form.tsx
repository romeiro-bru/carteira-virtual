import axios from 'axios';
import React, { useState, useEffect } from 'react';

const apiBusd = "https://economia.awesomeapi.com.br/all/USD-BRL";

type ApiBUSD = {
  USD: {
    bid: string;
  }
};

type AccBalance = {
  accBalance: number;
  setAccBalance: React.Dispatch<number>;
  setBtcAmount: React.Dispatch<number>;
  setBusdAmount: React.Dispatch<number>;
  btcPrice: string
}

export function Form({ setBusdAmount, setBtcAmount, btcPrice, accBalance, setAccBalance }: AccBalance) {
  const [input, setInput] = useState("")
  const [selectedCoinA, setSelectedCoinA] = useState("BRL")
  const [selectedCoinB, setSelectedCoinB] = useState("BTC")
  const [convertedCurrency, setConvertedCurrency] = useState(0)
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
    if (selectedCoinB === "BTC") { setConvertedCurrency(parseFloat(input) / parseFloat(btcPrice)) }
    if (selectedCoinB === "BUSD") { setConvertedCurrency(parseFloat(input) / parseFloat(busdPrice)) }
    if (selectedCoinA === "BUSD" && selectedCoinB === "BTC") { setConvertedCurrency(parseFloat(input) * parseFloat(btcPrice) / parseFloat(btcPrice)) }
    if (selectedCoinA === selectedCoinB) { setConvertedCurrency(0) }
  }, [input, selectedCoinA, selectedCoinB])

  // input x cot dolar / btc prce
  // console.log(parseFloat(coinAmount.toFixed(8)))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAccBalance(accBalance - parseFloat(input))
    if (selectedCoinB === "BTC") { setBtcAmount(convertedCurrency) }
    if (selectedCoinB === "BUSD") { setBusdAmount(convertedCurrency) }
    if (selectedCoinA === selectedCoinB) { setAccBalance(accBalance) }
  }

  return (
    <form onSubmit={handleSubmit} className="absolute inset-y-1/4">
      <div className="flex">
        <div>
          <label className="block" htmlFor="bitcoin">Você comprará:</label>
          <input value={input} onChange={handleChange} id="bitcoin" className="w-2/4 border border-solid border-slate-200 p-2 my-2 text-lg" type="number" />

          <select value={selectedCoinA} onChange={(e) => setSelectedCoinA(e.target.value)} className="py-3.5 px-1 bg-primary-color rounded cursor-pointer">
            <option value="BRL">BRL</option>
            <option value="BTC">BTC</option>
            <option value="BUSD">BUSD</option>
          </select>
        </div>
        <div>
          <label className="block">Você receberá:</label>
          <input value={convertedCurrency.toFixed(8)} readOnly className="w-2/4 border border-solid border-slate-200 p-2 my-2 text-lg" type="number" />

          <select value={selectedCoinB} onChange={(e) => setSelectedCoinB(e.target.value)} name="cryptcoin" className="py-3.5 px-1 bg-primary-color rounded cursor-pointer">
            <option value="BTC">BTC</option>
            <option value="BUSD">BUSD</option>
          </select>
        </div>
      </div>
      <button className="absolute top-3/4 left-0 py-4 px-8 rounded-full bg-primary-color hover:bg-secondary-color duration-100 text-slate-800 font-bold">Comprar</button>
    </form>
  );
}