import mongoose from 'mongoose'

import { card_schema } from "../../schemas/card_schema.js"

const CardSchema = new mongoose.model("Card", card_schema);

const updateCard = (req, res) => {
    const { cardFormValues } = req.body

    CardSchema.findByIdAndUpdate(
        { _id: cardFormValues.card_id },
        {
            $set: {
                bucket_id: cardFormValues.bucket_id,
                cardName: cardFormValues.cardName,
                link: cardFormValues.link,
                linkType: cardFormValues.linkType,
            }
        },
        (err, list) => {
            if (err) {
                console.log(err)
            } else {
                if (list) {
                    return res.send({
                        message: "Card Updated Successfully",
                        error: false
                    })
                }
            }
        }
    )
}

export default updateCard;