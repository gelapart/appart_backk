import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    seoTitle: {
        type: String,
        required: true
    },
    seoDescription: {
        type: String,
        required: true
    },
    prewieImage: {
        type: String,
        required: true
    }
})

export default mongoose.model('Article', ArticleSchema);