import * as type from '../Types';

const initialBucketListState = {
    BucketList: [],
    ErrorMessage: "",
    Loading: false,
}

const initialAddNewBucketState = {
    ErrorMessage: "",
    Loading: false,
    Error: false,
}

const initialUpdateBucketNameState = {
    ErrorMessage: "",
    Loading: false,
    Error: false,
}

export function getBucketList(state = initialBucketListState, action) {
    switch (action.type) {
        case type.GET_BUCKET_LIST_REQUESTED:
            return {
                ...state,
                Loading: true
            }
        case type.GET_BUCKET_LIST_SUCCESS:
            return {
                ...state,
                BucketList: action.payload,
                Loading: false
            }
        case type.GET_BUCKET_LIST_FAILED:
            return {
                ...state,
                ErrorMessage: action.mesaage,
                Loading: false
            }
        default:
            return state
    }
}

export function addNewBucket(state = initialAddNewBucketState, action) {
    switch (action.type) {
        case type.ADD_NEW_BUCKET_REQUESTED:
            return {
                ...state,
                Loading: true,
                Error: false,
                ErrorMessage: ""
            }
        case type.ADD_NEW_BUCKET_SUCCESS:
            return {
                ...state,
                Loading: false,
                ErrorMessage: action.payload.message,
                Error: action.payload.error,
            }
        case type.ADD_NEW_BUCKET_FAILED:
            return {
                ...state,
                Loading: false,
                ErrorMessage: action.payload.mesaage,
                Error: action.payload.error,
            }
        default:
            return state
    }
}

export function updateBucketName(state = initialUpdateBucketNameState, action) {
    switch (action.type) {
        case type.UPDATE_BUCKET_NAME_REQUESTED:
            return {
                ...state,
                Loading: true,
                Error: false,
                ErrorMessage: ""
            }
        case type.UPDATE_BUCKET_NAME_SUCCESS:
            return {
                ...state,
                Loading: false,
                ErrorMessage: action.payload.message,
                Error: action.payload.error
            }
        case type.UPDATE_BUCKET_NAME_FAILED:
            return {
                ...state,
                Loading: false,
                ErrorMessage: action.payload.message,
                Error: action.payload.error,
            }
        default:
            return state
    }
}