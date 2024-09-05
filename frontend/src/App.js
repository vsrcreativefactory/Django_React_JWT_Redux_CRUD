import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import PrivateRoute from './utils/PrivateRoute';
import {AuthProvider} from './context/AuthContext'

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
        <Header />
        <Routes>
          <Route path='/' element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App;
