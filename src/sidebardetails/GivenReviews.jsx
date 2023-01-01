import React from 'react'
import { MCard } from '../MuiStyleOverrides';
import { animated } from '@react-spring/web'

const GivenReviews = ({style}) => {
  const AnimatedCard = animated(MCard);

  return (
    <AnimatedCard style = {style} sx={{p: 3}}>
      <div>GivenReviews</div>
    </AnimatedCard>
  )
}

export default GivenReviews