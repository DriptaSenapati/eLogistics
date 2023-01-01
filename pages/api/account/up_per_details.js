import { db } from "./../../../src/database/firebase-config";
import { updateDoc, doc } from "firebase/firestore";

export default async function handler(req, res) {
    
    const uid_doc = doc(db, "profiles", req.body.uid);

    await updateDoc(uid_doc, req.body.content);

    return res.status(200).json({"massage": "Successfullly updated profile"});
}