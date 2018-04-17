import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// this function lives in a helper file
import { getFunName } from '../helpers';

class StorePicker extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }
  // selecting the input from the input form field
  myInput = React.createRef();

  goToStore = (event) => {
    // stop form from submitting
    event.preventDefault();
    // get the text from the input
    const store = this.myInput.value.value
    //change the page to /store/Whatever-they-enter
    this.props.history.push(`/store/${store}`)


  }

  render() {
    return (

      <Fragment>
        <form className="store-selector" onSubmit={this.goToStore}>
          <h2>Please enter a store</h2>
          <input
            type="text"
            ref={this.myInput}
            required placeholder="Store Name"
            defaultValue={getFunName()}
          />
          <button type="submit">Visit Store</button>
        </form>
      </Fragment>

    )
  }
}

export default StorePicker;