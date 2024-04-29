import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './components/homepage';
import { useState } from 'react';
import Home from './components/home';
import Private_Route from './components/private_route';
import Activity from './components/activity_page';
import Call_User from './components/call';
import Page_404 from './components/page_404';

function App() {
  const [user,setUser]=useState('');

  return (
    <BrowserRouter>

    <Routes>

    <Route 
      path='/' 
      exact 
      element={
      <Home user={user}
        setUser={setUser}
        />}
      />

      <Route element={<Private_Route user={user} />} >

      <Route 
      path='/group_chat' 
      exact 
      element={<Homepage
        user={user}
        setUser={setUser}
      />}
      />

      <Route 
      path='/activity' 
      exact 
      element={<Activity
        user={user}
      />}
      />

    <Route 
      path='/call' 
      exact 
      element={<Call_User
        user={user}
      />}
      />

      </Route>

      <Route 
      path='*' 
      exact 
      element={<Page_404
      />}
      />

    </Routes>

    </BrowserRouter>
  );
}

export default App;
