import PostModel from '../models/Post.js'

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find();
        res.json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось загрузить товары"
        })
    }
}

export const remove = async (req, res) => {
    const postLot = req.params.lot;
    console.log(postLot)

    try {
        const doc = await PostModel.findOneAndDelete({ lot: postLot });


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
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            lot: req.body.lot,
            price: req.body.price,
            rooms: req.body.rooms,
            square: req.body.square,
            quests: req.body.quests,
            floor: req.body.floor,
            images: req.body.images,
            options: req.body.options,
            map: req.body.map
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


export const updateVisibility = async (req, res) => {
    const postLot = req.params.lot;
    const hidden = req.body.hidden;
    try {
        const doc = await PostModel.findOneAndUpdate(
            { lot: postLot },
            { 
                hidden
             },
            { new: true }
        );

        if (!doc) {
            return res.status(404).json({
                message: "Товар не найден"
            });
        }

        res.json(doc);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось обновить видимость товара"
        });
    }
};


export const updateInfo = async (req, res) => {
    const postLot = req.params.lot;
    const { hidden } = req.body;

    try {
        const doc = await PostModel.findOneAndUpdate(
            { lot: postLot },
            { 
                title: req.body.title,
                text: req.body.text,
                lot: req.body.lot,
                price: req.body.price,
                rooms: req.body.rooms,
                square: req.body.square,
                quests: req.body.quests,
                floor: req.body.floor,
                images: req.body.images,
                options: req.body.options,
                map: req.body.map
             },
            { new: true }
        );

        if (!doc) {
            return res.status(404).json({
                message: "Товар не найден"
            });
        }

        res.json(doc);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось обновить видимость товара"
        });
    }
};
