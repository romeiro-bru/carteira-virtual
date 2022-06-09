import axios from 'axios';
import React, { useState, useEffect } from 'react';

const apiBusd = "https://economia.awesomeapi.com.br/all/USD-BRL";

type ApiBUSD = {
  USD: {
    bid: string;
  }
};

type AccBalance = {
  btcPrice: number;
  wallet: Array<{ id: number, btc: number, busd: number, balance: number }>;
  setWallet: React.Dispatch<Array<{ id: number, btc: number, busd: number, balance: number }>>
}

export function Form({ setWallet, wallet, btcPrice }: AccBalance) {
  const [input, setInput] = useState("")
  const [selectedCoinA, setSelectedCoinA] = useState("BRL")
  const [selectedCoinB, setSelectedCoinB] = useState("BTC")
  const [convertedCurrency, setConvertedCurrency] = useState(0)
  const [busdPrice, setBusdPrice] = useState(0)

  const lastValue = wallet[wallet.length - 1]

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
  }, [])

  useEffect(() => {
    if (selectedCoinA === "BRL" && selectedCoinB === "BTC") { setConvertedCurrency(parseFloat(input) / btcPrice) }
    if (selectedCoinA === "BRL" && selectedCoinB === "BUSD") { setConvertedCurrency(parseFloat(input) / busdPrice) }
    if (selectedCoinA === "BUSD" && selectedCoinB === "BTC") { setConvertedCurrency(parseFloat(input) * busdPrice / btcPrice) }
    if (selectedCoinA === "BTC" && selectedCoinB === "BUSD" && parseFloat(input)) { setConvertedCurrency(parseFloat(input) / busdPrice * btcPrice) }
  }, [input, selectedCoinA, selectedCoinB, busdPrice, btcPrice])

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedCoinA === "BRL" && selectedCoinB === "BTC") {
      return setWallet([...wallet, { balance: lastValue.balance - parseFloat(input), btc: lastValue.btc + convertedCurrency, busd: lastValue.busd, id: Date.now() }])
    }
    if (selectedCoinA === "BRL" && selectedCoinB === "BUSD") {
      return setWallet([...wallet, { balance: lastValue.balance - parseFloat(input), btc: lastValue.btc, busd: lastValue.busd + convertedCurrency, id: Date.now() }])
    }
    if (selectedCoinA === "BUSD" && selectedCoinB === "BTC") {
      return setWallet([...wallet, { balance: lastValue.balance, btc: lastValue.btc + convertedCurrency, busd: lastValue.busd - parseFloat(input), id: Date.now() }])
    }
    if (selectedCoinA === "BTC" && selectedCoinB === "BUSD") {
      return setWallet([...wallet, { balance: lastValue.balance, btc: lastValue.btc - parseFloat(input), busd: lastValue.busd + convertedCurrency, id: Date.now() }])
    }
  }

  const isButtonDisabled = (input.length === 0) ||
    (selectedCoinA === selectedCoinB) ||
    (parseFloat(input) < 0) ||
    (parseFloat(input) > lastValue.balance && selectedCoinA === "BRL") ||
    (parseFloat(input) > lastValue.busd && selectedCoinA === "BUSD") ||
    (parseFloat(input) > lastValue.btc && selectedCoinA === "BTC")

  return (
    <section className="relative pb-28">
      <h1 className="mb-9 text-xl font-medium">Compra e Venda de Criptomoedas</h1>
      <form onSubmit={handleSubmit} className="inset-y-1/4">
        <div className="flex">
          <div>
            <label className="block" htmlFor="buy-sell">
              Você comprará:
            </label>

            <input value={input} onChange={(e) => setInput(e.target.value)} id="buy-sell" className="w-2/4 border border-solid border-slate-200 p-2 my-2 text-lg" type="number" />

            <select value={selectedCoinA} onChange={(e) => setSelectedCoinA(e.target.value)} className="py-4 px-1 bg-primary-color rounded cursor-pointer">
              <option value="BRL">BRL</option>
              <option value="BTC">BTC</option>
              <option value="BUSD">BUSD</option>
            </select>
          </div>
          <div>
            <label className="block" htmlFor="receive">Você receberá:</label>
            <input value={convertedCurrency.toFixed(6)} readOnly id="receive" className="w-2/4 border border-solid border-slate-200 p-2 my-2 text-lg" type="number" />
            <select value={selectedCoinB} onChange={(e) => setSelectedCoinB(e.target.value)} name="cryptcoin" className="py-4 px-1 bg-primary-color rounded cursor-pointer">
              <option value="BTC">BTC</option>
              <option value="BUSD">BUSD</option>
            </select>
          </div>
        </div>
        <button disabled={isButtonDisabled} className="disabled:opacity-60 absolute top-3/4 left-1 py-4 px-8 rounded-full bg-primary-color hover:bg-secondary-color duration-100 text-slate-800 font-bold">
          Comprar
        </button>
      </form>
    </section>
  );
}