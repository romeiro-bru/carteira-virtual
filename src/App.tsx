import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './Components/Header';
import { Home } from './Pages/Home';
import { Login } from './Pages/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;