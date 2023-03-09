import mongoose from 'mongoose';

// Creating Schema (document structure)
export const bucket_list = new mongoose.Schema({
    bucketName: {
        type: String,
        required: true
    },
    date: { type: Date, default: Date.now },
    hidden: {
        type: Boolean,
        default: false,
    },
    cards: Array,
})
