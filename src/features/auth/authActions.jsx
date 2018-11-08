import { SIGN_OUT_USER } from './authConstants'
import { closeModal } from '../modals/modalActions'
import { SubmissionError } from 'redux-form'

export const login = credentials => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    try {
      await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      console.log('Logged In successfully!')
      dispatch(closeModal())
    } catch(error) {
      console.log(error.message)
      throw new SubmissionError({
        _error: error.message
      })
    }
  }
}

export const logout = () => {
  return {
    type: SIGN_OUT_USER
  }
}