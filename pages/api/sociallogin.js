import { db } from "./../../src/database/firebase-config";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
    const { name, email, image } = req.body;

    let userDoc = doc(db, "users", email);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
        const db_data = docSnap.data();

        if (db_data.provider === "google") {
            return res.status(200).json("Successfully Logged In!")
        }
        return res.status(401).json({
            error: `Email Id already registered! via ${docSnap.data().provider}`
        })
    } else {
        try {
            const uid = uuidv4();
            await setDoc(userDoc, {
                name: name,
                provider: "google",
                uid: uid
            });

            await setDoc(doc(db, "profiles", uid), {
                username: name,
                email: email,
                image: image
            });

            return res.status(200).json("Successfully logged In..");
        } catch (error) {
            return res.status(400).json({ error: error });
        }


    }
}
