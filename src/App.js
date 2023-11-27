
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";
import ItemDetails from './pages/item';
import Home from './pages/home';
import NotFound from './pages/notFound';






function App() {
  return(<>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
        <Route path='item/:itemId' element={<ItemDetails></ItemDetails>} ></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
    </Routes>
  </>)
}

export default App;
