import React from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import Keg from '../Keg/Keg';
import './KegList.scss';

class KegList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kegs: props.kegs,
      kegInEditState: null,
      kegInShowDetailState: null
    };

    // Give each Keg a unique key
    this.state.kegs.forEach(keg => {
      keg.key = v4();
    });
  }

  /* handleClickPurchasePint - decrement remaining pints when a pint is purchased */
  handleClickPurchasePint = (pintsPurchased, key) => {
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

  /* handleClickEditKeg - change the state slice kegInEditState when the Keg's Edit button is clicked */
  handleClickEditKeg = event => {
    this.setState({ kegInEditState: event.target.id });
  }

  /* handleClickAddKeg - create a new Keg at the top of the list and in Edit mode when the Add Keg button is clicked */
  handleClickAddKeg = () => {
    let newKegs = this.state.kegs
    const key = v4();
    let newKeg = { kegName: '', brand: '', pintsRemaining: 124, pricePerPint: 0.00, alcoholContent: 0.0, glutenStatus: false, veganStatus: false, key: key };
    newKegs.unshift(newKeg);
    this.setState({ kegInEditState: key, kegs: newKegs });
  }

  /* handleClickDeleteKeg - delete a Keg when the Delete button on the Edit screen is clicked */
  handleClickDeleteKeg = event => {
    const kegs = this.state.kegs;
    const filteredKegs = kegs.filter(keg => keg.key !== event.target.id)
    this.setState({ kegs: filteredKegs });
  }

  /* handleClickSaveKeg - Update the record for the Keg that was just edited when the Save button is clicked */
  handleClickSaveKeg = (kegName, brand, price, alcoholContent, glutenStatus, veganStatus, pintsRemaining, key) => {
    const kegs = this.state.kegs;
    let newKegs = kegs.map(keg => {
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

  /* handleClickShowDetail - change the state slice kegInShowDetailState when the Details button is clicked */
  handleClickShowDetail = event => {
    this.setState({ kegInShowDetailState: event.target.id });
  }

  /* handleClickBackFromDetail - change the state slice kegInShowDetailState when the Back button is clicked in Detail mode */
  handleClickBackFromDetail = event => {
    this.setState({ kegInShowDetailState: null });
  }


  render() {
    let kegsUI = [];

    // Iterate over the list of kegs
    for (let i = 0; i < this.state.kegs.length; i++) {

      // Push the User Interface for the current Keg to the kegsUI array
      kegsUI.push(
        <Keg key={this.state.kegs[i].key}>
          {
            this.state.kegInEditState && this.state.kegInEditState === this.state.kegs[i].key ?
              /* Render the Keg in EDIT MODE */
              <React.Fragment>
                <div><label htmlFor='keg-name'>Name: </label><input className='keg-name' id='keg-name' defaultValue={this.state.kegs[i].kegName}></input></div>
                <hr />
                <div><label htmlFor='keg-brand'>Brand: </label><input id='keg-brand' defaultValue={this.state.kegs[i].brand}></input></div>
                <div><label htmlFor='keg-price'>Price per Pint: </label><input id='keg-price' defaultValue={this.state.kegs[i].pricePerPint}></input></div>
                <div><label htmlFor='keg-alcohol'>Alcohol Content: </label><input id='keg-alcohol' defaultValue={this.state.kegs[i].alcoholContent}></input></div>
                <div><label htmlFor='keg-gluten'>Gluten Free: </label><input id='keg-gluten' defaultValue={this.state.kegs[i].isGlutenFree ? 'Yes' : 'No'}></input></div>
                <div><label htmlFor='keg-vegan'>Vegan: </label><input id='keg-vegan' defaultValue={this.state.kegs[i].isVegan ? 'Yes' : 'No'}></input></div>
                <div><label htmlFor='keg-pints'>Pints Remaining: </label><input id='keg-pints' defaultValue={this.state.kegs[i].pintsRemaining}></input></div>
                <div>
                  <button onClick={() =>
                    this.handleClickSaveKeg(
                      document.getElementById('keg-name').value,
                      document.getElementById('keg-brand').value,
                      document.getElementById('keg-price').value,
                      document.getElementById('keg-alcohol').value,
                      document.getElementById('keg-gluten').value,
                      document.getElementById('keg-vegan').value,
                      document.getElementById('keg-pints').value,
                      this.state.kegs[i].key)}>Save</button>
                </div>
                <div><button onClick={this.handleClickDeleteKeg} id={this.state.kegs[i].key}>Delete</button></div>
              </React.Fragment>
              :
              this.state.kegInShowDetailState && this.state.kegInShowDetailState === this.state.kegs[i].key ?
                /* Render the Keg in SHOW DETAIL MODE */
                <React.Fragment>
                  <div className='keg-name'>{this.state.kegs[i].kegName}</div>
                  <hr />
                  <div><span>Brand: </span><span>{this.state.kegs[i].brand}</span></div>
                  <div><span>Price per Pint: </span><span className='keg-price'>{this.state.kegs[i].pricePerPint}</span></div>
                  <div><span>Alcohol Content: </span><span>{this.state.kegs[i].alcoholContent}</span></div>
                  <div><span>Gluten Free: </span><span>{this.state.kegs[i].isGlutenFree ? 'Yes' : 'No'}</span></div>
                  <div><span>Vegan: </span><span>{this.state.kegs[i].isVegan ? 'Yes' : 'No'}</span></div>
                  <br />
                  <div><span>Pints Remaining: </span><span>{this.state.kegs[i].pintsRemaining}</span></div>
                  {this.state.kegs[i].pintsRemaining > 1 && this.state.kegs[i].pintsRemaining < 10 ? <div className='warning'>Almost Emtpy</div> : ''}
                  {this.state.kegs[i].pintsRemaining <= 0 ? <div className='warning'>Out of Stock</div> : ''}
                  <br />
                  <button onClick={this.handleClickBackFromDetail} id={this.state.kegs[i].key}>Back</button>
                  <button onClick={this.handleClickEditKeg} id={this.state.kegs[i].key}>Edit</button>
                </React.Fragment>
                :
                /* Render the Keg in NORMAL MODE */
                <React.Fragment>
                  <div className='keg-name'>{this.state.kegs[i].kegName}</div>
                  <hr />
                  <div><span>Price per Pint: </span><span className='keg-price'>{this.state.kegs[i].pricePerPint}</span></div>
                  <br />
                  <div><span>Pints Remaining: </span><span>{this.state.kegs[i].pintsRemaining}</span></div>
                  {this.state.kegs[i].pintsRemaining > 0 && this.state.kegs[i].pintsRemaining < 10 ? <div className='warning'>Almost Emtpy</div> : ''}
                  {this.state.kegs[i].pintsRemaining <= 0 ? <div className='warning'>Out of Stock</div> : ''}
                  <br />
                  <button onClick={() => {
                    this.handleClickPurchasePint(1, this.state.kegs[i].key);
                  }} id={this.state.kegs[i].key}>Purchase Pint</button>
                  <button onClick={this.handleClickShowDetail} id={this.state.kegs[i].key}>Details</button>
                  <button onClick={this.handleClickEditKeg} id={this.state.kegs[i].key}>Edit</button>
                </React.Fragment>
          }
        </Keg >
      )
    }

    return (
      <div className="KegList">
        <div className='add-keg-outer'>
          <div className='add-keg-inner'>
            <button onClick={this.handleClickAddKeg}>Add Keg</button>
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

export default KegList;