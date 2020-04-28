import React from 'react';
import Header from './Header/Header';
import KegList from './KegList/KegList';
import './App.scss';

const App = () => {
  return (
    <div className="App">
      <div className="appgrid">
        <div className="header"><Header /></div>
        <div className="keg-list"><KegList /></div>
      </div>
    </div>
  );
}

export default App;
