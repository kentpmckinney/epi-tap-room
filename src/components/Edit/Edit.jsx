import React from 'react';
import PropTypes from 'prop-types';

const Edit = props => {
  const { keg } = props;
  return (
    <form id={keg.key} onSubmit={props.onSubmit}>
      <label>Name: <input className='keg-name' id='name' defaultValue={keg.name} /></label>
      <hr />
      <div><label>Brand: <input id='brand' defaultValue={keg.brand}></input></label></div>
      <div><label>Price per Pint $: <input id='price' defaultValue={keg.pricePerPint} /></label></div>
      <div><label>Alcohol Content %: <input id='alcohol' defaultValue={keg.alcoholContent} /></label></div>
      <div><label>Gluten Free: <input id='gluten' defaultValue={keg.isGlutenFree ? 'Yes' : 'No'} /></label></div>
      <div><label>Vegan: <input id='vegan' defaultValue={keg.isVegan ? 'Yes' : 'No'} /></label></div>
      <div><label>Pints Remaining: <input id='pints' defaultValue={keg.pintsRemaining} /></label></div>
      <div>
        <input type='submit' value='Save' />
      </div>
      <div><button onClick={props.onDelete} id={keg.key}>Delete</button></div>
    </form>
  );
}

Edit.propTypes = {
  keg: PropTypes.object,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func
}

export default Edit;