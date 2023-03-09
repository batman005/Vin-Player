import { all } from 'redux-saga/effects'
import getBucketList from './bucketList/getBucketList.js'
import addNewBucket from './bucketList/addNewBucket.js'
import addNewCard from './cards/addNewCard.js'
import updateBucketName from './bucketList/updateBucketName.js'
import getCardList from './cards/getCardList.js'
import deleteCard from './cards/deleteCard.js'
import updateCard from './cards/updateCard.js'
import saveHistory from './history/saveHistory.js'
import getHistoryList from './history/getHistoryList.js'

export default function* rootSaga() {
    yield all([
        getBucketList(),
        addNewBucket(),
        addNewCard(),
        updateBucketName(),
        getCardList(),
        deleteCard(),
        updateCard(),
        saveHistory(),
        getHistoryList(),
    ])
}