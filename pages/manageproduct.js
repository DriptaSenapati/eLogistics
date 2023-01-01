import React from 'react'
import { useSpring, animated, config, useTransition } from '@react-spring/web'
import { ACCOUNT_DETAILS_TRANSITION_Y, GLOBAL_PADDING } from '../src/helpers/constants';
import { Box, Breadcrumbs } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getSession } from "next-auth/react";
import { MBreadcrumb } from '../src/MuiStyleOverrides';
import Category from '../src/productmanager/Category';
import ProductItems from "../src/productmanager/ProductItems"
import ProductDetails from "../src/productmanager/ProductDetails"
import { styled, alpha, emphasize } from '@mui/material/styles';



const StyledProductManager = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10,
  marginTop: "25px"
}))

const Manageproduct = ({ session }) => {

  const springs = useSpring({
    from: { y: ACCOUNT_DETAILS_TRANSITION_Y, opacity: 0 },
    to: { y: 0, opacity: 1 },
    config: config.slow
  });

  const router = useRouter();


  const AnimatedBox = animated(Box);


  return (
    <AnimatedBox style={springs} sx={{ p: GLOBAL_PADDING }}>
      <Box sx={{ p: 3 }}>
        <Breadcrumbs aria-label="breadcrumb_seller" separator=">">
          <MBreadcrumb
            component="a"
            href="#"
            label="Home"
          />
          <MBreadcrumb component="a" href="#" label="Catalog" />
          <MBreadcrumb
            label="Accessories"
          />
        </Breadcrumbs>
        <StyledProductManager className="product_content">
          <Category />
          <ProductItems />
          <ProductDetails />
        </StyledProductManager>
      </Box>
    </AnimatedBox>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    }
  }

  return {
    props: { session },
  }
}

export default Manageproduct