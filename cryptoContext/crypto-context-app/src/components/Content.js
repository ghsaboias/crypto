import React from 'react';
import { UserInfoContext } from '../contexts/UserInfoContext';

class Content extends React.Component {
  render() {
    const { whoIs, isAlive, whyAnon } = this.context;
    return (
      <div className="content-container">
        <div className="item-container">
          <h3>Satoshi Nakamoto</h3>
          <p>Who is? {whoIs}</p>
          <p>Still alive? {isAlive === 'true' ? 'yes' : 'no'}</p>
          <p>Why anon? {whyAnon}</p>
        </div>
      </div>
    );
  }
}

Content.contextType = UserInfoContext;
 
export default Content;