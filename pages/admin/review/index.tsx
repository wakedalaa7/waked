import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import dbConnect from '../../../lib/dbConnect';
import Cart from '../../../models/Cart';
import CartItem from '../../../models/CartItem';
import Order from '../../../models/Order';
import Product from '../../../models/Product';
import Review from '../../../models/Review';
import User from '../../../models/User';


const Reviews: NextPage = (props: any) => {
    useEffect(() => {
        console.log(props.reviews);
    })
    return (
        <AdminLayout>

            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-12">
                        <div className="card mb-4">
                            <div className="card-header pb-0">
                                <h6>Reviews</h6>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                                <div className="table-responsive p-0">
                                    <table className="table align-items-center mb-0">
                                        <thead>
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">User</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Product</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Rating</th>
                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Feedback</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {props.reviews.map((review: any) => (
                                                <tr>
                                                    <td>
                                                        <div className="d-flex px-2 py-1">
                                                            <div className="d-flex flex-column justify-content-center">
                                                                <h6 className="mb-0 text-sm">{review.user.firstname}</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className="text-xs font-weight-bold mb-0">{review.product.name}</p>
                                                    </td>
                                                    <td className="align-middle text-center text-sm">
                                                        <p className="text-xs font-weight-bold mb-0">{review.rating}</p>
                                                    </td>
                                                    <td className="align-middle text-center text-sm">
                                                        <p className="text-xs font-weight-bold mb-0">{review.text}</p>
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
            {/* <div className="p-5 rounded-lg bg-white">
                <div className="card">
                    <div className="card-body">
                        <h2 className="font-bold text-lg mb-10">Review</h2>
                        <table className="w-full">
                            <thead className="text-left">
                                <tr> 
                                    <th className="w-1/6 pl-3 pb-10 text-sm font-extrabold tracking-wide">User</th>
                                    <th className="w-1/6 pb-10 text-sm font-extrabold tracking-wide">Product</th>
                                    <th className="w-1/6 pb-10 text-sm font-extrabold tracking-wide">Rating</th>
                                    <th className="w-1/6 pb-10 text-sm font-extrabold tracking-wide">Feedback</th>
                                </tr>
                            </thead>
                            <tbody className="text-left text-gray-600">
                                {props.reviews.map((review: any) => (
                                    <tr className="border-y border-gray-200" key={review._id}>
                                        <th className="mb-4 pl-3 text-xs font-extrabold tracking-wider">{review.user.firstname}</th>
                                        <th className="mb-4 pl-3 text-xs font-extrabold tracking-wider">{review.product.name}</th>
                                        <th className="my-2 text-xs font-extrabold tracking-wider flex flex-row items-center w-full">
                                            <p className="ml-3 name-1">{review.rating}</p>
                                        </th>
                                        <th className="mb-4 text-xs font-extrabold tracking-wider ">${review.text}</th>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> */}
        </AdminLayout>
    );
}

export async function getServerSideProps(context: any) {
    Cart; CartItem; Product; User;
    await dbConnect();
    const reviews = await Review.find();
    return {
        props: {
            reviews: JSON.parse(JSON.stringify(reviews))
        },
    }
}

export default Reviews
