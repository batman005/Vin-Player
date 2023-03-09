import { call, put, takeEvery } from 'redux-saga/effects';

import { getCardListApi, updateCardApi } from "../../api/api";

function* updatingCard(action) {
    try {
        const response = yield call(updateCardApi, action.payload);
        yield put({ type: 'UPDATE_CARD_SUCCESS', payload: response });
        const cardList = yield call(getCardListApi, action.payload.bucket_id);
        yield put({ type: 'GET_CARD_LIST_SUCCESS', payload: cardList });

    } catch (error) {
        yield put({ type: 'UPDATE_CARD_FAILED' });
    }
}

function* updateCard() {
    yield takeEvery('UPDATE_CARD_REQUESTED', updatingCard);
}

export default updateCard;