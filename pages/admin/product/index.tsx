import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import AdminLayout from '../../../layouts/AdminLayout';
import axios from '../../../lib/axios';
import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/Product';
import User from '../../../models/User';


const Products: NextPage = (props: any) => {
    useEffect(() => {
        console.log(props.products);
    })

    const deleteProduct = (productId: any) => {

        toast.promise(axios.delete(`/product/${productId}`).then(res => {
            console.log(res);
            location.reload();
        }), {
            pending: 'Deleting product',
            success: 'Product deleted',
            error: 'Product can not be deleted'
        })
    }


    return (
        <AdminLayout>

            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-12">
                        <div className="card mb-4">
                            <div className="card-header pb-0">
                                <Link href="/admin/product/add" passHref>
                                    <a className="py-2 rounded-md px-5 bg-primary text-white">add product</a>
                                </Link>
                                <h6>Products</h6>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                                <div className="table-responsive p-0">
                                    <table className="table align-items-center mb-0">
                                        <thead>
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Id</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Name</th>
                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Price</th>
                                                <th className="text-secondary opacity-7"></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {props.products.map((product: any) => (
                                                <tr>
                                                    <td>
                                                        <div className="d-flex px-2 py-1">
                                                            <div>
                                                                <img src={product.imagePath} className="avatar avatar-sm me-3" alt="user1" />
                                                            </div>
                                                            <div className="d-flex flex-column justify-content-center">
                                                                <h6 className="mb-0 text-sm">{product._id}</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className="text-xs font-weight-bold mb-0">{product.name}</p>
                                                    </td>
                                                    <td className="align-middle text-center text-sm">
                                                        <p className="text-xs font-weight-bold mb-0">{product.price}</p>
                                                    </td>
                                                    <td className="align-middle">
                                                        <a href={`/admin/product/${product._id}`} className="badge badge-sm bg-gradient-primary text-white font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                            view
                                                        </a>
                                                        <button onClick={() => deleteProduct(product._id)} className="badge badge-sm bg-gradient-primary text-white font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                            delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export async function getServerSideProps(context: any) {
    await dbConnect();
    const products = await Product.find();
    return {
        props: {
            products: JSON.parse(JSON.stringify(products))
        },
    }
}

export default Products
