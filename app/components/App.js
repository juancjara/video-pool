import React, { Component } from 'react';
import YouTube from 'react-youtube';

const FINISHED = 0;

const getUrlVideoId = url => url.match(/.*v\=([^\s&]*)/)[1];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentVideoId: '2g811Eo7K8U',
      videosUrls: ['https://www.youtube.com/watch?v=mWRsgZuwf_8',
                   'https://www.youtube.com/watch?v=szj59j0hz_4'],
      currentVideoIndex: 0,
    };
    this.playerState = FINISHED;
    this._onStateChange = this._onStateChange.bind(this);
  }

  componentDidMount() {
    console.log('mounted');
  }

  _nextSong() {
    const {
      currentVideoIndex,
      videosUrls,
    } = this.state;

    if (currentVideoIndex < videosUrls.length) {
      this.setState({
        currentVideoId: getUrlVideoId(videosUrls[currentVideoIndex]),
        currentVideoIndex: currentVideoIndex + 1,
      });
    }
  }

  _onStateChange(e) {
    if (FINISHED === e.target.getPlayerState()) {
      this._nextSong();
    }
  }

  render() {
    const {
      currentVideoId,
    } = this.state;

    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1
      }
    };

    return (
      <div>
        {
          currentVideoId && (
            <YouTube
              videoId={currentVideoId}
              opts={opts}
              onReady={this._onReady}
              onStateChange={this._onStateChange}
            />
          )
        }
      </div>
    );
  }
}

export default App;
