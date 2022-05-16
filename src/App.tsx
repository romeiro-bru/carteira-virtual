import React from 'react';
import './App.css';
import { Form } from './Components/Form';
import { Nav } from './Components/Nav';
import { Header } from './Components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="flex">
        <section className="menu">
          <aside>
            <h2>Saldo</h2>
            <ul>
              <li>BRL: R$ 100.000</li>
              <li>BTC: ฿ 0.00</li>
              <li>BUSD: 0.00</li>
              <li>Preço BTC: R$ 152,298.67</li>
            </ul>
          </aside>
          <Nav />
        </section>
        <main>
          <h1>Compra de Criptomoedas</h1>
          <Form />
        </main>
      </div>
    </div>
  );
}

export default App;
