import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  state = {
    error: null,
    isLoaded: false,
    sushis: [],
    start: 0,
    budget: 300,
    plates: 0
  }

  componentDidMount() {
    fetch(API)
      .then(resp => resp.json())
      .then(sushis => {
        const newSushis = sushis.map(sushi => Object.assign({}, sushi, { eaten: false }))
        this.setState({
          isLoaded: true,
          sushis: newSushis
        })
      },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  handleShowMore = () => {
    if (this.state.start < 96) {
      this.setState(prevState => {
        return {
          start: prevState.start + 4
        }
      })
    } else {
      console.log("in else")
      this.setState({
        start: 0
      })
    }
    

  }

  handleEaten = (selectedSushi) => {
    if (this.state.budget < selectedSushi.price || selectedSushi.eaten) {
      return
    } else {
      const updatedSushis = this.state.sushis.map(sushi => {
        if (sushi.id === selectedSushi.id) {
          return {
            ...sushi,
            eaten: true
          }
        } else {
          return sushi
        }
      })

      this.setState(prevState => {
        return {
          sushis: updatedSushis,
          budget: prevState.budget - selectedSushi.price,
          plates: prevState.plates + 1
        }
      })
    }
  }

  render() {
    const { error, isLoaded } = this.state
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="app">
          <SushiContainer handleEaten={this.handleEaten} handleShowMore={this.handleShowMore} sushis={this.state.sushis.slice(this.state.start, this.state.start + 4)} />
          <Table budget={this.state.budget} plates={this.state.plates} />
        </div>
      );
    }
  }
}

export default App;