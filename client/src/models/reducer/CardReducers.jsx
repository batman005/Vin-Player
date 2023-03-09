import * as type from '../Types';

const initialCardListState = {
    CardList: [],
    ErrorMessage: "",
    Loading: false,
}

const initialAddNewCardState = {
    ErrorMessage: "",
    Loading: false,
    Error: false,
}

const initialDeleteCardState = {
    ErrorMessage: "",
    Loading: false,
    Error: false,
}

const initialUpdateCardState = {
    ErrorMessage: "",
    Loading: false,
    Error: false
}

export function getCardList(state = initialCardListState, action) {
    switch (action.type) {
        case type.GET_CARD_LIST_REQUESTED:
            return {
                ...state,
                Loading: true
            }
        case type.GET_CARD_LIST_SUCCESS:
            return {
                ...state,
                CardList: action.payload,
                Loading: false
            }
        case type.GET_CARD_LIST_FAILED:
            return {
                ...state,
                ErrorMessage: action.mesaage,
                Loading: false
            }
        default:
            return state
    }
}

export function addNewCard(state = initialAddNewCardState, action) {
    switch (action.type) {
        case type.ADD_NEW_CARD_REQUESTED:
            return {
                ...state,
                Loading: true,
                Error: false,
                ErrorMessage: ""
            }
        case type.ADD_NEW_CARD_SUCCESS:
            return {
                ...state,
                Loading: false,
                ErrorMessage: action.payload.message,
                Error: action.payload.error,
            }
        case type.ADD_NEW_CARD_FAILED:
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

export function deleteCard(state = initialDeleteCardState, action) {
    switch (action.type) {
        case type.DELETE_CARD_REQUESTED:
            return {
                ...state,
                Loading: true,
                Error: false,
                ErrorMessage: ""
            }
        case type.DELETE_CARD_SUCCESS:
            return {
                ...state,
                Loading: false,
                ErrorMessage: action.payload.message,
                Error: action.payload.error,
            }
        case type.DELETE_CARD_FAILED:
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

export function updateCard(state = initialUpdateCardState, action) {
    switch (action.type) {
        case type.UPDATE_CARD_REQUESTED:
            return {
                ...state,
                Loading: true,
                Error: false,
                ErrorMessage: ""
            }
        case type.UPDATE_CARD_SUCCESS:
            return {
                ...state,
                Loading: false,
                ErrorMessage: action.payload.message,
                Error: action.payload.error,
            }
        case type.UPDATE_CARD_FAILED:
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