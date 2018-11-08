import { ASYNC_ACTION_START, ASYNC_ACTION_FINISH, ASYNC_ACTION_ERROR } from './asyncConstants'
import { createReducer } from '../../app/common/util/reducerUtil'
import { asyncActionError } from './asyncActions';

const initialState = {
  loading: false
}

export const asyncActionStarted = (state, payload) => {
  return {...state, loading: true}
}

export const asyncActionFinish = (state, payload) => {
  return {...state, loading: false}
}

export const asyncActionRoor = (state, payload) => {
  return {...state, loading: false}
}

export default createReducer(initialState, {
  [ASYNC_ACTION_START]: asyncActionStarted,
  [ASYNC_ACTION_FINISH]: asyncActionFinish,
  [ASYNC_ACTION_ERROR]: asyncActionError
})