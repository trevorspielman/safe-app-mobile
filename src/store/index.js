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
const unlockCodes = firebase.firestore().collection('unlockCodes')


export const store = {
  availableSafes: [],
  currentSafe: {},
  currentSafeId: '',
  //used to store deposit information until safe is locked again
  pendingTransaction: {},
  transactionProcessing: true,
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
        .then(res => {
          store.calcSafeTotal()
        })
      if (store.pendingTransaction.removedDeposits) {
        store.pendingTransaction.removedDeposits.forEach(deposit => {
          availableSafes.doc(store.currentSafeId).collection("transactions").doc(deposit.toString()).update({ withdrawn: true })
        })
      }
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
      store.calcSafeTotal()
    })
  },
  calcSafeTotal: () => {
    let strSafeId = store.currentSafeId.toString()
    var tempTransactionRegister = []
    availableSafes.doc(strSafeId).collection("transactions").where("safeId", "==", strSafeId).get()
      .then(res => {
        res.forEach(doc => {
            tempTransactionRegister.push(doc.data())
        })
        store.safeTransactions = tempTransactionRegister
        //calculates total for display as well as updating total on the safe doc.
        var total = 0
        for (let i = 0; i < store.safeTransactions.length; i++) {
          const transaction = store.safeTransactions[i];
          if (transaction.transType == "Withdrawal") {
            total -= Number(transaction.total)
          }
          else {
            total += Number(transaction.total)
          }
          store.currentSafe.totalAmount = total
        }
      })
  }

}

//keeps an eye on changing data, then updates store.availableSafes array with new id.
availableSafes.onSnapshot((newSafe) => {
  newSafe.docs.forEach(safe => {
    store.availableSafes.push(safe.id)
  })
})

//toggles pendingTransaciton to control the movement of the screen from the unlock code to mobile home
unlockCodes.onSnapshot((toggle) => {
  store.transactionProcessing = !store.transactionProcessing
  if (!store.transactionProcessing) {
    setTimeout(funciton => {
      router.push({ name: 'MobileHome' })
    }, 2000)
  }
})