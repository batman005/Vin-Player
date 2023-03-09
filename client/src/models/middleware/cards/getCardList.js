import { call, put, takeEvery } from 'redux-saga/effects';

import { getCardListApi } from "../../api/api";

function* fetchCardList(action) {
    try {
        const cardList = yield call(getCardListApi, action.payload);
        yield put({ type: 'GET_CARD_LIST_SUCCESS', payload: cardList });
    } catch (e) {
        yield put({ type: 'GET_CARD_LIST_FAILED', message: e.message });
    }
}

function* getCardList() {
    yield takeEvery('GET_CARD_LIST_REQUESTED', fetchCardList);
}

export default getCardList;
