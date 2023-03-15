//Import css
import './App.css';

//Import react-router-dom
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//Hooks
import { useState, useEffect } from 'react';
import { useRegister } from './hooks/useRegister';

//Firebase
import { onAuthStateChanged } from '@firebase/auth';

//Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

//Import pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Dashboard from './pages/Dashboard/Dashboard';
import Events from './pages/Events/Events';

//Context
import { AuthProvider } from './context/AuthContext';

function App() {
  const [user, setUser] = useState<any>(undefined);
  const { auth } = useRegister();
  const loadingUser = user === undefined;


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);

    })
  }, [auth]);

  if (loadingUser) {
    return <p>Loading...</p>;
  }


  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route path="/home" element={user ? <Navigate to="/dashboard" /> : <Home />} />
              <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={!user ? <Navigate to="/" /> : <Profile />} />
              <Route path="/dashboard" element={!user ? <Navigate to="/" /> : <Dashboard />} />
              <Route path="/events" element={!user ? <Navigate to="/" /> : <Events />} />
              <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
              <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>

    </div>
  );
}

export default App;
