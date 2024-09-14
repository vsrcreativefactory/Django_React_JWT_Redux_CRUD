import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import PrivateRoute from './utils/PrivateRoute';
import {AuthProvider} from './context/AuthContext'
import Navbar from './components/Navbar';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
        <Navbar />
        <Header />
        <Routes>
          <Route path='/' element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App;
