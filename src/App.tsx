import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Pokemon from './Pages/Pokemon';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          
          <Route path='/' element={<Home/>} />
          <Route path='/pokemon/:id' element={<Pokemon/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
