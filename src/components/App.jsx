import React from 'react';
import Header from './Header/Header';
import KegList from './KegList/KegList';
import data from '../data.json';
import './App.scss';

const App = () => {
  return (
    <div className="App">
      <div className="appgrid">
        <div className="header"><Header /></div>
        <div className="keg-list"><KegList kegs={data.kegs} /></div>
      </div>
    </div>
  );
}

export default App;