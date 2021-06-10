import {
  GET_DATA_FISH_REQUEST,
  GET_DATA_FISH_SUCCESS,
  GET_DATA_FISH_FAIL,

  // GET_DATA_AREA_REQUEST,
  // GET_DATA_AREA_SUCCESS,
  // GET_DATA_AREA_FAIL,

  // GET_DATA_SIZE_REQUEST,
  // GET_DATA_SIZE_SUCCESS,
  // GET_DATA_SIZE_FAIL,

  // CREATE_DATA_REQUEST,
  // CREATE_DATA_SUCCESS,
  // CREATE_DATA_FAIL,

  // UPDATE_DATA_REQUEST,
  // UPDATE_DATA_SUCCESS,
  // UPDATE_DATA_FAIL,

  DELETE_DATA_REQUEST,
  DELETE_DATA_SUCCESS,
  DELETE_DATA_FAIL,

  RESET_REQUEST_ERROR
} from './types'

const initState = {
  isLoading: false,
  isLoadingButton: false,
  allDataFish: [],
  dataArea: [],
  dataSize: [],
  error: null,
  isRequestSuccess: null
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case GET_DATA_FISH_REQUEST:
      return {
        ...state,
        isLoading: true
      }

    case GET_DATA_FISH_SUCCESS:
      return {
        ...state,
        allDataFish: action.payload,
        isLoading: false,
      }

    case GET_DATA_FISH_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
  
    // case GET_DATA_AREA_REQUEST:
    //   return {
    //     ...state,
    //     isLoading: true
    //   }

    // case GET_DATA_AREA_SUCCESS:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     allDataFish: action.payload,
    //     isRequestSuccess: true
    //   }

    // case GET_DATA_AREA_FAIL:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     error: action.payload,
    //   }

    case DELETE_DATA_REQUEST:
      return {
        ...state,
        isLoadingButton: true
      }

    case DELETE_DATA_SUCCESS:
      return {
        ...state,
        isRequestSuccess: true,
        isLoadingButton: false,
      }

    case DELETE_DATA_FAIL:
      return {
        ...state,
        isLoadingButton: false,
        error: action.payload,
      }

    case RESET_REQUEST_ERROR: {
      return {
        ...state,
        isRequestSuccess: null,
        error: null
      }
    }
  
    default:
      return state
  }
}

export default reducer