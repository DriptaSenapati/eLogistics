import { authOptions } from './../auth/[...nextauth]'
import { unstable_getServerSession } from "next-auth/next"
import { db } from './../../../src/database/firebase-config';
import { doc, getDoc } from "firebase/firestore";

export default async function handler(req, res) {
    const session = await unstable_getServerSession(req, res, authOptions)

    // console.log("session", session);

    if (session) {
        const docRef = doc(db, "profiles", session.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return res.status(200).json({
                ...session,
                ...docSnap.data(),
                success: true
            });
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }else{
        res.status(200).json({
            success: false,
            error: "Invalid User"
        })
    }
}