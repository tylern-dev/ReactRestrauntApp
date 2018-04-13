import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCkyPasv20f9oX3xJ63W0eO23PyHYvveqo",
  authDomain: "catch-of-the-day-8eb0e.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-8eb0e.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export { firebaseApp };

// this is a default export
export default base;