import { call, put, takeEvery } from 'redux-saga/effects';

import { getHistoryListApi } from "../../api/api";

function* fetchHistoryList(action) {
    try {
        const historyList = yield call(getHistoryListApi);
        yield put({ type: 'GET_HISTORY_LIST_SUCCESS', payload: historyList });
    } catch (e) {
        yield put({ type: 'GET_HISTORY_LIST_FAILED', message: e.message });
    }
}

function* getHistoryList() {
    yield takeEvery('GET_HISTORY_LIST_REQUESTED', fetchHistoryList);
}

export default getHistoryList;
