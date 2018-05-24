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
  pendingTransaction: {},
  transactionProcessing: false,
  safeTransactions: [],


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
      let strTransactionId = store.pendingTransaction.transactionId.toString()
      availableSafes.doc(store.currentSafeId).collection("transactions").doc(strTransactionId).set(store.pendingTransaction)
    })
  },
  cancelTransaction: (transactionId) => {
    let unlockCode = transactionId + "-" + store.currentSafeNumber
    unlockCodes.doc(unlockCode).delete()
    store.transactionProcessing = false
  },
  //gets all transactions where the safeID matches
  getTransactions: () => {
    availableSafes.onSnapshot((transactionsRef) => {
      let strSafeId = store.currentSafeId.toString()
      var tempTransactionRegister = []
      availableSafes.doc(strSafeId).collection("transactions").where("safeId", "==", strSafeId).get()
        .then(res => {
          res.forEach(doc => {
            if (doc.data().transType == "deposit") {
              tempTransactionRegister.push(doc.data())
            }
          })
          store.safeTransactions = tempTransactionRegister
          //calculates total for display as well as updating total on the safe doc.
          var total = 0
          for (let i = 0; i < store.safeTransactions.length; i++) {
            const transaction = store.safeTransactions[i];
            if (transaction.transType == "withdrawal") {
              total -= Number(transaction.total)
            }
            else {
              total += Number(transaction.total)
            }
            store.currentSafe.totalAmount = total
            // availableSafes.doc(strSafeId).update({ totalAmount: store.currentSafe.totalAmount })
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

//toggles pendingTransaciton
unlockCodes.onSnapshot((toggle) => {
  //try checking to see if transaction complete is true/false for the push to home
  store.transactionProcessing = !store.transactionProcessing
})

