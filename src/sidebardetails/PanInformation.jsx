import React from 'react'
import { MCard } from '../MuiStyleOverrides';
import { animated } from '@react-spring/web'

function PanInformation({style}) {
  const AnimatedCard = animated(MCard);

  return (
    <AnimatedCard style = {style} sx={{p: 3}}>
      <div>PanInformstion</div>
    </AnimatedCard>
  )
}

export default PanInformation