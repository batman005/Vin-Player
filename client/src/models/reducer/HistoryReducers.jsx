import * as type from '../Types'

const initialHistoryState = {
    ErrorMessage: "",
    Error: false,
    Loading: false
}

const initialHistoryListState = {
    HistoryList: [],
    ErrorMessage: "",
    Loading: false,
}

export function saveHistory(state = initialHistoryState, action) {
    switch (action.type) {
        case type.SAVE_HISTORY_REQUESTED:
            return {
                ...state,
                Loading: true,
                Error: false,
                ErrorMessage: ""
            }
        case type.SAVE_HISTORY_SUCCESS:
            return {
                ...state,
                Loading: false,
                ErrorMessage: action.payload.message,
                Error: action.payload.error,
            }
        case type.SAVE_HISTORY_FAILED:
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

export function getHistoryList(state = initialHistoryListState, action) {
    switch (action.type) {
        case type.GET_HISTORY_LIST_REQUESTED:
            return {
                ...state,
                Loading: true
            }
        case type.GET_HISTORY_LIST_SUCCESS:
            return {
                ...state,
                HistoryList: action.payload,
                Loading: false
            }
        case type.GET_HISTORY_LIST_FAILED:
            return {
                ...state,
                ErrorMessage: action.mesaage,
                Loading: false
            }
        default:
            return state
    }
}