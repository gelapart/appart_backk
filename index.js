import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import chalk from 'chalk';


import checkAdmin from './utils/checkAdmin.js';
import handleValidationErrors from './utils/handleValidationErrors.js';

import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors'
// import {PostController, UserController} from './controllers/index.js'

import * as PostController from './controllers/PostController.js'
import * as UserController from './controllers/UserController.js'
import checkAuth from './utils/checkAuth.js';
import { ArticleController, CallController } from './controllers/index.js';


const errorMsg = chalk.bgWhite.redBright;
const successMsg = chalk.bgGreen.white;


// mongoose.connect(process.env.MONGODB_URI)
mongoose.connect('mongodb+srv://gelapart:wwwwww@cluster0.9gja8yf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log(successMsg("DB ok")))
.catch((err) => console.log(errorMsg("DB error:", err)))

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.post('/auth/login', handleValidationErrors, UserController.login)
app.post('/auth/register', handleValidationErrors, UserController.register)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})


app.get('/posts', PostController.getAll);
app.post('/posts', checkAuth , PostController.create);
app.delete('/posts/:lot', checkAuth, PostController.remove);




app.get('/article', ArticleController.getAll);
app.post('/article', checkAuth , ArticleController.create);
app.delete('/article/:name', checkAuth, ArticleController.remove);




app.get('/calls', CallController.getAll)
app.post('/calls', CallController.sendCall)
app.delete('/calls/:id', CallController.remove)


const port = 3001

app.listen(port, function(){
    console.log(successMsg("listening port:", port));
  });



