import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = ({sushis, handleShowMore, handleEaten}) => {
  const sushi = sushis.map(sushi => {
    return (
      <Sushi sushi={sushi} key={sushi.id} handleEaten={handleEaten}/>
    )
  })
  
  return (
  <Fragment>
    <div className="belt">
      {sushi}
      <MoreButton handleShowMore={handleShowMore}/>
    </div>
  </Fragment>
  )
}

export default SushiContainer