import nextConnect from 'next-connect';
import multer from 'multer';
import Product from '../../../models/Product';
import mongoose from 'mongoose';
import { uploadDirectories } from '../../../uploadDirectories';
import News from '../../../models/News';

const upload = multer({
    storage: multer.diskStorage({
        destination: `./public/${uploadDirectories.news}`,
        filename: (req, file, cb) => cb(null, file.originalname),
    }),
});

const apiRoute = nextConnect({
    onError(error, req, res: any) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(upload.single('image'));

apiRoute.post(async (req: any, res: any) => {
    console.log(req.file?.filename);

    try {
        const news = await News.create({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            image: req.file?.filename,
            description: req.body.description,
        });
        return res.send(news);
    }
    catch (err: any) {
        console.log(err.code);
        return res.status(400).json({
            message: err.toString()
        })
    }
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};