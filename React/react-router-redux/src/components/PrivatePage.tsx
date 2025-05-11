import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import '../App.css';


const Home: React.FC = () => {
    return <div className='page'>
        <h2>... тут все просто, надо усложнить</h2>
        <hr />
        <br />
        <Link to="/regUsr">Приватная страница</Link>
    </div>
}

const RegUsr: React.FC<{ isRegUsr : boolean}> = ({isRegUsr}) => {
    if (!isRegUsr){
        return <Navigate to="/login" />
    }

    return <div className="page">
        <h2>
            <p className="t_italic">Выбирал я пред собой сто путей и сто дорог,</p> 
            <p className="t_italic">Но конкретной выбрать так и не смог</p> 
        </h2>
        <br />
        <Link to="/">Пора домой ...</Link>
    </div>
};

const LogUsr: React.FC<{onLogin: () => void}> = ({ onLogin }) => {
    const navigate = useNavigate();

    const tryReg = () => {
        onLogin();
        navigate('/regUsr');
    }

    return (
        <div className='page'>
            <h2>Типа авторизация</h2>
            <button onClick={tryReg}>Регистрация</button>
        </div>
    )
} 

const PrivatePage: React.FC = () => {
    const [isReg, setIsReg] = useState(false);

    const handleLogin = () => {
        setIsReg(true);
    }
    
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/regUsr' element={<RegUsr isRegUsr={isReg} />} />
                <Route path='/login' element={<LogUsr onLogin={handleLogin} />} />
            </Routes>
        </Router>
    );
};

export default PrivatePage;

