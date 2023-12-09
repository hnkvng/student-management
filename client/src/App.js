import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Layout/header';
import Footer from './Layout/footer';
import Home from './Page/home/home';
import Add from './Page/add/Add';
import Student from './Page/student/student';
import Edit from './Page/student/component/edit';
import { addStudent } from './Page/add/component/Form/FormSlice';
function App() {
    return (
        <BrowserRouter>
            <Header></Header>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/student" element={<Student />}></Route>
                    <Route path="/student/:id/edit" element={<Edit />}></Route>
                    <Route
                        path="/student/add"
                        element={<Add method={addStudent} />}
                    ></Route>
                </Routes>
            </div>
            <Footer></Footer>
        </BrowserRouter>
    );
}
export default App;
