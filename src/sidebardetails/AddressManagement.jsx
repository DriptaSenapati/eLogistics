import React from 'react'
import { animated } from '@react-spring/web'
import { MCard } from '../MuiStyleOverrides';

function AddressManagement({session, style, setUserData}) {
  const AnimatedCard = animated(MCard);

  return (
    <AnimatedCard style = {style} sx={{p: 3}}>
      <div>AddressManagement</div>
    </AnimatedCard>
  )
}

export default AddressManagement