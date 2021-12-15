import React, { createContext } from 'react';

export const UserInfoContext = createContext();

class UserInfoContextProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      whoIs: 'savior',
      isAlive: true,
      whyAnon: 'too many stupids',
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({target}) {
    const { name, value } = target;
    console.log(name, value)
    this.setState({
      ...this.state,
      [name]: value,
    })
  }

  render() {
    const valueObj = {
      ...this.state,
      handleChange: this.handleChange,
    }
    return (
      <UserInfoContext.Provider value={valueObj}>
        {this.props.children}
      </UserInfoContext.Provider>
    );
  }
}
 
export default UserInfoContextProvider;