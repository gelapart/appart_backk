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
}, {
    timestamps: true,
});

export default mongoose.model('Call', CallSchema);