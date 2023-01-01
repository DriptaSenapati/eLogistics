import { Box, Card } from '@mui/material'
import React, { useEffect } from 'react'
import ProfileSideBar from '../src/ProfileSideBar';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useSpring, animated, config, useTransition } from '@react-spring/web'
import { sidebarDetails } from '../src/helpers/utils';
import { ACCOUNT_DETAILS_TRANSITION_Y } from '../src/helpers/constants';
import { fetcher } from '../src/fetch/fetcher';
import { GLOBAL_PADDING } from '../src/helpers/constants';

const StyledProfileForm = styled(Box)(({ theme }) => ({
  position: "relative",
  right: "-35vw",
  width: "60vw"
}))

const Account = ({ data }) => {

  const [rightComponent, setRightComponent] = useState({
    open: "Manage Account",
    page: "Personal Details"
  })


  const [userData, setUserData] = useState(data);





  console.log("ya_after", rightComponent)

  const springs = useSpring({
    from: { y: ACCOUNT_DETAILS_TRANSITION_Y, opacity: 0 },
    to: { y: 0, opacity: 1 },
    config: config.slow
  });

  const transitions = useTransition(rightComponent, {
    from: { y: ACCOUNT_DETAILS_TRANSITION_Y, opacity: 0 },
    enter: { y: 0, opacity: 1 },
    leave: { y: ACCOUNT_DETAILS_TRANSITION_Y, opacity: 0 },
    exitBeforeEnter: true
  })

  const AnimatedBox = animated(Box);

  return (
    <AnimatedBox style={springs} sx={{padding: GLOBAL_PADDING}}>
      <ProfileSideBar session={data}
        setRightComponent={setRightComponent}
        openGroup={rightComponent.open}
        openPage={rightComponent.page} />
      <StyledProfileForm>
        {
          transitions((style, item) => {
            var ContentComp = sidebarDetails[item.open]["content"].find((i) => i.page == item.page).component;
            return (

              <ContentComp style={style} session={userData} setUserData={setUserData} />
            )
          })
        }
      </StyledProfileForm>

    </AnimatedBox>
  )
}

export async function getServerSideProps({ res, req }) {
  const responseData = await fetcher(`${process.env.NEXTAUTH_URL}/api/account/prfdetails`,
    {
      headers: {
        Cookie: req.headers.cookie
      }
    },
    null,
    false
  )

  const data = await responseData.json()

  if (!data.success) {
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    }
  }

  // Pass data to the page via props
  return { props: { data } }
}


export default Account;