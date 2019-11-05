import React, { Component } from 'react'

class Sushi extends Component {
  constructor(props) {
    super(props)
    this.state ={
      eaten: true
    }
  }

  toggleEaten = () => {
    this.setState((prevState) => {
      return {
        eaten: false
      }
    })
  }

  render() {
    const { id, name, img_url, price } = this.props.sushi
    return (
      <div className="sushi" onClick={this.toggleEaten}>
        <div className="plate"
             onClick={() => this.props.handleEatSushi(this.props.sushi)}>
          { !this.state.eaten ?
              null
            :
              <img src={img_url} width="100%" />
          }
        </div>
        <h4 className="sushi-details">
          {name} - ${price}
        </h4>
      </div>
    )
  }
}

export default Sushi
