import { db } from "./../../../src/database/firebase-config";
import { updateDoc, doc, addDoc, collection, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {

    // console.log(Object.values(JSON.parse(req.body)));

    const slid = `sl_${uuidv4()}`;
    const uid_doc = doc(db, "profiles", req.body.uid);
    
    // console.log(uid_doc)

    try {
        await updateDoc(uid_doc, {
            slid: slid
        });

        // await setDoc(doc(db, "sellers", slid), {
        //     name: req.body.user.name
        // });

        await setDoc(doc(db, "sellers", slid), {
            name: req.body.user.name
        });

        return res.status(200).json({ message: "Successfullly onboarded as seller", success: true,slid: slid })
    } catch (e) {
        return res.status(200).json({ message: e, success: false })
    }

    // return res.status(200).json({ "massage": "Successfullly updated profile" });
}