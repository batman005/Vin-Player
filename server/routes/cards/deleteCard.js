import mongoose from 'mongoose'

import { card_schema } from "../../schemas/card_schema.js"

const CardSchema = new mongoose.model("Card", card_schema);

const deleteCard = async (req, res) => {
    const { card_id } = req.body;

    try {
        const card = await CardSchema.deleteOne({ "_id": card_id })
        if (card) {
            return res.send({
                message: "deleted"
            })
        } else {
            console.log("err")
        }
    } catch (error) {
        console.log(error);
    }
}

export default deleteCard;