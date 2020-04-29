import React from 'react';
import Keg from '../Keg/Keg';
import data from '../../data.json';
import './KegList.scss';

class KegList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kegs: data.kegs
    };
  }

  render() {

    let ui = [];
    for (let i = 0; i < this.state.kegs.length; i++) {
      ui.push(
        <Keg>
          <div><span>Name: </span><span>{this.state.kegs[i].name}</span></div>
          <div><span>Brand: </span><span>{this.state.kegs[i].brand}</span></div>
          <div><span>Price per Pint: </span><span>{this.state.kegs[i].pricePerPint}</span></div>
          <div><span>Alcohol Content: </span><span>{this.state.kegs[i].alcoholContent}</span></div>
          <div><span>Gluten Free: </span><span>{this.state.kegs[i].isGlutenFree ? 'Yes' : 'No'}</span></div>
          <div><span>Vegan: </span><span>{this.state.kegs[i].isVegan ? 'Yes' : 'No'}</span></div>
        </Keg>
      )
    }
    console.log(ui)
    return (
      < div className="KegList" >
        {ui}
      </div >
    );
  }

}

export default KegList;