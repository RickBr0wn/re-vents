import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT, FETCH_EVENTS } from './eventConstants'
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions'
import { fetchSampleData } from '../../app/data/mockAPI'
import { toastr } from 'react-redux-toastr';

export const fetchEvents = events => {
  return {
    type: FETCH_EVENTS,
    payload: events
  }
}

export const createEvent = event => {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_EVENT,
        payload: {
          event
        }
      })
      toastr.success('Success!', 'Your event has been created')
    } catch(error) {
      toastr.error('Oops!', 'Somthing went wrong')
    }
  }
}

export const updateEvent = event => {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_EVENT,
        payload: {
          event
        }
      })
      toastr.success('Success!', 'Your event has been updated')
    } catch(error) {
      toastr.error('Oops!', 'Somthing went wrong')
    }
  }
}

export const deleteEvent = eventId => {
  return {
    type: DELETE_EVENT,
    payload: {
      eventId
    }
  }
}

export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart())
      let events = await fetchSampleData()
      dispatch(fetchEvents(events))
      dispatch(asyncActionFinish())
    } catch(error) {
      console.log(error)
      dispatch(asyncActionError())
    }
  }
}