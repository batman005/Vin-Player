import mongoose from "mongoose";

import { card_schema } from "../../schemas/card_schema.js";

const CardSchema = new mongoose.model("Card", card_schema);

const getCardList = async (req, res) => {
    const { bucket_id } = req.body;
    try {
        const cardList = await CardSchema.find({
            bucket_id: bucket_id
        });
        return res.send(
            cardList.filter(list => { return list.hidden === false })
        );
    } catch (error) {
        console.log(error);
    }
};

export default getCardList;
