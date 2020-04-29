import React from 'react';
import './Keg.scss';

const Keg = props => {
  return (
    <div className="Keg">
      {props.children}
    </div>
  );
}

export default Keg;