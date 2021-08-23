import {firebaseConfig} from "./firebaseConfig";
import firebase from "firebase";

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
export const auth = firebase.auth()

export const createExpense = (order) => {
  const orderRef = db.collection("expenses").doc()
  orderRef.set({
    ...order,
    id: orderRef.id,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
}

export const getAllExpenses = (uid) => {
  return db.collection('expenses')
    .where('uid', '==', uid)
    .orderBy('createdAt', 'desc')
    .get()
    .then((snapshot) => snapshot.docs
      .map((doc) => doc.data()));
}

export const createUser = (order, uid) => {
  return  db.collection("users").doc(uid).set({
    order,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
}
