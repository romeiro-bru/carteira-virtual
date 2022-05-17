import React from 'react';
import { Form } from './Components/Form';
import { Nav } from './Components/Nav';
import { Header } from './Components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="flex flex-wrap justify-evenly">
        <section className="menu">
          <aside className="bg-white rounded-md shadow-md text-left text-slate-700">
            <h2 className="m-0 pt-4 pl-4">Saldo</h2>
            <ul className="list-none p-0">
              <li className="py-3 px-5">BRL: R$ 100.000</li>
              <li className="py-3 px-5">BTC: ฿ 0.00</li>
              <li className="py-3 px-5">BUSD: 0.00</li>
              <li className="py-3 px-5">Preço BTC: R$ 152,298.67</li>
            </ul>
          </aside>
          <Nav />
        </section>
        <main className="w-2/4 py-4 px-8 bg-white rounded-md shadow-md text-slate-700 text-left">
          <h1>Compra de Criptomoedas</h1>
          <Form />
        </main>
      </div>
    </div>
  );
}

export default App;
