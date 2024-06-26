import CallModel from "../models/Call.js"


export const getAll = async (req, res) => {
    try {
        const calls = await CallModel.find();
        res.json(calls)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось загрузить товары"
        })
    }
}

export const sendCall = async(req, res) => {
    try {
        const doc = new CallModel({
            question: req.body.question,
            phone: req.body.phone,
            entry: req.body.entry,
            exit: req.body.exit,
            quests: req.body.quests
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

export const remove = async (req, res) => {
    const id = req.params.id;

    try {
        const doc = await CallModel.findOneAndDelete({ _id: id });


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