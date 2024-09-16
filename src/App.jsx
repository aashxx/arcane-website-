import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MobileNavbar from './components/MobileNavbar';
import Home from './pages/Home';
import Events from './pages/Events';
import Cursor from './components/Cursor';
import Footer from './components/Footer';
import Technical from './pages/Technical';
import NonTechnical from './pages/NonTechnical';
import Contact from './pages/Contact';
import Clubs from './pages/Clubs';
import { Toaster } from 'react-hot-toast';
import EventDetails from './pages/EventDetails';
import ClubDetails from './pages/ClubDetails';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import RegisterState from './contexts/RegisterContext';
import PaymentState from './contexts/PaymentContext';
import ProtectedAdmin from './admin/pages/ProtectedAdmin';

const App = () => {

  const [openNav, setOpenNav] = useState(false);

  return (
    <Router>
      <RegisterState>
        <PaymentState>
          <Cursor />
          <MobileNavbar openNav={openNav} setOpenNav={setOpenNav} />
          <Navbar openNav={openNav} setOpenNav={setOpenNav} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/events' element={<Events />} />
            <Route path='/events/technical-events' element={<Technical />} />
            <Route path='/events/non-technical-events' element={<NonTechnical />} />
            <Route path='/events/technical-events/:eventName' element={<EventDetails />} />
            <Route path='/events/non-technical-events/:eventName' element={<EventDetails />} />
            <Route path='/clubs' element={<Clubs />} />
            <Route path='/clubs/:clubName' element={<ClubDetails />} />
            <Route path='/register' element={<Register />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/arcane-administrator' element={<ProtectedAdmin />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
          <Toaster />
        </PaymentState>
      </RegisterState>
    </Router>
  )
}

export default App;