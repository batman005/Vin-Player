import { call, put, takeEvery } from 'redux-saga/effects';

import { addNewCardApi, getCardListApi } from "../../api/api";

function* addCard(action) {
    try {
        const response = yield call(addNewCardApi, action.payload);
        yield put({ type: 'ADD_NEW_CARD_SUCCESS', payload: response });

        const cardList = yield call(getCardListApi, action.payload.Bucket_id);
        yield put({ type: 'GET_CARD_LIST_SUCCESS', payload: cardList });

    } catch (e) {
        yield put({ type: 'ADD_NEW_CARD_FAILED', message: e.message });
    }
}

function* addNewCard() {
    yield takeEvery('ADD_NEW_CARD_REQUESTED', addCard);
}

export default addNewCard;
