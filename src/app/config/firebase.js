import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAhA9KubKcQ1nsE115vZ-Y65tlVuCDFfqc",
  authDomain: "re-event-8e913.firebaseapp.com",
  databaseURL: "https://re-event-8e913.firebaseio.com",
  projectId: "re-event-8e913",
  storageBucket: "re-event-8e913.appspot.com",
  messagingSenderId: "141019178543"
}

firebase.initializeApp(firebaseConfig)
const firestore = firebase.firestore()
const settings = {timestampsInSnapshots: true}
firestore.settings(settings)

export default firebase