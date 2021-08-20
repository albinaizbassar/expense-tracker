import {firebaseConfig} from "./firebaseConfig";
import firebase from "firebase";

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

export const createExpense = (order) => {
  const orderRef = db.collection("expenses").doc()
  orderRef.set({
    ...order,
    id: orderRef.id,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
}

export const getAllExpenses = () => {
  return db.collection('expenses')
    .orderBy('createdAt', 'desc')
    .get()
    .then((snapshot) => snapshot.docs
      .map((doc) => doc.data()));
}
