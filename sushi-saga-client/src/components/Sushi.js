// import React, { Fragment } from 'react'
import React from 'react'

const Sushi = ({sushi, handleEaten}) => {
  return (
    <div className="sushi">
      <div className="plate" 
           onClick={() => handleEaten(sushi)}>
        { 
          sushi.eaten
          ?
            null
          :
            <img src={sushi.img_url} width="100%" alt={sushi.name}/>
        }
      </div>
      <h4 className="sushi-details">
        {sushi.name} - ${sushi.price}
      </h4>
    </div>
  )
}

export default Sushi