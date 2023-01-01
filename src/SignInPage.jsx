import { Button, Chip, Divider, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import LoginIcon from '@mui/icons-material/Login';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Image from 'next/image';
import GoogleIcon from '@mui/icons-material/Google';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { siginSchema } from "./../src/schema";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from 'next/router';


const SignInPage = ({ setFormVal, formVal, style, setForm, notify }) => {
    const { showPassword: _, ...formValue } = formVal;

    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: formValue,
        resolver: yupResolver(siginSchema)
    });

    const router = useRouter();
    console.log(router.query);
    const submitHandler = async (data) => {
        const res = await notify(
            new Promise((resolve, reject) =>
                signIn('credentials', {
                    redirect: false,
                    ...data,
                    callbackUrl: router.query.callBackUrl
                })
                    .then(async (response) => {
                        if (response.status === 200) {
                            const session = await getSession();
                            // console.log(session);
                            response.success = "Successfully Logged In";
                            response.user = session.user.name;
                            return resolve(response)
                        } else {
                            return reject(response)
                        }
                    })
            ),
            "Logging In. Please wait..."
        )
        // console.log(res);
        if (res.status === 200) {
            // if (router.query.callBackUrl === undefined) {
            //     router.push("/")
            // } else {
            //     router.push(router.query.callBackUrl);
            // }
            console.log("sigin", router.query.callBackUrl);
            // window.location.href = res.url
        }
    }

    const googleSubmit = () => {
        console.log(`${process.env.NEXTAUTH_URL}${router.query.callBackUrl}`)
        signIn("google", {
            callbackUrl: router.query.callBackUrl
        });
    }

    return (
        <Box sx={{ textAlign: "center", ...style }}>
            <Typography variant="h6" sx={{ mb: 1, textTransform: "uppercase" }} color="primary" align="center">
                Login to your account
            </Typography>
            <Image src="/favicon.png" height={50} width={50} alt="E-Logistics" />
            <form onSubmit={handleSubmit(submitHandler)}>
                <FormControl fullWidth variant="standard" error={Boolean(errors.username_email)}>
                    <InputLabel htmlFor="username_email">Username/Email</InputLabel>
                    <Input
                        id="username_email"
                        name="username_email"
                        type='text'
                        {...register("username_email", {
                            onChange: (e) => setFormVal({
                                ...formVal,
                                username_email: e.target.value
                            })
                        })}

                    />
                    <FormHelperText error>{errors.username_email?.message}</FormHelperText>
                </FormControl>
                <FormControl fullWidth variant="standard" error={Boolean(errors.username_email)}>
                    <InputLabel htmlFor="signin_password">Password</InputLabel>
                    <Input
                        id="signin_password"
                        name="password"
                        type={formVal.showPassword ? 'text' : 'password'}
                        {...register("password", {
                            onChange: (e) => setFormVal({
                                ...formVal,
                                password: e.target.value
                            })
                        })}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setFormVal({
                                        ...formVal,
                                        showPassword: !formVal.showPassword
                                    })}
                                    onMouseDown={(e) => e.preventDefault()}
                                >
                                    {formVal.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText error>{errors.password?.message}</FormHelperText>
                </FormControl>
                <Button variant="contained" endIcon={<LoginIcon />} sx={{
                    m: 3,
                    borderRadius: 3,
                    '&:hover': {
                        color: "background.default"
                    }
                }} type="submit">
                    Log In
                </Button>
            </form>
            <Divider variant="middle" sx={{ width: "90%", m: "auto" }}><Chip label="or" color='secondary' /></Divider>
            <Box id="social_login">
                <Stack direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}>
                    <Typography variant='p'>
                        Log In with:
                    </Typography>
                    <IconButton onClick={googleSubmit}>
                        <GoogleIcon sx={{
                            color: "primary.main",
                            transition: "color",
                            transitionDuration: "0.5s",
                            '&:hover': {
                                color: "secondary.main"
                            }
                        }} />
                    </IconButton>
                </Stack>
            </Box>
            <Box id="register" sx={{ mt: 2 }}>
                <Typography variant="p">
                    Do not have an account?
                    <Button
                        color="primary"
                        sx={{
                            ml: 1,
                            transition: "all",
                            transitionDuration: "0.5s",
                            '&:hover': {
                                backgroundColor: "transparent",
                                color: 'secondary.main'
                            }
                        }}
                        onClick={() => setForm("signup")}
                    >
                        SignUp
                    </Button>
                </Typography>
            </Box>
        </Box>
    )
}

export default SignInPage