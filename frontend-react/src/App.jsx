import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import Login from './pages/login.jsx';
import Home from './pages/home.jsx';
import Product from './pages/product.jsx';
import Cart from './pages/Cart.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />}/>
          <Route path='/product/:productId' element={<Product/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App
