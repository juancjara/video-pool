import React, { Component } from 'react';
import _ from 'lodash';

//fix this
const getColor = (index, currentVideoIndex) =>
  index === (currentVideoIndex - 1) ? 'green': 'black';

class VideoList extends Component {

  render() {
    const {
      videos,
      currentVideoIndex,
    } = this.props;

    return (
      <div>
        <ul>
        {
          _.map(videos, (url, i) => (
            <li
              key={i}
              style={{color: getColor(i, currentVideoIndex)}}
            >
              {url}
            </li>
          ))
        }
        </ul>
      </div>
    );
  }
}

export default VideoList;
