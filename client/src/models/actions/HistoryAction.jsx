import * as type from "../Types"

export function saveHistory(playedHistory) {
    return {
        type: type.SAVE_HISTORY_REQUESTED,
        payload: playedHistory
    }
}

export function getHistoryList() {
    return {
        type: type.GET_HISTORY_LIST_REQUESTED
    }
}