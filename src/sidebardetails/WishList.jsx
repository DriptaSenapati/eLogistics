import React from 'react'
import { MCard } from '../MuiStyleOverrides';
import { animated } from '@react-spring/web'

const WishList = ({style}) => {
  const AnimatedCard = animated(MCard);

  return (
    <AnimatedCard  style = {style} sx={{p: 3}}>
      <div>WishList</div>
    </AnimatedCard>
  )
}

export default WishList