import { call, put, takeEvery } from 'redux-saga/effects';

import { saveHistoryApi, getHistoryListApi } from "../../api/api";

function* savingHistory(action) {
    try {
        const response = yield call(saveHistoryApi, action.payload);
        yield put({ type: 'SAVE_HISTORY_SUCCESS', payload: response });

    } catch (e) {
        yield put({ type: 'SAVE_HISTORY_FAILED', message: e.message });
    }
}

function* saveHistory() {
    yield takeEvery('SAVE_HISTORY_REQUESTED', savingHistory);
}

export default saveHistory;

