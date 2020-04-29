import React from 'react';
import { v4 } from 'uuid';
import Keg from '../Keg/Keg';
import data from '../../data.json';
import './KegList.scss';

class KegList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kegs: data.kegs,
      kegInEditState: null,
      kegInShowDetailState: null
    };
    this.state.kegs.forEach(keg => {
      keg.key = v4();
    });
  }

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

  handleClickEditKeg = event => {
    this.setState({ kegInEditState: event.target.id });
  }

  handleClickAddKeg = event => {
    let newKegs = this.state.kegs
    const key = v4();
    let newKeg = { kegName: '', brand: '', pintsRemaining: 124, pricePerPint: 0.00, alcoholContent: 0.0, glutenStatus: false, veganStatus: false, key: key };
    newKegs.unshift(newKeg);
    this.setState({ kegInEditState: key, kegs: newKegs });
  }

  handleClickDeleteKeg = event => {
    const kegs = this.state.kegs;
    const filteredKegs = kegs.filter(keg => keg.key !== event.target.id)
    this.setState({ kegs: filteredKegs });
  }

  handleClickSaveKeg = (kegName, brand, price, alcoholContent, glutenStatus, veganStatus, pintsRemaining, key) => {
    const kegs = this.state.kegs;
    let newKegs = kegs.map(keg => {
      if (keg.key === key) {
        let newKeg = keg;
        newKeg.pintsRemaining = pintsRemaining >= 0 ? pintsRemaining : 0;
        newKeg.kegName = kegName;
        newKeg.brand = brand;
        newKeg.pricePerPint = price;
        newKeg.alcoholContent = alcoholContent;
        newKeg.glutenStatus = glutenStatus;
        newKeg.veganStatus = veganStatus;
        return newKeg;
      }
      else return keg;
    });
    this.setState({ kegInEditState: null, kegs: newKegs });
  }

  handleClickShowDetail = event => {
    this.setState({ kegInShowDetailState: event.target.id });
  }

  handleClickBackFromDetail = event => {
    this.setState({ kegInShowDetailState: null });
  }

  render() {
    let kegsUI = [];
    for (let i = 0; i < this.state.kegs.length; i++) {
      kegsUI.push(
        <Keg key={this.state.kegs[i].key}>
          {
            this.state.kegInEditState && this.state.kegInEditState === this.state.kegs[i].key ?
              /* Render the Keg in Edit state */
              <React.Fragment>
                <div><span>Name: </span><input id='keg-name' defaultValue={this.state.kegs[i].kegName}></input></div>
                <div><span>Brand: </span><input id='keg-brand' defaultValue={this.state.kegs[i].brand}></input></div>
                <div><span>Price per Pint: </span><input id='keg-price' defaultValue={this.state.kegs[i].pricePerPint}></input></div>
                <div><span>Alcohol Content: </span><input id='keg-alcohol' defaultValue={this.state.kegs[i].alcoholContent}></input></div>
                <div><span>Gluten Free: </span><input id='keg-gluten' defaultValue={this.state.kegs[i].isGlutenFree ? 'Yes' : 'No'}></input></div>
                <div><span>Vegan: </span><input id='keg-vegan' defaultValue={this.state.kegs[i].isVegan ? 'Yes' : 'No'}></input></div>
                <div><span>Pints Remaining: </span><input id='keg-pints' defaultValue={this.state.kegs[i].pintsRemaining}></input></div>
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
                      this.state.kegs[i].key)
                  }>Save</button>
                </div>
                <div><button onClick={this.handleClickDeleteKeg} id={this.state.kegs[i].key}>Delete</button></div>
              </React.Fragment>
              :
              this.state.kegInShowDetailState && this.state.kegInShowDetailState === this.state.kegs[i].key ?
                /* Render the Keg in Show Detail state */
                <React.Fragment>
                  <div><span>Name: </span><span>{this.state.kegs[i].kegName}</span></div>
                  <div><span>Brand: </span><span>{this.state.kegs[i].brand}</span></div>
                  <div><span>Price per Pint: </span><span>{this.state.kegs[i].pricePerPint}</span></div>
                  <div><span>Alcohol Content: </span><span>{this.state.kegs[i].alcoholContent}</span></div>
                  <div><span>Gluten Free: </span><span>{this.state.kegs[i].isGlutenFree ? 'Yes' : 'No'}</span></div>
                  <div><span>Vegan: </span><span>{this.state.kegs[i].isVegan ? 'Yes' : 'No'}</span></div>
                  <br />
                  <div><span>Pints Remaining: </span><span>{this.state.kegs[i].pintsRemaining}</span></div>
                  <br />
                  <button onClick={this.handleClickBackFromDetail} id={this.state.kegs[i].key}>Back</button>
                  <button onClick={this.handleClickEditKeg} id={this.state.kegs[i].key}>Edit</button>
                </React.Fragment>
                :
                /* Render the Keg in Normal state */
                <React.Fragment>
                  <div><span>Name: </span><span>{this.state.kegs[i].kegName}</span></div>
                  <div><span>Price per Pint: </span><span>{this.state.kegs[i].pricePerPint}</span></div>
                  <br />
                  <div><span>Pints Remaining: </span><span>{this.state.kegs[i].pintsRemaining}</span></div>
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
        <div className='flexbox'>
          {kegsUI}
        </div>
      </div>
    );
  }
}

export default KegList;