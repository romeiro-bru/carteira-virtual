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
  busdAmount: number;
  btcAmount: number;
  btcPrice: number
}

export function Form({ busdAmount, btcAmount, setBusdAmount, setBtcAmount, btcPrice, accBalance, setAccBalance }: AccBalance) {
  const [input, setInput] = useState("")
  const [selectedCoinA, setSelectedCoinA] = useState("BRL")
  const [selectedCoinB, setSelectedCoinB] = useState("BTC")
  const [convertedCurrency, setConvertedCurrency] = useState(0)
  const [busdPrice, setBusdPrice] = useState(0)
  const [selectAction, setSelectAction] = useState("buy")

  useEffect(() => {
    const fetchBUSDPrice = async () => {
      try {
        const response = await axios.get<ApiBUSD>(apiBusd)
        setBusdPrice(parseFloat(response.data.USD.bid))
      } catch (error) {
        console.log(error)
      }
    }
    fetchBUSDPrice()
    if (selectedCoinA === "BRL" && selectedCoinB === "BTC") { setConvertedCurrency(parseFloat(input) / btcPrice) }
    if (selectedCoinA === "BRL" && selectedCoinB === "BUSD") { setConvertedCurrency(parseFloat(input) / busdPrice) }
    if (selectedCoinA === "BUSD" && selectedCoinB === "BTC") { setConvertedCurrency(parseFloat(input) * busdPrice / btcPrice) }
    if (selectedCoinA === "BTC" && selectedCoinB === "BUSD") { setConvertedCurrency(parseFloat(input) / busdPrice * btcPrice) }
  }, [input, selectedCoinA, selectedCoinB])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAccBalance(accBalance - parseFloat(input))
    if (selectedCoinB === "BTC") { setBtcAmount(convertedCurrency) }
    if (selectedCoinB === "BUSD") { setBusdAmount(convertedCurrency) }
  }

  return (
    <form onSubmit={handleSubmit} className="absolute inset-y-1/4">
      <div className="flex">
        <div>
          <label className="block" htmlFor="bitcoin">
            <select onChange={(e) => setSelectAction(e.target.value)} className="rounded py-1.5 bg-teal-100" name="buy-sell">
              <option value="buy">Compra</option>
              <option value="sell">Venda</option>
            </select>
          </label>

          <input value={input} onChange={handleChange} id="bitcoin" className="w-2/4 border border-solid border-slate-200 p-2 my-2 text-lg" type="number" />

          <select value={selectedCoinA} onChange={(e) => setSelectedCoinA(e.target.value)} className="py-3.5 px-1 bg-primary-color rounded cursor-pointer">
            <option value="BRL">BRL</option>
            <option value="BTC">BTC</option>
            <option value="BUSD">BUSD</option>
          </select>
        </div>
        <div>
          <label className="block py-1">Você receberá:</label>
          <input value={convertedCurrency.toFixed(6)} readOnly className="w-2/4 border border-solid border-slate-200 p-2 my-2 text-lg" type="number" />
          <select value={selectedCoinB} onChange={(e) => setSelectedCoinB(e.target.value)} name="cryptcoin" className="py-3.5 px-1 bg-primary-color rounded cursor-pointer">
            <option value="BTC">BTC</option>
            <option value="BUSD">BUSD</option>
          </select>
        </div>
      </div>
      <button disabled={input.length === 0 || selectedCoinA === selectedCoinB} className="disabled:opacity-60 absolute top-3/4 left-0 py-4 px-8 rounded-full bg-primary-color hover:bg-secondary-color duration-100 text-slate-800 font-bold">
        {selectAction === "buy" ? "Comprar" : "Vender"}
      </button>
    </form>
  );
}