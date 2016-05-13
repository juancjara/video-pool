import React, { Component } from 'react';
import Firebase from 'firebase';

import VideoPlayer from './VideoPlayer';
import VideoList from './VideoList';
import FixVideoIndex from './FixVideoIndex';
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

const videosRef = new Firebase('https://video-pool.firebaseio.com/videos');

// 'https://www.youtube.com/watch?v=mWRsgZuwf_8',
// 'https://www.youtube.com/watch?v=szj59j0hz_4'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      currentVideoIndex: 0,
    };

    //review this
    this.incVideoIndex = this.incVideoIndex.bind(this);
    this.setIndex = this.setIndex.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    videosRef.on('child_added', (snapshot) => {
      console.log(snapshot.val().url);
      const {
        videos,
      } = this.state;
      videos.push(snapshot.val().url);
      this.setState({ videos });
    });
  }

  submit(url) {
    videosRef.push({ url });
  }

  incVideoIndex() {
    this.setState({
      currentVideoIndex: this.state.currentVideoIndex + 1
    });
  }

  setIndex(newIndex) {
    this.setState({
      currentVideoIndex: newIndex
    });
  }

  render() {
    const {
      currentVideoIndex,
    } = this.state;

    return (
      <div>
        <SubmitVideo
          submit={this.submit}
        />
        <FixVideoIndex
          setIndex={this.setIndex}
        />
        <VideoPlayer
          videos={this.state.videos}
          currentVideoIndex={currentVideoIndex}
          incIndex={this.incVideoIndex}
        />
        <VideoList
          currentVideoIndex={currentVideoIndex}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

export default App;
