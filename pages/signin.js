import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useRouter } from 'next/router'
import { Divider, Stack } from '@mui/material';
import Image from 'next/image';
import siginImage from "./../assets/img/sigin_image.png"
import SignInPage from '../src/SignInPage';
import SignUpPage from '../src/SignUpPage';
import { useWindowSize } from 'react-use';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function Signin() {
    const router = useRouter()
    const [formState, setformState] = useState("signin");
    const [modalHeight, setModalHeight] = useState(null);
    const { height } = useWindowSize();

    

    const notify = async (promise, pending_msg) => {
        const res = await toast.promise(
            promise,
            {
                pending: pending_msg,
                success: {
                    render({ data }) {
                        if(data.user){
                            return `Welcome ${data.user}.${data.success}`
                        }else{
                            return `${data.success}`
                        };
                    }
                },
                error: {
                    render({ data }) {
                        return data.error;
                    }
                }
            }
        )
        return res;
    }

    useEffect(() => {
        const q = router.query;
        if (q.error) {
            toast.error(
                q.error,{
                    toastId: "ErrorToast"
                }
            )
        }
    }, [router.query])

    useEffect(() => {
        if (!modalHeight) {
            setModalHeight(height);
        }
    }, [])

    
    

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: "97%", sm: "95%", md: '60%' },
        height: `${modalHeight ? modalHeight * 0.75 : 0}px`,
        bgcolor: 'background.default',
        borderRadius: "20px",
        outline: "none",
        boxShadow: 24,
        p: { xs: 0, md: 4 },
        overflow: 'hidden'
    };

    const signinStyle = {
        position: "absolute",
        top: "5%",
        transform: `translateY(${formState === "signin" ? "0" : "200%"})`,
        transition: "all",
        transitionDuration: "0.7s",
        width: { xs: "90%", md: "unset" }
    }

    const signupStyle = {
        position: "absolute",
        top: "2%",
        transform: `translateY(${formState === "signup" ? "0" : "200%"})`,
        transition: "all",
        transitionDuration: "0.7s",
        width: { xs: "90%", md: "unset" }
    }

    const [formVal, setFormVal] = useState({
        username_email: '',
        password: '',
        showPassword: false
    })

    const [formValSignUp, setFormValSignUp] = useState({
        username: '',
        email: "",
        password: '',
        cPassword: '',
        showcPassword: false,
        showPassword: false
    })

    const handleClose = (e) => {
        e.preventDefault();
        router.push("/")

    }


    return (
        <div>
            <Modal
                open={true}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={true}>
                    <Box sx={style}>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ height: "100%" }}
                            spacing={0}
                            divider={<Divider orientation="vertical" sx={{ backgroundColor: "background.default", display: { xs: "none", md: "inline-block" } }} />}
                        >
                            <Box width="50%" sx={{ display: { xs: "none", md: "block" } }}>
                                <Image src={siginImage} />
                            </Box>
                            <Box sx={{
                                '& .MuiFormControl-root': formState === "signin" ? { m: 1 } : { mb: 1 },
                                textAlign: "center",
                                position: "relative",
                                width: { xs: "90%", md: "50%" },
                                p: formState === "signin" ? { xs: 1, md: 1.5 } : { xs: 1, md: 1.5 }
                            }} height={formState === "signin" ? "90%" : "100%"}>
                                <SignInPage formVal={formVal} setFormVal={setFormVal} style={signinStyle} setForm={setformState} notify={notify} />
                                <SignUpPage formVal={formValSignUp} setFormVal={setFormValSignUp} style={signupStyle} setForm={setformState} notify={notify} />

                            </Box>
                        </Stack>
                    </Box>
                </Fade>
            </Modal>

        </div>
    )
}


Signin.auth = {
    role: "user",
    OnUnauthorize: "render",
    Onauthorize: "not_render"
}
