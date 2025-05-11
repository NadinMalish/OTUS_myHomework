import React  from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import '../App.css';

export const Sector: React.FC = () => {
    const navigate = useNavigate();
    const gotoHomePage = () => {
        navigate('/');
    }

    return <div className="page">
        <h2>
            <p className="t_italic">Солнышко лучистое улыбнулось весело</p> 
            <p className="t_italic">Потому что с корешем мы запели песенку</p> 
        </h2>
        <br />
        <button onClick={gotoHomePage}>Пора домой ...</button>
    </div>
}