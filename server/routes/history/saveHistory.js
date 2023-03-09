import mongoose from 'mongoose'

import { history_schema } from "../../schemas/history_schema.js"

const HistorySchema = new mongoose.model("History", history_schema);

const saveHistory = async (req, res) => {
    const { playedHistory } = req.body;

    try {
        const history = new HistorySchema({
            cardName: playedHistory.cardName,
            link: playedHistory.link,
            linkType: playedHistory.linkType,
            year: playedHistory.year,
            month: playedHistory.month,
            date: playedHistory.date,
            hours: playedHistory.hours,
            mintues: playedHistory.mintues,
            seconds: playedHistory.seconds,
        })
        await history.save()
        return res.send({
            message: "History Created Succesfully",
            error: false,
        })
    } catch (error) {
        console.log(error)
    }
}

export default saveHistory;