import { call, put, takeEvery } from 'redux-saga/effects';

import { deleteCardApi, getCardListApi } from "../../api/api";

function* deletingCard(action) {
    try {
        const response = yield call(deleteCardApi, action.payload.card_id);
        yield put({ type: 'DELETE_CARD_SUCCESS', payload: response.message });

        const cardList = yield call(getCardListApi, action.payload.bucket_id);
        yield put({ type: 'GET_CARD_LIST_SUCCESS', payload: cardList });

    } catch (e) {
        yield put({ type: 'DELETE_CARD_FAILED', message: e.message });
        console.log(e.message);
    }
}

function* deleteCard() {
    yield takeEvery('DELETE_CARD_REQUESTED', deletingCard);
}

export default deleteCard;