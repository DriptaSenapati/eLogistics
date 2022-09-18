import { db } from "../../src/database/firebase-config";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { compare } from 'bcrypt';

export default async function handler(req, res) {
    const { username_email, password } = req.body;

    if (!username_email.includes("@")) {
        const docref = collection(db, "users");

        const q = query(docref, where("name", "==", username_email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
            var docData = [];
            querySnapshot.forEach((doc) => {
                var data = doc.data();
                docData.push(data);
            });

            if(docData[0].provider != "credentials"){
                return res.status(401).send({ error: `Email already registered via ${docData[0].provider}`})
            }

            const match = await compare(password, docData[0].password);
            if (match) {
                return res.status(200).send({
                    success: "Successfully Logged In",
                    uid: docData[0].uid,
                    name: docData[0].name
                });
            } else {
                return res.status(401).send({ error: "Invalid Credentials" });
            }
        } else {
            return res.status(401).send({ error: "Invalid Credentials" });
        }
    } else {
        let userDoc = doc(db, "users", username_email);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
            let db_data = docSnap.data();

            if(db_data.provider != "credentials"){
                return res.status(401).send({ error: `Email already registered via ${db_data.provider}`})
            }

            const match = await compare(password, db_data.password);
            if (match) {
                return res.status(200).send({
                    success: "Successfully Logged In",
                    uid: db_data.uid,
                    name: db_data.name
                });
            } else {
                return res.status(401).send({ error: "Invalid Credentials" });
            }

        } else {
            return res.status(401).send({ error: "Invalid Credentials" });
        }
    }
}