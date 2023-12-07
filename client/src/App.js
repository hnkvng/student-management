import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Layout/header';
import Footer from './Layout/footer';
import Home from './Page/home/home';
import FormAdd from './Page/add/FormAdd';
import Student from './Page/student/student';

function App() {
    return (
        <BrowserRouter>
            <Header></Header>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/student" element={<Student />}></Route>
                    <Route path="/student/add" element={<FormAdd />}></Route>
                </Routes>
            </div>
            <Footer></Footer>
        </BrowserRouter>
    );
}
export default App;
