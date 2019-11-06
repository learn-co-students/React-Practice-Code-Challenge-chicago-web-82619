import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  state = {
    sushis: [],
    page: 0,
    budget: 100,
    plates: 0
  }

  componentDidMount(){
    fetch(API)
      .then(resp => resp.json())
      .then(data => {
        const updated = data.map(sushi => {
          return {...sushi, isEaten: false}
        })
        this.setState({sushis: updated})
      })
  }

  handleButton = () => {
    this.setState(prevState =>({
      page: prevState.page + 1
    }))
  }

  handleEaten = (selectedSushi) => {
    if(this.state.budget < selectedSushi.price || selectedSushi.isEaten){
      return
    }

    const updatedSushis = this.state.sushis.map(sushi => {
      if(sushi.id === selectedSushi.id){
        return {
          ...sushi,
          isEaten: true
        }
      } else {
          return sushi
      }
    })

    this.setState(prevState => ({
      sushis: updatedSushis,
      budget: prevState.budget - selectedSushi.price,
      plates: prevState.plates + 1
    }))
    
  }

  render() {
    const fourSushi = this.state.sushis.slice(this.state.page * 4, (this.state.page * 4 + 4))
    return (
      <div className="app">
        <SushiContainer  fourSushi={fourSushi} handleButton={this.handleButton} handleEaten={this.handleEaten}/>
        <Table budget={this.state.budget} plates={this.state.plates}/>
      </div>
    );
  }
}

export default App;