import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home.page';
import AddContact from './pages/addContact/addContact.page';
import About from './pages/about.page';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header/header.component';
import View from './pages/view/view.component';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer position='top-center' />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/update/:id" element={<AddContact />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
