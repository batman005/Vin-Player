import mongoose from 'mongoose';

// Creating Schema (document structure)
export const card_schema = new mongoose.Schema({
    bucket_id: {
        type: String,
        required: true
    },
    date: { type: Date, default: Date.now },
    hidden: {
        type: Boolean,
        default: false,
    },
    cardName: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    linkType: {
        type: String,
        required: true
    },
})
