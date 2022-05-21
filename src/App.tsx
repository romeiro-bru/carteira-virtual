import { BrowserRouter } from 'react-router-dom';
import { Header } from './Components/Header';
import { Main } from './Pages/Main';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </div>
  );
}

export default App;