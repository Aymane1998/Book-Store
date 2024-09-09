import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import BooksPage from './Componenets/BookPages/BooksPage';
import { AddBookForm } from './Componenets/AddBookPage/AddBookForm';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/addBook" element={<AddBookForm />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
