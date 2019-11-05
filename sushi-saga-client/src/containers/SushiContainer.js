import React, { Component, Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

class SushiContainer extends Component {
  state = {
    start: 0,
    end: 4
  }

  moreSushi = () => {
    this.setState(prevState => ({
      start: prevState.start + 4,
      end: prevState.end + 4
    }))
  }

  render() {
    console.log(this.props)

     const fourSushis = this.props.sushis.slice(this.state.start, this.state.end).map(sushi => {
       return <Sushi sushi={sushi} key={sushi.id} id={sushi.id} handleEatSushi={this.props.handleEatSushi} />
     })


    return (
      <Fragment>
        <div className="belt">
          {fourSushis}
          <MoreButton moreSushi={this.moreSushi}/>
        </div>
      </Fragment>
    )
  }
}

export default SushiContainer
