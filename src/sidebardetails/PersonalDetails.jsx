import React, { useState } from 'react';
import _ from 'underscore';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import LoadingButton from '@mui/lab/LoadingButton';
import { Avatar, Badge, Box, Button, FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, Stack, Typography } from '@mui/material'
import { styled, alpha } from '@mui/material/styles';
import { animated } from '@react-spring/web'
import { MCard, MOutlinedInput, MSelect } from '../MuiStyleOverrides';
import { range } from "./../helpers/utils";
import SaveIcon from '@mui/icons-material/Save';
import { usePromiseTracker } from "react-promise-tracker";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { personalDetailsSchema } from "./../schema";
import { toast } from 'react-toastify';
import { GLOBAL_BOX_SHADOW } from '../helpers/constants';
import { fetcher } from '../fetch/fetcher';


const StyledAvatarProfile = styled(Avatar)(({ theme }) => ({
  height: 100,
  width: 100
}))

const StyledButton = styled(Button)(({ theme }) => ({
  height: "30px",
  '&:hover': {
    backgroundColor: alpha(theme.palette.secondary.main, 0.05),
    color: theme.palette.secondary.main
  }
}))

const AnimatedCard = animated(MCard);


const getFormDetails = (session) => {
  const name = {
    fname: session.user.name.split(" ")[0],
    mname: session.user.name.split(" ").length === 3 ? session.user.name.split(" ")[1] : "",
    lname: session.user.name.split(" ").length === 3 ? session.user.name.split(" ")[2] : session.user.name.split(" ")[1]
  }

  const { user, gender, dob_dd, dob_mm, dob_yyyy } = session;

  return {
    name,
    gender: gender ? gender : '',
    dob_dd: dob_dd ? dob_dd : '',
    dob_mm: dob_mm ? dob_mm : '',
    dob_yyyy: dob_yyyy ? dob_yyyy : ''
  }
}




function PersonalDetails({ session, style, setUserData }) {

  const { name, gender, dob_dd, dob_mm, dob_yyyy } = getFormDetails(session);


  const [formDetails, setFormDetails] = useState({ gender, dob_dd, dob_mm, dob_yyyy })
  const { promiseInProgress } = usePromiseTracker({ area: "pdUpdateButton" });


  const { control, resetField, formState: { errors, isDirty }, handleSubmit, reset, setValue } = useForm({
    defaultValues: formDetails,
    resolver: yupResolver(personalDetailsSchema)
  });



  const updateDatabase = (data) => {

    fetcher(
      "/api/account/up_per_details",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: session.uid,
          content: data
        })
      },
      "pdUpdateButton"
    ).then(async (res) => {

      const resData = await res.json();

      if (!res.ok) {
        toast.error(resData.message)
      } else {
        toast.success("Information updated successfully!");
        reset({
          ...data
        }, {
          keepDirty: false,
          keepErrors: false,
          keepDefaultValues: false
        })
        setUserData({
          ...session,
          ...data
        })
      }
    })
  }

  return (
    <AnimatedCard style={style} sx={{ p: 3 }}>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <Tooltip title="Edit Photo" arrow>
              <Box sx={{
                backgroundColor: (theme) => theme.palette.secondary.main,
                borderRadius: "50%",
                p: 0.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <EditIcon fontSize='medium'
                  sx={{
                    cursor: "pointer",
                    color: "white"
                  }} />
              </Box>
            </Tooltip>
          }
        >
          <StyledAvatarProfile alt={session.user.name} src={`${session.image}`} />
        </Badge>

      </Box>
      <form onSubmit={handleSubmit(updateDatabase)}>
        <Stack
          direction="column"
          spacing={8}
          sx={{ mt: 3, p: 2 }}
        >
          <Box >

            <Stack
              direction="row"
              spacing={5}
            >
              <FormControl disabled>
                <InputLabel htmlFor="pd_fname">First Name</InputLabel>
                <MOutlinedInput id="pd_fname" defaultValue={name?.fname} label="First Name" />
              </FormControl>
              <FormControl disabled>
                <InputLabel htmlFor="pd_mname">Middle Name</InputLabel>
                <MOutlinedInput id="pd_fname" defaultValue={name?.mname} label="Middle Name" />
              </FormControl>
              <FormControl disabled>
                <InputLabel htmlFor="pd_lname">Last Name</InputLabel>
                <MOutlinedInput id="pd_lname" defaultValue={name?.lname} label="Last Name" />
              </FormControl>
            </Stack>
          </Box>


          <Box>
            <FormControl>
              <FormLabel>Gender</FormLabel>

              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    row
                    {...field}
                  >
                    <FormControlLabel value="male" control={<Radio color='secondary' />} label="Male" />
                    <FormControlLabel value="female" control={<Radio color='secondary' />} label="Female" />

                  </RadioGroup>
                )}
              />
            </FormControl>
            <StyledButton onClick={() => setValue("gender", "", { shouldDirty: true })}>Clear Selection</StyledButton>
          </Box>

          <Box>
            <Typography sx={{ display: "inline-block", mr: 10 }}>Date of Birth</Typography>

            <Stack
              direction="row"
              spacing={3}
              sx={{ mt: 2 }}
            >

              <Controller
                name="dob_dd"
                control={control}
                render={({ field }) => (
                  <FormControl size='small' sx={{ minWidth: 90 }}
                    error={Boolean(errors.dob_dd)}>

                    <InputLabel id="dob_dd">Date</InputLabel>
                    <MSelect
                      labelId='dob_dd'
                      {...field}
                      label="Date"
                    >
                      {
                        range(1, 31).map((num) => (
                          <MenuItem value={num} key={num}>{num}</MenuItem>
                        ))
                      }
                    </MSelect>
                    {errors.dob_dd ? <FormHelperText error>{errors.dob_dd.message}</FormHelperText> : <em>&nbsp;</em>}
                  </FormControl>
                )}
              />

              <Controller
                name="dob_mm"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl size='small' sx={{ minWidth: 90 }} error={Boolean(errors.dob_mm)}>

                    <InputLabel id="dob_mm">Month</InputLabel>
                    <MSelect
                      labelId='dob_mm'
                      {...field}
                      label="Month"
                    >
                      {
                        range(1, 12).map((num) => (
                          <MenuItem value={num} key={num}>{num}</MenuItem>
                        ))
                      }
                    </MSelect>
                    {errors.dob_mm ? <FormHelperText error>{errors.dob_mm.message}</FormHelperText> : <em>&nbsp;</em>}

                  </FormControl>
                )}
              />


              <Controller
                name="dob_yyyy"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl size='small' sx={{ minWidth: 90 }} error={Boolean(errors.dob_yyyy)}>

                    <InputLabel id="dob_yyyy">Year</InputLabel>
                    <MSelect
                      labelId='dob_yyyy'
                      {...field}
                      label="Year"
                    >
                      {
                        range(1980, 2022).map((num) => (
                          <MenuItem value={num} key={num}>{num}</MenuItem>
                        ))
                      }
                    </MSelect>
                    {errors.dob_yyyy ? <FormHelperText error>{errors.dob_yyyy.message}</FormHelperText> : <em>&nbsp;</em>}


                  </FormControl>
                )}
              />
              <StyledButton onClick={() => {
                setValue("dob_dd", "", { shouldDirty: true })
                setValue("dob_mm", "", { shouldDirty: true })
                setValue("dob_yyyy", "", { shouldDirty: true })
              }}>Clear Selection</StyledButton>
            </Stack>

          </Box>

          <Box>
            <LoadingButton sx={{
              float: "right",
              textTransform: "capitalize",
              boxShadow: GLOBAL_BOX_SHADOW
            }} variant="contained"
              loading={promiseInProgress}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              type="submit"
              disabled={!isDirty}>Save Changes</LoadingButton>
          </Box>

        </Stack >
      </form>
    </AnimatedCard >
  )
}

export default PersonalDetails