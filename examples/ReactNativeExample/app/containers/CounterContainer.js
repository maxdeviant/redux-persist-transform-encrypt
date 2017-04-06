import React, { Component } from 'react';
import { connect } from 'react-redux';
import Counter from '../components/Counter';

class CounterContainer extends Component {
  render() {
    const { value, onIncrement, onDecrement } = this.props;
    return (
      <Counter
        value={value}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
    );
  }
}

export default connect(
  state => ({
    value: state.count
  }),
  dispatch => ({
    onIncrement: () => dispatch({ type: 'INCREMENT' }),
    onDecrement: () => dispatch({ type: 'DECREMENT' })
  })
)(CounterContainer);
