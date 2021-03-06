import React, { Component } from 'react';

const videosRef = new Firebase('https://video-pool.firebaseio.com/videos');
let user = null;

class SubmitVideo extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.setRef = this.setRef.bind(this);
    user = new Date().getTime();
  }

  setRef(e) {
    this.el = e;
  }

  onClick() {
    videosRef.push({ url: this.el.value, user }, () => {
      alert('added');
      this.el.value = '';
    });
  }

  render() {
    return (
      <div>
        <input
          ref={this.setRef}
        />
        <button onClick={this.onClick}>
          Submit
        </button>
      </div>
    );
  }
}

export default SubmitVideo;
