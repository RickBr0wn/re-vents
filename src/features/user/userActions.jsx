import moment from 'moment'
import { toastr } from 'react-redux-toastr'

export const updateProfile = user => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase()
  const { isLoaded, isEmpty, ...updatedUser } = user
  if (updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
    updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate()
  }
  try {
    await firebase.updateProfile(updatedUser)
    toastr.success('Success', 'Profile updated')
  } catch (error) {
    console.log(error)
  }
}

export const uploadProfileImage = (file, fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase()
  const firestore = getFirestore()
  const user = firebase.auth().currentUser
  const path = `${user.uid}/user_images`
  const options = {
    name: fileName,
  }

  try {
    // upload the file to firebase storage
    let uploadedFile = await firebase.uploadFile(path, file, null, options)
    // get URL of image from firebase
    let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL
    // get user doc from firestore
    let userDoc = await firestore.get(`users/${user.uid}`)
    // check if user has a photo, if not update profile with new photo
    if (!userDoc.data().photoURL) {
      await firebase.updateProfile({
        photoURL: downloadURL,
      })
      await user.updateProfile({
        photoURL: downloadURL,
      })
    }
    // add the nw photo to photos collection
    return await firestore.add(
      {
        collection: 'users',
        doc: user.uid,
        subcollections: [{ collection: 'photos' }],
      },
      {
        name: fileName,
        url: downloadURL,
      }
    )
  } catch (error) {
    console.log(error)
    throw new Error('Problem uploading photo!')
  }
}
