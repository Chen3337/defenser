import React, { Component } from 'react';


class App extends Component {
  state = {
    isLandscape: window.orientation
  }
  componentDidMount() {
    window.addEventListener("orientationchange", () => {
      this.setState({
        isLandscape: window.orientation
      })
    });
  }
  render() {
    console.log(this.state.isLandscape);
    return (
      <div>
        {Math.abs(this.state.isLandscape) === 90
          ? <h2>{this.state.isLandscape} Landscape</h2>
          : <h2>{this.state.isLandscape} not Landscape</h2>
        }
      </div>
    )
  }
}

export default App;
