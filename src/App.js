import React from "react";
//import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Contact from "./components/pages/Contact";
import NavBar from "./components/layout/NavBar";
import Home from "./components/pages/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/styles.scss';
import Login from "./components/pages/Login";
import PageDetail from "./components/pages/Detail";
import Admin from "./components/pages/Admin";
import { AuthProvider } from "./components/context/AuthContext";


function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/detail/:id" element={<PageDetail />} />
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>);
}

export default App;
