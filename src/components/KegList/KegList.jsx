import React from 'react';
import { v4 } from 'uuid';
import Keg from '../Keg/Keg';
import data from '../../data.json';
import './KegList.scss';

class KegList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kegs: data.kegs
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
        return newKeg;
      }
      else return keg;
    });
    this.setState({ kegs: newKegs });
  }

  render() {
    let ui = [];
    for (let i = 0; i < this.state.kegs.length; i++) {
      ui.push(
        <Keg key={this.state.kegs[i].key}>
          <div><span>Name: </span><span>{this.state.kegs[i].name}</span></div>
          <div><span>Brand: </span><span>{this.state.kegs[i].brand}</span></div>
          <div><span>Price per Pint: </span><span>{this.state.kegs[i].pricePerPint}</span></div>
          <div><span>Alcohol Content: </span><span>{this.state.kegs[i].alcoholContent}</span></div>
          <div><span>Gluten Free: </span><span>{this.state.kegs[i].isGlutenFree ? 'Yes' : 'No'}</span></div>
          <div><span>Vegan: </span><span>{this.state.kegs[i].isVegan ? 'Yes' : 'No'}</span></div>
          <br />
          <div><span>Pints Remaining: </span><span>{this.state.kegs[i].pintsRemaining}</span></div>
          <br />
          <button onClick={() => {
            this.handleClickPurchasePint(1, this.state.kegs[i].key);
          }} id={this.state.kegs[i].key}>Purchase Pint</button>
        </Keg>
      )
    }

    return (
      < div className="KegList" >
        {ui}
      </div >
    );
  }
}

export default KegList;