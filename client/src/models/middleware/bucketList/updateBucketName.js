import { call, put, takeEvery } from 'redux-saga/effects';

import { updateBucketNameApi, getBucketListApi } from "../../api/api";

function* updateBucket(action) {
    try {
        const response = yield call(updateBucketNameApi, action.payload);
        yield put({ type: 'UPDATE_BUCKET_NAME_SUCCESS', payload: response });

        const bucketList = yield call(getBucketListApi);
        yield put({ type: 'GET_BUCKET_LIST_SUCCESS', payload: bucketList });

    } catch (e) {
        yield put({ type: 'UPDATE_BUCKET_NAME_FAILED', message: e.message });
    }
}

function* updateBucketName() {
    yield takeEvery('UPDATE_BUCKET_NAME_REQUESTED', updateBucket);
}

export default updateBucketName;
