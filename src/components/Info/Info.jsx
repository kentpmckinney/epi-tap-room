import React from 'react';
import PropTypes from 'prop-types';

const Info = props => {
  const { keg } = props;
  return (
    <React.Fragment>
      <div className='keg-name'>{keg.name}</div>
      <hr />
      <div>Price per Pint: <span className='keg-price'>${keg.pricePerPint}</span></div>
      <br />
      <div>Pints Remaining: <span>{keg.pintsRemaining}</span>
        {keg.pintsRemaining > 0 && keg.pintsRemaining < 10 ? <span className='warning'>Almost Emtpy</span> : ''}
        {keg.pintsRemaining <= 0 ? <span className='warning'>Out of Stock</span> : ''}
      </div>
      <br />
      <details>
        <summary>Details</summary>
        <br />
        <div className='within-details'>
          <div>Brand: <span>{keg.brand}</span></div>
          <div>Alcohol Content: <span>{keg.alcoholContent}%</span></div>
          <div>Gluten Free: <span>{keg.isGlutenFree ? 'Yes' : 'No'}</span></div>
          <div>Vegan: <span>{keg.isVegan ? 'Yes' : 'No'}</span></div>
        </div>
      </details>
      <br />
      <button onClick={() => { props.onPurchase(keg.key) }} id={keg.key}>Purchase Pint</button>
      <button onClick={props.onEdit} id={keg.key}>Edit</button>
    </React.Fragment >
  );
}

Info.propTypes = {
  keg: PropTypes.object,
  onPurchase: PropTypes.func,
  onEdit: PropTypes.func
}

export default Info;