import React, { Component } from 'react';

import VideoPlayer from './VideoPlayer';
import VideoList from './VideoList';
// import FixVideoIndex from './FixVideoIndex';

class VideoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      currentVideoIndex: 0,
    };

    //review this
    this.incVideoIndex = this.incVideoIndex.bind(this);
    this.setIndex = this.setIndex.bind(this);

  }

  incVideoIndex() {
    this.setState({
      currentVideoIndex: this.state.currentVideoIndex + 1
    });
  }

  componentDidMount() {
    const videosRef = new Firebase('https://video-pool.firebaseio.com/videos');
    videosRef.on('child_added', (snapshot) => {
      console.log(snapshot.val().url);
      const {
        videos,
      } = this.state;
      videos.push(snapshot.val().url);
      this.setState({ videos });
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

export default VideoView;
