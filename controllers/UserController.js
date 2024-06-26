import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import UserModel from './../models/User.js';

export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const hash = await argon2.hash(password);

        const doc = new UserModel({
            email: req.body.email,
            passwordHash: hash,
            role: req.body.role
        });

        const user = await doc.save();

        const token = jwt.sign({
            _id: user._id
        }, 'secret123', {
            expiresIn: "30d",
        });

        const { passwordHash, ...userData } = user._doc;
        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось зарегистрироваться",
        });
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                message: "Пользователь не найден"
            });
        }

        const isValidPass = await argon2.verify(user._doc.passwordHash, req.body.password);

        if (!isValidPass) {
            return res.status(400).json({
                message: "Неверный логин или пароль"
            });
        }

        const token = jwt.sign({
            _id: user._id,
        }, 'secret123', {
            expiresIn: "30d",
        });

        const { passwordHash, ...userData } = user._doc;
        res.json({
            ...userData,
            token,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось авторизоваться"
        });
    }
}
