import './App.css';

import { Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Forum from './pages/Forum';
import Home from './pages/Home';
import Login from './pages/Login';
import Movies from './pages/Movies';
import Profile from './pages/Profile';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route>
          <Route path="/home" element={<Home />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forum"
            element={
              <ProtectedRoute>
                <Forum />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
