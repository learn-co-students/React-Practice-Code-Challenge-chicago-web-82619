import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  constructor(props) {
    super(props),
    this.state = {
      sushis: [],
      start: 0,
      budget: 100,
      plates: 0
    }
  }

  async componentDidMount() {
    let data = await fetch(API)
    let sushis = await data.json()
    const sushiData = sushis.map(sushi => {
      return {...sushi, eaten: false}
    })
    this.setState({
      sushis: sushiData
    })
  }

  handleShowMore = () => {
    this.setState((prevState) => {
      return({start: prevState.start + 4})
    })
  }

  handleEaten = (sushi) => {
    if(this.state.budget < sushi.price || sushi.eaten === true) {
      return 
    }
    let newArray = this.state.sushis.map(sushis => {
      if (sushi.id === sushis.id) {
        return {
          ...sushi, 
          eaten: true,         
        }
      } else {
        return sushis
      }
    }) 
    this.setState((prevState) => {
      return({
        sushis: newArray,
        budget: prevState.budget - sushi.price,
        plates: prevState.plates + 1
      })
    })
  }


  render() {
    return (
      <div className="app">
        <SushiContainer 
        sushis={this.state.sushis.slice(this.state.start, this.state.start+4)}
        handleShowMore={this.handleShowMore}
        handleEaten={this.handleEaten}/>
        <Table budget={this.state.budget} plates={this.state.plates}/>
      </div>
    );
  }
}

export default App;