import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import {SignInLoader} from './loaders';

const Auth = ({ children, componentProps }) => {
    const router = useRouter();

    const { data: session,status } = useSession({
        onUnauthenticated() {
            
        }
    });

    if (status === "loading") {
        return <SignInLoader />
    }

    if(status === "unauthenticated"){
        if (componentProps.OnUnauthorize === "render") {
            return (
                children
            )
        } else {
            router.push("/")
        }
    }

    if(status === 'authenticated'){
        if (componentProps.Onauthorize === "not_render") {
            router.push("/")
        } else {
            return (
                children
            )
        }
    }
    

}

export default Auth