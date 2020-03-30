import React, { Component } from 'react';


class App extends Component {
  state = {
    isLandscape: window.screen.orientation.type
  }
  componentDidMount() {
    window.screen.orientation.addEventListener('change', () => {
      this.setState({
        isLandscape: window.screen.orientation.type
      })
    });
  }
  render() {

    return (
      <div>
        {this.state.isLandscape.charAt(0) === "l"
        ? <h2>{this.state.isLandscape}</h2>
        : <h2>{this.state.isLandscape} not Landscape</h2>
      }
      </div>
    )
  }
}

export default App;
