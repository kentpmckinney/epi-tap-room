import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import Keg from '../Keg/Keg';
import './KegList.scss';

class KegList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: null };
    props.kegData.kegs.forEach(keg => {
      const action = {
        type: 'ADD_ITEM', key: v4(), name: keg.name, brand: keg.brand, pricePerPint: keg.pricePerPint, alcoholContent: keg.alcoholContent,
        pintsRemaining: keg.pintsRemaining, isGlutenFree: keg.isGlutenFree, isVegan: keg.isVegan
      }
      props.dispatch(action);
    });
  }

  /* onClickPurchasePint - decrement remaining pints when a pint is purchased */
  onClickPurchasePint = (key) => {
    console.log(key)
    const keg = this.props.kegs.filter(keg => keg.key === key);
    let pintsRemaining = keg.pintsRemaining - 1;
    if (pintsRemaining < 1) { pintsRemaining = 0 }
    const action = {
      type: 'UPDATE_ITEM', key: key, name: keg.name, brand: keg.brand, pricePerPint: keg.pricePerPint, alcoholContent: keg.alcoholContent,
      pintsRemaining: pintsRemaining, isGlutenFree: keg.isGlutenFree, isVegan: keg.isVegan
    }
    this.props.dispatch(action);
  }

  /* onClickEditKeg - change the state slice editing when the Keg's Edit button is clicked */
  onClickEditKeg = event => { this.setState({ editing: event.target.id }); }

  /* onClickAddKeg - create a new Keg at the top of the list and in Edit mode when the Add Keg button is clicked */
  onClickAddKeg = () => {
    const key = v4();
    const action = {
      type: 'ADD_ITEM', key: key, name: '', brand: '', pricePerPint: 0.00, alcoholContent: 0.0, pintsRemaining: 124, isGlutenFree: false, isVegan: false
    }
    this.props.dispatch(action);
    this.setState({ editing: key });
  }

  /* onClickDeleteKeg - delete a Keg when the Delete button on the Edit screen is clicked */
  onClickDeleteKeg = event => {
    const action = { type: 'DELETE_ITEM', key: event.target.id }
    this.props.dispatch(action);
  }

  /* onClickSaveKeg - Update the record for the Keg that was just edited when the Save button is clicked */
  onClickSaveKeg = (name, brand, price, alcoholContent, glutenStatus, veganStatus, pintsRemaining, key) => {
    const action = {
      type: 'UPDATE_ITEM', key: key, brand: brand, pricePerPint: price, alcoholContent: alcoholContent,
      pintsRemaining: pintsRemaining, name: name === '' ? 'Nameless One' : name,
      isGlutenFree: glutenStatus.toLowerCase() === 'yes', isVegan: veganStatus.toLowerCase() === 'yes'
    }
    this.props.dispatch(action);
    this.setState({ editing: null });
  }

  generateEditModeUI(keg) {
    const $ = id => document.getElementById(id);
    return (
      <React.Fragment>
        <label>Name: <input className='keg-name' id='keg-name' defaultValue={keg.name} /></label>
        <hr />
        <div><label>Brand: <input id='keg-brand' defaultValue={keg.brand}></input></label></div>
        <div><label>Price per Pint $: <input id='keg-price' defaultValue={keg.pricePerPint} /></label></div>
        <div><label>Alcohol Content %: <input id='keg-alcohol' defaultValue={keg.alcoholContent} /></label></div>
        <div><label>Gluten Free: <input id='keg-gluten' defaultValue={keg.isGlutenFree ? 'Yes' : 'No'} /></label></div>
        <div><label>Vegan: <input id='keg-vegan' defaultValue={keg.isVegan ? 'Yes' : 'No'} /></label></div>
        <div><label>Pints Remaining: <input id='keg-pints' defaultValue={keg.pintsRemaining} /></label></div>
        <div>
          <button onClick={() =>
            this.onClickSaveKeg($('keg-name').value, $('keg-brand').value, $('keg-price').value, $('keg-alcohol').value, $('keg-gluten').value, $('keg-vegan').value, $('keg-pints').value,
              keg.key)}>Save</button>
        </div>
        <div><button onClick={this.onClickDeleteKeg} id={keg.key}>Delete</button></div>
      </React.Fragment>
    );
  }

  generateNormalModeUI(keg) {
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
        <button onClick={() => { this.onClickPurchasePint(keg.key); }} id={keg.key}>Purchase Pint</button>
        <button onClick={this.onClickEditKeg} id={keg.key}>Edit</button>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="KegList">
        <div className='add-keg-outer'>
          <div className='add-keg-inner'>
            <button onClick={this.onClickAddKeg}>Add Keg</button>
          </div>
        </div>
        <div className='flexbox'>{this.props.kegs.map(keg =>
          <Keg key={keg.key}>
            {this.state.editing && this.state.editing === keg.key ? this.generateEditModeUI(keg) : this.generateNormalModeUI(keg)}
          </Keg >)}
        </div>
      </div>
    );
  }

}

KegList.propTypes = {
  kegs: PropTypes.arrayOf(Object)
}

const mapStateToProps = state => { return { kegs: state } }
KegList = connect(mapStateToProps)(KegList);
export default KegList;