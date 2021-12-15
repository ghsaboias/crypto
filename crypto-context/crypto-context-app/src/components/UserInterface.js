import React from 'react';
import { UserInfoContext } from '../contexts/UserInfoContext';

class UserInterface extends React.Component {
  render() {
    const { handleChange } = this.context;
    return (
      <header>
        <h2>Satoshi Nakamoto, in your opinion</h2>
        <form>
          <input
            type="text"
            placeholder="Who is?"
            onChange={handleChange}
            name="whoIs"
          />
          <section>
            <h3>Is he alive?</h3>
            <label htmlFor="yes">Yes
              <input
                type="radio"
                className="radio"
                onChange={handleChange}
                name="isAlive"
                value="true"
              />
            </label>
            <label htmlFor="no">No
              <input
                type="radio"
                className="radio"
                onChange={handleChange}
                name="isAlive"
                value="false"
              />
            </label>
          </section>
          <input
            type="text"
            placeholder="Why anonymous?"
            onChange={handleChange}
            name="whyAnon"
          />
        </form>
      </header>
    )
  }
}

UserInterface.contextType = UserInfoContext;
 
export default UserInterface;