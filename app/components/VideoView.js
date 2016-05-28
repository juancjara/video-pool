import React, { Component } from 'react';

import VideoPlayer from './VideoPlayer';
import VideoList from './VideoList';
// import FixVideoIndex from './FixVideoIndex';

const sortVideos = (videos, actualIndex) => {
  console.log(videos.length, actualIndex);
  if (actualIndex === videos.length) {
    return videos;
  }
  const groupedVideos = _(videos.slice(actualIndex))
        .sortBy('user')
        .groupBy('user')
        .values()
        .value();

  const distributedVideos = _(_.zip(...groupedVideos))
    .flatten()
    .filter(e => e)
    .value();

  return [
    ...videos.slice(0, actualIndex),
    ...distributedVideos
  ];
};
// var data = [
//   {
//     url: 'asdf',
//     user: 'c',
//   },
//   {
//     url: 'asdf',
//     user: 'b',
//   },
//   {
//     url: 'abb',
//     user: 'b',
//   },
//   {
//     url: 'asdf',
//     user: 'a',
//   },
//   {
//     url: 'asdf',
//     user: 'a',
//   },
//   {
//     url: 'asdf',
//     user: 'c',
//   },
//   {
//     url: 'asdf',
//     user: 'c',
//   },
//   {
//     url: 'asdf',
//     user: 'b',
//   },
// ];

// console.table(sortVideos(data, 0));
// sortVideos(data, 0);

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
        currentVideoIndex,
        videos,
      } = this.state;
      videos.push(snapshot.val());
      console.log(currentVideoIndex, 'index');
      this.setState({ videos: sortVideos(videos, currentVideoIndex) });
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
