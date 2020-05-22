import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import Keg from '../Keg/Keg';
import Edit from '../Edit/Edit';
import Info from '../Info/Info';
import { addItem, updateItem, deleteItem, enterEdit, leaveEdit } from '../../actions';
import './KegList.scss';

class KegList extends React.Component {

  componentDidMount() {
    this.props.kegData.kegs.forEach(keg => {
      const key = v4();
      this.props.addItem(
        key,
        keg.name,
        keg.brand,
        keg.pricePerPint,
        keg.alcoholContent,
        keg.pintsRemaining,
        keg.isGlutenFree,
        keg.isVegan
      );
    });
  }

  /* onClickPurchasePint - decrement remaining pints when a pint is purchased */
  onClickPurchasePint = (key) => {
    const keg = this.props.kegs.filter(keg => keg.key === key)[0];
    let pintsRemaining = keg.pintsRemaining - 1;
    if (pintsRemaining < 1) { pintsRemaining = 0 }
    this.props.updateItem(
      key,
      keg.name,
      keg.brand,
      keg.pricePerPint,
      keg.alcoholContent,
      pintsRemaining,
      keg.isGlutenFree,
      keg.isVegan
    );
  }

  /* onClickEditKeg - set the item being edited when the Keg's Edit button is clicked */
  onClickEditKeg = event => { this.props.enterEdit(event.target.id); }

  /* onClickAddKeg - create a new Keg at the top of the list and in Edit mode when the Add Keg button is clicked */
  onClickAddKeg = () => {
    const key = v4();
    this.props.addItem(key, '', '', 0.00, 0.0, 124, false, false);
    this.props.enterEdit(key);
  }

  /* onClickDeleteKeg - delete a Keg when the Delete button on the Edit screen is clicked */
  onClickDeleteKeg = event => {
    this.props.deleteItem(event.target.id);
    this.props.leaveEdit();
  }

  /* onClickSaveKeg - Update the record for the Keg that was just edited when the Save button is clicked */
  onClickSaveKeg = event => {
    let keg = event.target;
    this.props.updateItem(
      keg.id, keg.name.value === '' ? 'Nameless One' : keg.name.value,
      keg.brand.value,
      keg.price.value,
      keg.alcohol.value,
      keg.pints.value,
      keg.gluten.value.toLowerCase() === 'yes',
      keg.vegan.value.toLowerCase() === 'yes'
    );
    this.props.leaveEdit();
  }

  render() {
    return (
      < div className="KegList" >
        <div className='add-keg-outer'>
          <div className='add-keg-inner'>
            <button onClick={this.onClickAddKeg}>Add Keg</button>
          </div>
        </div>
        <div className='flexbox'>{this.props.kegs.map(keg =>
          <Keg key={keg.key}>{this.props.edit.key === keg.key ?
            <Edit keg={keg} onSubmit={this.onClickSaveKeg} onDelete={this.onClickDeleteKeg} /> :
            <Info keg={keg} onPurchase={this.onClickPurchasePint} onEdit={this.onClickEditKeg} />}
          </Keg >)}
        </div>
      </div >
    );
  }
}

KegList.propTypes = {
  kegData: PropTypes.object
}

const mapStateToProps = state => {
  return { kegs: state.kegReducer, edit: state.editReducer }
}

KegList = connect(
  mapStateToProps,
  { addItem, updateItem, deleteItem, enterEdit, leaveEdit }
)(KegList);

export default KegList;