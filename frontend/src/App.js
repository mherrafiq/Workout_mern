import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Home from './pages/Home';
import Promotions from './pages/Promotions';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';


function App() {
  const { user, authIsReady } = useAuthContext()
  const location = useLocation()

  // Hide footer on workout schedule (Home page)
  const showFooter = location.pathname !== '/'

  return (
    <div className="App">
      {authIsReady && (
        <>
          <Navbar />
          <div className='pages'>
            <Routes>
              <Route
                path="/"
                element={user ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/promotions"
                element={<Promotions />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" />}
              />
              <Route
                path="/privacy"
                element={<Privacy />}
              />
              <Route
                path="/terms"
                element={<Terms />}
              />
              <Route
                path="/cookies"
                element={<Cookies />}
              />
              <Route
                path="*"
                element={<Navigate to="/" />}
              />
            </Routes>
          </div>
          {showFooter && <Footer />}
        </>
      )}
    </div>
  );
}

export default App;
