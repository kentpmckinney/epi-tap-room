import React from 'react';
import PropTypes from 'prop-types';
import './Keg.scss';

const Keg = props => {
  return (
    <div className="Keg">
      {props.children}
    </div>
  );
}

Keg.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default Keg;