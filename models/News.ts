import mongoose from 'mongoose';

import path from 'path';
import { uploadDirectories } from '../uploadDirectories';
import { getPath } from '../utilities/utility'

const NewsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    image: String,
    description: String,
}, { timestamps: true});

NewsSchema.set('toJSON', { virtuals: true })

NewsSchema.virtual('imagePath').get(function () {
    return this.image ? getPath(path.join(uploadDirectories.news, this.image)) : null;
})


export default mongoose.models.News || mongoose.model('News', NewsSchema)