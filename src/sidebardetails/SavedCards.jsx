import React from 'react'
import { MCard } from '../MuiStyleOverrides';
import { animated } from '@react-spring/web'

const SavedCards = ({style}) => {
  const AnimatedCard = animated(MCard);

  return (
    <AnimatedCard style = {style} sx={{p: 3}}>
      <div>SavedCards</div>
    </AnimatedCard>
  )
}

export default SavedCards