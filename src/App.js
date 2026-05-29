import React from 'react';
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import HomePage from './pages/Home';
import EditPage from './pages/Edit';
import Navbar from './components/Navbar';

function App() {
    return (
        <div classname="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/edit" element={<EditPage />} />
            </Routes>
        </div>
    );
}

export default App;