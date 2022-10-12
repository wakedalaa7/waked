import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/Product';
import User from '../../../models/User';


const ProductDetails: NextPage = (props: any) => {


    return (
        <AdminLayout>
            <>

                <div className="container-fluid">
                    <div className="page-header min-height-300 border-radius-xl mt-4" style={{ backgroundImage: "url('../assets/img/curved-images/curved0.jpg')" as any, backgroundPositionY: "50%" }}>
                        <span className="mask bg-gradient-primary opacity-6"></span>
                    </div>
                    <div className="card card-body shadow-blur mx-4 mt-n6 overflow-hidden">
                        <div className="row gx-4">
                            <div className="col-auto">
                                <div className="avatar avatar-xl position-relative">
                                    <img src={props.product.imagePath} alt="profile_image" className="w-100 border-radius-lg shadow-sm" />
                                </div>
                            </div>
                            <div className="col-auto my-auto">
                                <div className="h-100">
                                    <h5 className="mb-1">
                                    {props.product.name}
                                    </h5>
                                    <p className="mb-0 font-weight-bold text-sm">
                                        ID: {props.product._id}
                                    </p>
                                    <p className="mb-0 font-weight-bold text-sm">
                                        {props.product.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </AdminLayout>
    );
}

export async function getServerSideProps(context: any) {
    await dbConnect();
    const product = await Product.findById(context.query.id);
    return {
        props: {
            product: JSON.parse(JSON.stringify(product))
        },
    }
}

export default ProductDetails
