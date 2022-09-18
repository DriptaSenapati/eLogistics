import { db } from "../../src/database/firebase-config";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';


export default async function handler(req, res) {
    const { username, email, password } = req.body;

    let userDoc = doc(db, "users", email);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
        return res.status(401).json({ error: `This Email is already registered! via ${docSnap.data().provider}` });
    } else {
        try {
            hash(password, 10, async function (err, hash) {
                if (!err) {
                    const uid = uuidv4();
                    await setDoc(userDoc, {
                        uid: uid,
                        name: username,
                        provider: "credentials",
                        password: hash
                    });

                    await setDoc(doc(db, "profiles", uid), {
                        username: username,
                        email: email
                    });
                }
            });
            return res.status(200).json({ success: "Successfully Created Account\nPlease Log In with credentials" });
        } catch (e) {
            return res.status(401).json({ error: e });
        }
    }
}