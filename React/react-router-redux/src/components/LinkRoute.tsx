import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import {NotFound} from './NotFound';
import {Sector} from './Sector';
import {PrivateApp} from './PrivateApp';


const Home: React.FC = () => {
  const navigate = useNavigate();
  const goToSectorPage = () => {
    navigate('/sector');
  }

    return <div className="page">
        <h1>Hello Link-Route</h1>
        <hr />
        <br />
        <button className='btn' onClick={goToSectorPage}>Песенка</button>
        <Link className='btn' to="/regUsr">Участник</Link>
     </div>;
};

const About: React.FC = () => {
  const {opis} = useParams<{ opis: string}>();
  return <div className="page">
    <h2>About {opis}</h2>
  </div>;
}


const LinkRoute: React.FC = () => {

    return (
        <Router>
            <nav className="navbar">
            <ul className="navbar-links">
              <li>
                <Link to="/">Главная</Link>
              </li>
              <li>
                <Link to="/about/Base-Link-Router">Описание Base</Link>
              </li>
              <li>
                <Link to="/about/Param-Link-Router">Описание Param</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about/:opis" element={<About />} />
            <Route path="/sector" element={<Sector />} />
            <Route path="/regUsr" element={<PrivateApp />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
      </Router>
    );
};

export default LinkRoute