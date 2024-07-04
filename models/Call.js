import mongoose from "mongoose";

const CallSchema = new mongoose.Schema({
    question: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
    entry: {
        type: String
    },
    exit: {
        type: String
    },
    quests: {
        type: String
    },
    hidden: {
        type: String
    },
    title: {
        type: String
    },
    lot: {
        type: String
    },
    date: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

export default mongoose.model('Call', CallSchema);