import * as React from 'react';

import logo from './logo.svg';
import './App.css';

import '@progress/kendo-theme-default';
import './kendo-vanilla-ui/button'

class CustomComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
    this.increment = this.increment.bind(this);
  }
  
  increment(event) {
    this.setState({count: this.state.count+1});
  }
  
  render() {
    return (
    	<div>
        <kendo-web-button text={this.state.count} onClick={this.increment}></kendo-web-button>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <CustomComponent />
    </div>
  );
}

export default App;
