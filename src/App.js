import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {StockOverviewPage} from './pages/StockOverviewPage' 
import {StockDetailsPage} from './pages/StockDetailsPage' 
import './App.css';
import { WatchListContextProvider } from './context/watchListContext';

function App() {
  return (
    <main className="container">
      <WatchListContextProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<StockOverviewPage/>}/>
        <Route path='/detail/:symbol' element={<StockDetailsPage/>} />
      </Routes>
      </BrowserRouter>
      </WatchListContextProvider>
    </main>
  );
}

export default App;
