import React, { Component } from "react";
import { formatPrice } from "../helpers";


export default class Order extends Component {
  // offload some work in the render if it starts getting messy
  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === 'available';
    // make sure the fish is loaded from firebase before returning
   if (!fish) return null;

    if(!isAvailable){
      return <li key={key}>{fish ? fish.name : 'fish' } is no longer available</li>
    }
    return <li key={key}>
      {count} lbs {fish.name} {' '}
      { formatPrice(count * fish.price)}
    </li>;
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === "available";

      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order">
        <h2>Order</h2>
        <div className="total">
          Total:
          <strong> {formatPrice(total)}</strong>
        </div>
        <ul className="order">{orderIds.map(this.renderOrder)}</ul>

      </div>
    );
  }
}
