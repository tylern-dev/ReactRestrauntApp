import React from "react";
import PropTypes from 'prop-types';
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes"
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { params } = this.props.match
    // first reinstate our local storage. On refresh, the local storage disappears.
    const localStorageRef = localStorage.getItem(params.storeId)
    console.log(localStorageRef)
    if(localStorageRef){
      this.setState({ order: JSON.parse(localStorageRef)})
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  componentDidUpdate() {
    const { params } = this.props.match
    console.log(this.state.order);
    console.log('Updated!')
    localStorage.setItem(`${params.storeId}`, JSON.stringify(this.state.order));
  }

  //clean up any memory issues that may happen from going back and forth on pages
  componentWillUnmount() {
    console.log('unmounting')
    base.removeBinding(this.ref)
  }

  addFish = fish => {
    // 1. Take a copy of the existing state - never mutate state directly
    const fishes = { ...this.state.fishes }; //object spread
    // 2. Add new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Place the fishes object into state
    this.setState({
      fishes: fishes
    });
  };

  updateFish = (key, updatedFish) => {
    // 1. take a copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. update the state
    fishes[key] = updatedFish;
    // 3. Set that to state
    this.setState({ fishes: fishes })
  }

  deleteFish = (key) => {
    // 1. take copy of state
    const fishes = {...this.state.fishes};
    // 2. update the state
    fishes[key] = null;
    // 3. update state
    this.setState({ fishes: fishes})
  }

  loadSampleFishes = (event) => {
    event.preventDefault();
    this.setState({ fishes: sampleFishes })
  }

  addToOrder = key =>{
    // 1. Take a copy of state
    const order = {...this.state.order};
    // 2. Either add to order or update the number
    order[key] = order[key]+1 || 1
    // 3. call set state to update
    this.setState({ order: order });
  }

  removeFromOrder = key => {
    console.log(key)
    // 1. take a copy
    const order = {...this.state.order};
    // 2. Remove that item from order
    delete order[key];
    // 3. Call setstate to update our state object
    this.setState({ order: order })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="fresh seafood market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
        <Inventory addFish={this.addFish} updateFish={this.updateFish} deleteFish={this.deleteFish} loadSampleFishes={this.loadSampleFishes} fishes={this.state.fishes}/>
      </div>
    );
  }
}

export default App;
