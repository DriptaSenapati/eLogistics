import React from 'react'
import { MCard } from '../MuiStyleOverrides';
import { animated } from '@react-spring/web';
import { Box, Button, Divider, FormControl, FormControlLabel, FormLabel, Input, InputLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { GLOBAL_BOX_SHADOW } from '../helpers/constants';
import SaveIcon from '@mui/icons-material/Save';
import { useForm, Controller } from "react-hook-form";
import { styled, alpha } from '@mui/material/styles';
import { fetcher } from '../fetch/fetcher';
import { usePromiseTracker } from "react-promise-tracker";
import { toast } from 'react-toastify';
import Link from 'next/link';



const StyledButton = styled(Button)(({ theme }) => ({
  height: "30px",
  '&:hover': {
    backgroundColor: alpha(theme.palette.secondary.main, 0.05),
    color: theme.palette.secondary.main
  }
}))

const non_seller_section = (session, setUserData) => {

  // const { handleSubmit, control, formState: { isDirty }, setValue } = useForm({
  //   defaultValues: {
  //     isSeller: ""
  //   }
  // });

  const { promiseInProgress } = usePromiseTracker({ area: "register_seller" });

  const registerSeller = () => {
    fetcher(`/api/account/registerseller`,
      {
        method: "POST",
        body: JSON.stringify({
          ...session
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      },
      "register_seller",
      true
    ).then(async (res) => {

      const resData = await res.json()

      if (res.ok) {
        if (resData.success) {
          toast.success("Successfully onboarded as seller");

          setUserData({
            ...session,
            slid: resData.slid
          })
        } else {
          toast.error(resData.message)
        }

      }
    }).catch((err) => toast.error(err))
  }



  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 5, color: (theme) => theme.palette.secondary.main }}>Seller Registration Form</Typography>
      <Box>
        <FormControl fullWidth={false} variant='standard' sx={{ width: "50%" }} disabled>
          <InputLabel htmlFor="seller_name">Name</InputLabel>
          <Input id="seller_name" defaultValue={session.user.name} />
        </FormControl>
      </Box>
      <LoadingButton
        sx={{
          float: "right",
          textTransform: "capitalize",
          boxShadow: GLOBAL_BOX_SHADOW
        }} variant="contained"
        loading={promiseInProgress}
        loadingPosition="start"
        startIcon={<SaveIcon />}
        type="submit"
        onClick={registerSeller}
      // disabled={!isDirty}
      >Become Seller</LoadingButton>
    </Box>
  )
}

const seller_section = (session, setUserData) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 5, color: (theme) => theme.palette.secondary.main }}>Hi, {session.user.name}</Typography>

      <Box
      >
        <FormControl fullWidth={false} variant='standard' sx={{ width: "50%" }} disabled>
          <InputLabel htmlFor="seller_id">Seller ID</InputLabel>
          <Input id="seller_id" defaultValue={session.slid} />
        </FormControl>
      </Box>

      <Stack
        direction="row"
        spacing={3}
        mt={5}
        justifyContent="flex-end"
      >
        <Link href={`/manageproduct?sl=${session.slid}&uid=${session.uid}`}>
          <Button variant='contained'
            sx={{
              textTransform: "capitalize"
            }}
          >Manage Products</Button>
        </Link>

        <Button variant='contained'
          sx={{
            textTransform: "capitalize"
          }}
        >End Seller Relationship</Button>
      </Stack>
    </Box>
  )
}

const BecomeSeller = ({ session, style, setUserData }) => {
  console.log(session)
  const AnimatedCard = animated(MCard);

  return (
    <AnimatedCard style={style} sx={{ p: 3 }}>
      {
        session?.slid ?
          seller_section(session, setUserData) :
          non_seller_section(session, setUserData)
      }
    </AnimatedCard>
  )
}

export default BecomeSeller