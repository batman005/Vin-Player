import mongoose from 'mongoose';

export const history_schema = new mongoose.Schema({
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
    year: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    hours: {
        type: String,
        required: true
    },
    mintues: {
        type: String,
        required: true
    },
    seconds: {
        type: String,
        required: true
    },
})
