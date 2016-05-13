import React, { Component } from 'react';
import Firebase from 'firebase';

import VideoView from './VideoView';
import SubmitVideo from './SubmitVideo';

// @TODO
//eslint preloader
//chunk load react
//remove .. using webpack
//babel: spread, and the other thing, for static types
//flow maybe
//redux
//raw sockets some day
//users
//playlists
//lodash webpack optimization

// const videosRef = new Firebase('https://video-pool.firebaseio.com/videos');

// 'https://www.youtube.com/watch?v=mWRsgZuwf_8',
// 'https://www.youtube.com/watch?v=szj59j0hz_4'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      view: 0,
    };
  }

  renderView() {
    switch(this.state.view) {
      case 0:
        return <SubmitVideo />;
      default:
        return <VideoView />;
    }
  }

  switchView(view) {
    this.setState({ view });
  }

  render() {
    return (
      <div>
        <nav>
          <a onClick={() => this.switchView(1)}>VideoPlayer</a>
        </nav>
        {this.renderView()}
      </div>
    );
  }

}

export default App;
