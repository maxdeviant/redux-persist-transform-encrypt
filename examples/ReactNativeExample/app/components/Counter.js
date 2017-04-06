import React, { Component } from 'react';
import {
  Button,
  Text,
  View
} from 'react-native';

class Counter extends Component {
  incrementIfOdd = () => {
    if (this.props.value % 2 !== 0) {
      this.props.onIncrement();
    }
  }

  incrementAsync = () => {
    setTimeout(this.props.onIncrement, 1000);
  }

  render() {
    const { value, onIncrement, onDecrement } = this.props;
    return (
      <View>
        <Text>
          Clicked: {value} times
        </Text>
        <Button
          title='+'
          onPress={onIncrement}
        />
        <Button
          title='-'
          onPress={onDecrement}
        />
        <Button
          title='Increment if odd'
          onPress={this.incrementIfOdd}
        />
        <Button
          title='Increment async'
          onPress={this.incrementAsync}
        />
      </View>
    );
  }
}

export default Counter;
