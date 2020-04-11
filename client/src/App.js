import React, { Component } from 'react';
import Gamerouter from './components/router';
class App extends Component {
  state = {
    isLandscape: 90,
  }
  componentDidMount() {
    window.addEventListener("resize", () => {
      window.location.reload();
      this.checkIfLandscape();
    })
    window.addEventListener("orientationchange", () => {
      this.checkIfLandscape();
    });
    this.checkIfLandscape();
  }
  checkIfLandscape = () => {
    if ((window.innerWidth - 100) > window.innerHeight) {
      if (this.state.isLandscape !== 90) {
        window.location.href = '/';
        this.setState({
          isLandscape: 90
        });
      }
    }
    else {
      this.setState({
        isLandscape: 0
      })
    }
  }
  render() {
    return (
      <div>
        {this.state.isLandscape === 90
          ? <Gamerouter />
          : <h2>rotate the screen (landscape) or make the width of the screen larger than the height to begain
             <br />
            <br />
              If on phone add this to home screen for better experience (fullscreen)
              <br />
            <br />
            If on PC f11 for fullscreen</h2>
        }
      </div>
    )
  }
}

export default App;
