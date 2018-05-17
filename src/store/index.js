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
          store.currentSafeId = strSafeNum
        })
    }
    else {
      alert("Invalid safe number.")
    }
  },

  //adds deposit to transaction collection on currentSafe
  // makeDeposit: (deposit) => {
  //   var transactionId = deposit.transactionId.toString()
  //   transactions.doc(transactionId).set(deposit)
  // },
  unlockCode: (unlockCode) => {
    let strUnlockCode = unlockCode.toString()
    var transactionComplete = {
      transactionComplete: false
    }
    //creates the unlockCode document and sets the transactionComplete to false
    unlockCodes.doc(unlockCode).set(transactionComplete)
    //listens to unlockCodes collection and the current unlockCode for changes
    unlockCodes.doc(unlockCode).onSnapshot((unlocked) => {
      let tempTransaction = unlockCodes.doc(unlockCode)
      tempTransaction.get()
        .then(res => {
          if (res.data().transactionComplete == true) {
            let strTransactionId = store.pendingDeposit.transactionId.toString()
            transactions.doc(strTransactionId).set(store.pendingDeposit)
            
          }
        })
    })
  },

}

//keeps an eye on changing data, then updates store.availableSafes array with new id.
availableSafes.onSnapshot((newSafe) => {
  newSafe.docs.forEach(safe => {
    store.availableSafes.push(safe.id)
  })
})

