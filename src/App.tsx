
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import './App.scss';
import Header from './components/Header';
import Home from './pages/Home';
import Menu from './components/Menu';
import Restaurant from './pages/Restaurant';






const App: React.FC = () => {

  const [pageTitle, setPageTitle] = useState("Título Padrão");
  
  

  
  const handlePageTitleChange = (newTitle: string) => {
    setPageTitle(newTitle);
  };



  return (


   
    <Router>
      <div className="App">
    
   
        <Routes>

        <Route
        path="/"
        element={<Header pageTitle={pageTitle} />} />
        <Route
        path="/"
        element={<Menu pageTitle={pageTitle} />} />
        
        <Route index 
          element={
          <Home  hideHeader={true} hideMenu={false} />} />


          <Route path="/Login"
           element={<Login handlePageTitleChange={handlePageTitleChange} hideHeader={false} hideMenu={true} />} />

          <Route path="/Register" 
          element={<Register handlePageTitleChange={handlePageTitleChange} hideHeader={false} hideMenu={true} />} />

          <Route path="/Restaurant" element={<Restaurant hideHeader={true} hideMenu={false} />} />


        </Routes>
        

        <Footer />

      </div>
    </Router>
    
  
  );
};

export default App;


