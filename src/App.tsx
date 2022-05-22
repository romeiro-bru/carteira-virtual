import { Routes, Route } from 'react-router-dom';
import { Header } from './Components/Header';
import { Home } from './Pages/Home';
import { Login } from './Pages/Login';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;