import * as type from '../Types';

export function getBucketList() {
    return {
        type: type.GET_BUCKET_LIST_REQUESTED,
    }
}

export function addNewBucket(bucketName) {
    return {
        type: type.ADD_NEW_BUCKET_REQUESTED,
        payload: bucketName
    }
}

export function updateBucket(updateBucketNameFormValues) {
    return {
        type: type.UPDATE_BUCKET_NAME_REQUESTED,
        payload: updateBucketNameFormValues
    }
}