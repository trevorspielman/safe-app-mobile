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
const transactions = firebase.firestore().collection('transactions')
const unlockCodes = firebase.firestore().collection('unlockCodes')


export const store = {
  availableSafes: [],
  currentSafe: {},
  currentSafeId: '',
  //used to store deposit information until safe is locked again
  pendingDeposit: {},
  transactionProcessing: false,


  //Sends connection data to Firestore
  connectSafe: (connect) => {
    var strSafeNum = connect.safeNum
    if (store.availableSafes.includes(strSafeNum)) {
      availableSafes.doc(strSafeNum).update({ isConnected: true, username: connect.username })
      store.currentSafe = availableSafes.doc(strSafeNum).get()
        .then(res => {
          store.currentSafe = res.data()
          store.currentSafeId = strSafeNum
        })
    }
    else {
      alert("Invalid safe number.")
    }
  },
  unlockCode: (unlockCode) => {
    let strUnlockCode = unlockCode.toString()
    var transactionComplete = {
      transactionComplete: false
    }
    //creates the unlockCode document and sets the transactionComplete to false
    unlockCodes.doc(unlockCode).set(transactionComplete)
    //listens to unlockCodes collection and the current unlockCode for changes
    unlockCodes.doc(unlockCode).onSnapshot((unlocked) => {
      let strTransactionId = store.pendingDeposit.transactionId.toString()
      availableSafes.doc(store.currentSafeId).collection("transactions").doc(strTransactionId).set(store.pendingDeposit)
    })
  },
  cancelTransaction: (transactionId) => {
    let unlockCode = transactionId + "-" + store.currentSafeNumber
    unlockCodes.doc(unlockCode).delete()
    store.transactionProcessing = false
  }

}

//keeps an eye on changing data, then updates store.availableSafes array with new id.
availableSafes.onSnapshot((newSafe) => {
  newSafe.docs.forEach(safe => {
    store.availableSafes.push(safe.id)
  })
})

//toggles pendingTransaciton
unlockCodes.onSnapshot((toggle) => {
  store.transactionProcessing = !store.transactionProcessing
})

