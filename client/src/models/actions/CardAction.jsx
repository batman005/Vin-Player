import * as type from '../Types';

export function addNewCard(cardFormValues) {
    return {
        type: type.ADD_NEW_CARD_REQUESTED,
        payload: cardFormValues
    }
}

export function getCardList(bucket_id) {
    return {
        type: type.GET_CARD_LIST_REQUESTED,
        payload: bucket_id,
    }
}

export function deleteCard(card_id) {
    return {
        type: type.DELETE_CARD_REQUESTED,
        payload: card_id
    }
}

export function updateCard(formValues) {
    return {
        type: type.UPDATE_CARD_REQUESTED,
        payload: formValues
    }
}