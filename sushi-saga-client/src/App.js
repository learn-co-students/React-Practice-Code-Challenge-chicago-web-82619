import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  state = {
    money: 100,
    sushis: [],
    eatenSushis: []
  }

  componentDidMount() {
    fetch(API)
      .then(resp => resp.json())
      .then(sushisData =>
        this.setState({
          sushis: [...sushisData]
        })
      )
  }

  handleEatSushi = (sushiObj) => {
    console.log(sushiObj)
    if (!this.state.eatenSushis.includes(sushiObj)) {
      this.setState(prevState => {
        return {
          eatenSushis: [...this.state.eatenSushis, sushiObj],
          money: prevState.money - sushiObj.price
        }
      })
    }
  }

  render() {
    return (
      <div className="app">
        <SushiContainer sushis={this.state.sushis} handleEatSushi={this.handleEatSushi}/>
        <Table eatenSushis={this.state.eatenSushis} money={this.state.money} />
      </div>
    );
  }
}

export default App;
