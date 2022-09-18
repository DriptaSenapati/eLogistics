import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";


export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username_email: { label: "Username/Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch(`${process.env.NEXTAUTH_URL}/api/loginuser`, {
                    method: 'POST',
                    body: JSON.stringify({
                        username_email: credentials.username_email,
                        password: credentials.password
                    }),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json();


                if (res.status != 200) {
                    throw new Error(user.error);
                }
                if (res.ok && user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            },
        }),
        GoogleProvider({
            clientId: "171302107253-8d1j9lf777ij13oibp9co7jvdcu1ikq4.apps.googleusercontent.com",
            clientSecret: "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",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    secret: process.env.JWT_SECRET,
    jwt: {
        encryption: true,
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider == "google") {
                // console.log(user);
                const res = await fetch(`${process.env.NEXTAUTH_URL}/api/sociallogin`, {
                    method: 'POST',
                    body: JSON.stringify({ type: "google",...user }),
                    headers: { "Content-Type": "application/json" }
                })

                const resjson = await res.json();
                if(res.status !== 200){
                    return `/signin?error=${resjson.error}`
                }
                return true;
            }

            return true;
        },
        async session({ session, user, token }) {
            session.uid = token.uid;
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if(user){
                token.uid = user.uid
            }
            return token
        }
    }
}

// export default NextAuth({
//     // Configure one or more authentication providers

// })

export default NextAuth(authOptions);