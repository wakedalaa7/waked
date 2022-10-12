// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose, { MongooseError } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import withAuth, { NextApiRequestWithAuth } from '../../../middlewares/withAuth'
import Product from '../../../models/Product'

const handler = async (req: NextApiRequestWithAuth, res: NextApiResponse<any>) => {
    const { method } = req

    const productId = req.query.id;

    await dbConnect();
    switch (method) {
        case 'DELETE':
            try {
                // return res.send({'hi': 'hi'});
                const product = await Product.findByIdAndDelete(productId);
                return res.send(product);
            }
            catch (err: any) {
                console.log(err.code);
                return res.status(400).json({
                    message: err.toString()
                })
            }
            break

        default:
            return res.status(400).json({ success: false });
    }
}
export default handler;
