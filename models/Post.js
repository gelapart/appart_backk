import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
    },
    lot: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    rooms: {
        type: String,
        required: true
    },
    square: {
        type: String,
        required: true
    },
    quests: {
        type: String,
        required: true
    },
    floor: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    options: {
        type: Map,
        of: Boolean,
        default: {}
    },
    map: {
        type: String,
        required: true
    }
    
}, {
    timestamps: true,
});

export default mongoose.model('Post', PostSchema);