import { combineReducers } from 'redux';
import { getBucketList, addNewBucket, updateBucketName } from './BucketListReducers';
import { addNewCard, getCardList, deleteCard, updateCard } from './CardReducers';
import { saveHistory, getHistoryList } from './HistoryReducers'

//defining root reducer
const rootReducer = combineReducers({
    getBucketList,
    addNewBucket,
    addNewCard,
    getCardList,
    updateBucketName,
    deleteCard,
    updateCard,
    saveHistory,
    getHistoryList,
})

export default rootReducer;