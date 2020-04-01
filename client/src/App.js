import React, { Component } from 'react';
class App extends Component {
  state = {
    isLandscape: window.orientation
  }
  componentDidMount() {
    if (!window.orientation) {
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
    }
    else {
      window.addEventListener("orientationchange", () => {
        this.setState({
          isLandscape: window.orientation
        })
      });
    }
    
    window.screen.orientation.lock('landscape').then((res)=>{console.log(res)}).catch((res)=>{console.log(res)})
    screen.orientation.lock('landscape').then((res)=>{console.log(res)}).catch((res)=>{console.log(res)})
    window.orientation.lock(90);
  }
  render() {
    return (
      <div>
        {Math.abs(this.state.isLandscape) === 90
          ? <h2>{this.state.isLandscape} Landscape test</h2>
          : <h2>{this.state.isLandscape} not Landscape test</h2>
        }
      </div>
    )
  }
}

export default App;
