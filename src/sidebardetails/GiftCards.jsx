import React from 'react'
import { MCard } from '../MuiStyleOverrides';
import { animated } from '@react-spring/web'

const GiftCards = ({style}) => {
  const AnimatedCard = animated(MCard);

  return (
    <AnimatedCard style = {style} sx={{p: 3}}>
      <div>GiftCards</div>
    </AnimatedCard>
  )
}

export default GiftCards