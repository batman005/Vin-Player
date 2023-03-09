import mongoose from 'mongoose'

import { history_schema } from "../../schemas/history_schema.js"

const HistorySchema = new mongoose.model("History", history_schema);

const getHistoryList = async (req, res) => {
    try {
        const historyList = await HistorySchema.find({});
        return res.send(
            historyList.filter(list => { return list.hidden === false })
        );
    } catch (error) {
        console.log(error);
    }
};

export default getHistoryList;
