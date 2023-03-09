import { call, put, takeEvery } from 'redux-saga/effects';

import { addNewBucketApi, getBucketListApi } from "../../api/api";

function* addBucket(action) {
    try {
        const response = yield call(addNewBucketApi, action.payload);
        yield put({ type: 'ADD_NEW_BUCKET_SUCCESS', payload: response });

        const bucketList = yield call(getBucketListApi);
        yield put({ type: 'GET_BUCKET_LIST_SUCCESS', payload: bucketList });

    } catch (e) {
        yield put({ type: 'ADD_NEW_BUCKET_FAILED', message: e.message });
    }
}

function* addNewBucket() {
    yield takeEvery('ADD_NEW_BUCKET_REQUESTED', addBucket);
}

export default addNewBucket;
