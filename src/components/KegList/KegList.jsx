import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import Keg from '../Keg/Keg';
import './KegList.scss';

class KegList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { kegs: props.kegs, kegInEditState: null };
    this.state.kegs.forEach(keg => { keg.key = v4(); }); // Give each Keg a unique key
  }

  /* onClickPurchasePint - decrement remaining pints when a pint is purchased */
  onClickPurchasePint = (pintsPurchased, key) => {
    const kegs = this.state.kegs;
    let newKegs = kegs.map(keg => {
      if (keg.key === key) {
        let newKeg = keg;
        newKeg.pintsRemaining -= pintsPurchased;
        if (newKeg.pintsRemaining < 0) newKeg.pintsRemaining = 0;
        return newKeg;
      }
      else return keg;
    });
    this.setState({ kegs: newKegs });
  }

  /* onClickEditKeg - change the state slice kegInEditState when the Keg's Edit button is clicked */
  onClickEditKeg = event => { this.setState({ kegInEditState: event.target.id }); }

  /* onClickAddKeg - create a new Keg at the top of the list and in Edit mode when the Add Keg button is clicked */
  onClickAddKeg = () => {
    let newKegs = this.state.kegs
    const key = v4();
    let newKeg = { kegName: '', brand: '', pintsRemaining: 124, pricePerPint: 0.00, alcoholContent: 0.0, glutenStatus: false, veganStatus: false, key: key };
    newKegs.unshift(newKeg);
    this.setState({ kegInEditState: key, kegs: newKegs });
  }

  /* onClickDeleteKeg - delete a Keg when the Delete button on the Edit screen is clicked */
  onClickDeleteKeg = event => {
    const kegs = this.state.kegs;
    const filteredKegs = kegs.filter(keg => keg.key !== event.target.id)
    this.setState({ kegs: filteredKegs });
  }

  /* onClickSaveKeg - Update the record for the Keg that was just edited when the Save button is clicked */
  onClickSaveKeg = (kegName, brand, price, alcoholContent, glutenStatus, veganStatus, pintsRemaining, key) => {
    const newKegs = this.state.kegs.map(keg => {
      if (keg.key === key) {
        let newKeg = keg;
        newKeg.pintsRemaining = pintsRemaining >= 0 ? pintsRemaining : 0;
        newKeg.kegName = kegName ? kegName : 'Nameless One';
        newKeg.brand = brand;
        newKeg.pricePerPint = price;
        newKeg.alcoholContent = alcoholContent;
        newKeg.isGlutenFree = glutenStatus.toLowerCase() === 'yes';
        newKeg.isVegan = veganStatus.toLowerCase() === 'yes';
        return newKeg;
      }
      else return keg;
    });
    this.setState({ kegInEditState: null, kegs: newKegs });
  }

  generateEditModeUI(keg) {
    const $ = id => document.getElementById(id);
    return (
      <React.Fragment>
        <label>Name: <input className='keg-name' id='keg-name' defaultValue={keg.kegName} /></label>
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
        <div className='keg-name'>{keg.kegName}</div>
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
        <button onClick={() => { this.onClickPurchasePint(1, keg.key); }} id={keg.key}>Purchase Pint</button>
        <button onClick={this.onClickEditKeg} id={keg.key}>Edit</button>
      </React.Fragment>
    );
  }

  render() {

    let kegsUI = [];
    for (let i = 0; i < this.state.kegs.length; i++) {
      const keg = this.state.kegs[i];

      kegsUI.push( // Push the User Interface for the current Keg to the kegsUI array
        <Keg key={keg.key}>
          {this.state.kegInEditState && this.state.kegInEditState === keg.key ? this.generateEditModeUI(keg) : this.generateNormalModeUI(keg)}
        </Keg >
      )
    }

    return (
      <div className="KegList">
        <div className='add-keg-outer'>
          <div className='add-keg-inner'>
            <button onClick={this.onClickAddKeg}>Add Keg</button>
          </div>
        </div>
        <div className='flexbox'>{kegsUI}</div>
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