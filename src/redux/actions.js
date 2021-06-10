import axios from 'axios'
import {
  GET_DATA_FISH_REQUEST,
  GET_DATA_FISH_SUCCESS,
  GET_DATA_FISH_FAIL,

  GET_DATA_AREA_REQUEST,
  GET_DATA_AREA_SUCCESS,
  GET_DATA_AREA_FAIL,

  GET_DATA_SIZE_REQUEST,
  GET_DATA_SIZE_SUCCESS,
  GET_DATA_SIZE_FAIL,

  CREATE_DATA_REQUEST,
  CREATE_DATA_SUCCESS,
  CREATE_DATA_FAIL,

  // UPDATE_DATA_REQUEST,
  // UPDATE_DATA_SUCCESS,
  // UPDATE_DATA_FAIL,

  DELETE_DATA_REQUEST,
  DELETE_DATA_SUCCESS,
  DELETE_DATA_FAIL,
  RESET_REQUEST_ERROR
} from './types'

const headers = {
  headers: { 'Content-Type': 'application/json' }
}

const getDataFishRequest = () => {
  return { type: GET_DATA_FISH_REQUEST }
}

const getDataFishSuccess = allDataFish => {
  return {
    type: GET_DATA_FISH_SUCCESS,
    payload: allDataFish
  }
}

const getDataFishFail = error => {
  return {
    type: GET_DATA_FISH_FAIL,
    payload: error
  }
}

export const handleGetDataFish = () => {
  return dispatch => {
    dispatch(getDataFishRequest())

    axios
      .get('/list')
      .then(response => dispatch(getDataFishSuccess(response.data)))
      .catch(error => dispatch(getDataFishFail(error.response.data)))
  }
}

const getDataAreaRequest = () => {
  return { type: GET_DATA_AREA_REQUEST }
}

const getDataAreaSuccess = areaList => {
  return {
    type: GET_DATA_AREA_SUCCESS,
    payload: areaList
  }
}

const getDataAreaFail = error => {
  return {
    type: GET_DATA_AREA_FAIL,
    payload: error
  }
}

export const handleGetDataArea = () => {
  return dispatch => {
    dispatch(getDataAreaRequest())

    axios
      .get('/option_area')
      .then(response => dispatch(getDataAreaSuccess(response.data)))
      .catch(error => dispatch(getDataAreaFail(error.response.data)))
  }
}

const getDataSizeRequest = () => {
  return { type: GET_DATA_SIZE_REQUEST }
}

const getDataSizeSuccess = sizeList => {
  return {
    type: GET_DATA_SIZE_SUCCESS,
    payload: sizeList
  }
}

const getDataSizeFail = error => {
  return {
    type: GET_DATA_SIZE_FAIL,
    payload: error
  }
}

export const handleGetDataSize = () => {
  return dispatch => {
    dispatch(getDataSizeRequest())

    axios
      .get('/option_size')
      .then(response => dispatch(getDataSizeSuccess(response.data)))
      .catch(error => dispatch(getDataSizeFail(error.response.data)))
  }
}

const createDataRequest = () => {
  return { type: CREATE_DATA_REQUEST }
}

const createDataSuccess = () => {
  return { type: CREATE_DATA_SUCCESS }
}

const createDataFail = error => {
  return {
    type: CREATE_DATA_FAIL,
    payload: error
  }
}

export const handleCreateData = newData => {
  return dispatch => {
    dispatch(createDataRequest())

    axios
      .post('/list', newData, headers)
      .then(() => dispatch(createDataSuccess()))
      .catch(error => dispatch(createDataFail(error.response.data)))
  }
}

const deleteDataRequest = () => {
  return { type: DELETE_DATA_REQUEST }
}

const deleteDataSuccess = () => {
  return { type: DELETE_DATA_SUCCESS }
}

const deleteDataFail = error => {
  return {
    type: DELETE_DATA_FAIL,
    payload: error
  }
}

export const handleDeleteData = deleteItem => {
  return dispatch => {
    dispatch(deleteDataRequest())

    axios
      .delete('/list', {headers, data: deleteItem})
      .then(() => dispatch(deleteDataSuccess()))
      .catch(error => dispatch(deleteDataFail(error.response.data)))
  }
}

export const resetErrorRequest = () => {
  return { type: RESET_REQUEST_ERROR }
}