import React, { Component } from "react";

const AssetsContext = React.createContext({});
export const AssetsConsumer = AssetsContext.Consumer;

class AssetsProvider extends Component {
  state = {
    username: "Crunchy Crunch",
    dateJoined: "9/1/18",
    membershipLevel: "Silver"
  };

  render() {
    return (
      // value prop is where we define what values
      // that are accessible to consumer components
      <AssetsContext.Provider value={this.state}>
        {this.props.children}
      </AssetsContext.Provider>
    );
  }
}
export default AssetsProvider;
