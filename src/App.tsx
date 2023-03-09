//Import css
import './App.css';

//Import react-router-dom
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

//Import pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Register from './pages/Register/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
