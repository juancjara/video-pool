import React, { Component } from 'react';
import YouTube from 'react-youtube';

const FINISHED = 0;
const PLAYING = 9;

const getUrlVideoId = url => url.match(/.*v\=([^\s&]*)/)[1];

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVideoId: null,
    };

    this.onStateChange = this.onStateChange.bind(this);
    this.playerState = FINISHED;
  }

  componentDidMount() {
    this.nextSong();
  }

  componentWillReceiveProps(nextProps) {
    this.nextSong();
  }

  nextSong() {
    const {
      videos,
      incIndex,
      currentVideoIndex,
    } = this.props;

    if (this.playerState === FINISHED && videos.length > 0 &&
        currentVideoIndex < videos.length) {
      this.playerState = PLAYING;
      this.setState({
        currentVideoId: getUrlVideoId(videos[currentVideoIndex]),
      });
      incIndex();
    }
  }

  onStateChange(e) {
    if (FINISHED === e.target.getPlayerState()) {
      this.playerState = FINISHED;
      this.nextSong();
    }
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1
      }
    };

    return (
      <div>
        <YouTube
          videoId={this.state.currentVideoId}
          opts={opts}
          onStateChange={this.onStateChange}
        />
      </div>
    );
  }
}

export default VideoPlayer;
