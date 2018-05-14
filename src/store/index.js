import vue from 'vue'
import router from '../router'
import firebase from 'firebase'
import 'firebase/firestore'




//Firebase initialization
var config = {
  apiKey: "AIzaSyC3iDHLGR2iatFVXme54drDre-RRu0hlIA",
  authDomain: "safe-test-90584.firebaseapp.com",
  databaseURL: "https://safe-test-90584.firebaseio.com",
  projectId: "safe-test-90584",
  storageBucket: "safe-test-90584.appspot.com",
  messagingSenderId: "497360363492"
};
firebase.initializeApp(config);

const firestore = firebase.firestore()
//a reference to the availableSafes collection
const availableSafes = firebase.firestore().collection('availableSafes')

export const store = {
  availableSafes: [],
  currentSafe: {},


  //Sends connection data to Firestore
  connectSafe: (connect) => {
    var strSafeNum = connect.safeNum
    var connectData = {
      isConnected: true,
      totalAmount: 0,
      username: connect.username
    }
    if (store.availableSafes.includes(strSafeNum)) {
      availableSafes.doc(strSafeNum).set(connectData)
      store.currentSafe = availableSafes.doc(strSafeNum).get()
        .then(res => {
          store.currentSafe = res.data()
        })
    }
    else {
      alert("Invalid safe number.")
    }
  }
}

//keeps an eye on changing data, then updates store.availableSafes array with new id.
availableSafes.onSnapshot((newSafe) => {
  newSafe.docs.forEach(safe => {
    store.availableSafes.push(safe.id)
  })
})
