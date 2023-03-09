import axios from "axios";
import { base_url } from "./url.js";

const api = axios.create({
    baseURL: base_url,
});

export const getBucketListApi = async () => {
    try {
        const response = await api.get("/getBucketList");
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const addNewBucketApi = async (bucketName) => {
    const response = await api.post("/addNewBucket", { bucketName });
    return response.data;
};

export const updateBucketNameApi = async (updateBucketNameFormValues) => {
    try {
        const response = await api.post("/updateBucketName", { updateBucketNameFormValues });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getCardListApi = async (bucket_id) => {
    try {
        const response = await api.post("/getCardList", { bucket_id });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const addNewCardApi = async (cardFormValues) => {
    const response = await api.post("/addNewCard", { cardFormValues });
    return response.data;
};

export const deleteCardApi = async (card_id) => {
    try {
        const response = await api.post("/deleteCard", { card_id });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateCardApi = async (cardFormValues) => {
    try {
        const response = await api.post("/updateCard", { cardFormValues });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getHistoryListApi = async () => {
    try {
        const response = await api.get("/getHistoryList");
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const saveHistoryApi = async (playedHistory) => {
    try {
        const response = await api.post("/saveHistory", { playedHistory });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
