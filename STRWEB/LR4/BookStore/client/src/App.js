import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import AuthChoicePage from './pages/AuthChoicePage';
import AuthPasswordPage from './pages/AuthPasswordPage';
import RegisterPage from './pages/RegisterPage';
import CatalogPage from './pages/CatalogPage';
import AddPage from './pages/AddPage';
import EditBookPage from './pages/EditBookPage';
// import ReviewPage from './pages/ReviewPage';
import BookDetailsPage from './pages/BookDetailsPage';
import AboutUs from './pages/AboutUs';
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <div style={styles.container}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthChoicePage />} />
          <Route path="/auth/password" element={<AuthPasswordPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/books/add" element={<AddPage />} />
          <Route path="/books/:id/details" element={<BookDetailsPage />} />
          <Route path="/books/:id/edit" element={<EditBookPage />} />
          {/* <Route path="/books/:bookId/reviews" element={<ReviewPage />} /> */}
         
          <Route path="/contacts" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  container: {
    padding: '20px'
  }
};

export default App;
