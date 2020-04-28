import React from 'react';
import Keg from '../Keg/Keg';
import data from '../../data.json';
import './KegList.scss';

const KegList = () => {
  console.log(data)
  return (
    <div className="KegList">
      {data.kegs.map(keg => <Keg />)}
    </div>
  );
}

export default KegList;