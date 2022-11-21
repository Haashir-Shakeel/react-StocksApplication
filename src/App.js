import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {StockOverviewPage} from './pages/StockOverviewPage' 
import {StockDetailsPage} from './pages/StockDetailsPage' 
import './App.css';

function App() {
  return (
    <main className="container">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<StockOverviewPage/>}/>
        <Route path='/detail/:symbol' element={<StockDetailsPage/>} />
      </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
