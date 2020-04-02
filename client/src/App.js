import React, { Component } from 'react';
import Router from './components/router';
class App extends Component {
  state = {
    isLandscape: window.orientation
  }
  componentDidMount() {
    // if (!window.orientation) {
      if ((window.innerWidth - 100) > window.innerHeight) {
        this.setState({
          isLandscape: 90
        });
      }
      window.addEventListener("resize", () => {
        if ((window.innerWidth - 100) > window.innerHeight) {
          this.setState({
            isLandscape: 90
          });
        }
        else {
          this.setState({
            isLandscape: 0
          })
        }
      })
    // }
    // else {
    //   window.addEventListener("orientationchange", () => {
    //     this.setState({
    //       isLandscape: window.orientation
    //     })
    //   });
    // }

  }
  render() {
    return (
      <div>
        {Math.abs(this.state.isLandscape) === 90
          ? <Router />
          : <h2>rotate the screen or make the width of the screen larger than the height to begain</h2>
        }
      </div>
    )
  }
}

export default App;
