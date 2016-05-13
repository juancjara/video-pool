import React, { Component } from 'react';

class FixVideoIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: ''
    };

    this.onChange = this.onChange.bind(this);
    this.updateIndex = this.updateIndex.bind(this);
  }

  onChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  updateIndex() {
    // this.props.setIndex(this.state.index);
  }

  render() {
    return (
      <div>
        TODO
        <input
          type="text"
          name="index"
          value={this.state.index}
          onChange={this.onChange}
        />
        <button
          onClick={this.updateIndex}
        >
          Fix it
        </button>
      </div>
    );
  }
}

export default FixVideoIndex;
