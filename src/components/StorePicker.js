import React, { Component, Fragment } from 'react';

// this function lives in a helper file
import { getFunName } from '../helpers';

class StorePicker extends Component {
  render() {
    return (

      <Fragment>
        <form className="store-selector">
          <h2>Please enter a store</h2>
          <input type="text" required placeholder="Store Name" defaultValue={getFunName()} />
          <button type="submit">Visit Store</button>
        </form>
      </Fragment>

    )
  }
}

export default StorePicker;