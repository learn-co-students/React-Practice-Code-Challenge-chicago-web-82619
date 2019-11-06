import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {
  const sushiComponent = props.sushis.map(sushi => {
    return <Sushi sushi={sushi} handleEaten={props.handleEaten}/>
  })
  
  return (
    <Fragment>
      <div className="belt">
        {
          sushiComponent
        }
        <MoreButton handleShowMore={props.handleShowMore} />
      </div>
    </Fragment>
  )
}

export default SushiContainer