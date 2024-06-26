import ArticleModel from '../models/Article.js'

export const getAll = async (req, res) => {
    try {
        const posts = await ArticleModel.find();
        res.json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось загрузить товары"
        })
    }
}

export const remove = async (req, res) => {
    const postTitle = req.params.name;

    try {
        const doc = await ArticleModel.findOneAndDelete({ title: postTitle });


        if (!doc) {
            return res.status(404).json({
                message: "Статья не найдена"
            });
        }

        res.json({
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось удалить статью"
        });
    }
}

export const create = async (req, res) => {
    try {
        const doc = new ArticleModel({
            title: req.body.title,
            code: req.body.code,
            seoTitle: req.body.seoTitle,
            seoDescription: req.body.seoDescription,
            prewieImage: req.body.prewieImage

        });

        const post = await doc.save();

        res.json(post)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось создать товар"
        })
    }
}

