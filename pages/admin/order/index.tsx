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
import User from '../../../models/User';


const Orders: NextPage = (props: any) => {
    useEffect(() => {
        console.log(props.products);
    })
    return (
        <AdminLayout>

            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-12">
                        <div className="card mb-4">
                            <div className="card-header pb-0">
                                <h6>Users</h6>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                                <div className="table-responsive p-0">
                                    <table className="table align-items-center mb-0">
                                        <thead>
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Order Id</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Transaction Id</th>
                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Total paid</th>
                                                <th className="text-secondary opacity-7"></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {props.orders.map((order: any) => (
                                                <tr>
                                                    <td>
                                                        <div className="d-flex px-2 py-1">
                                                            <div className="d-flex flex-column justify-content-center">
                                                                <h6 className="mb-0 text-sm">{order._id}</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className="text-xs font-weight-bold mb-0">{order.transaction.id}</p>
                                                    </td>
                                                    <td className="align-middle text-center text-sm">
                                                        <p className="text-xs font-weight-bold mb-0">{order.cart?.items.map((item: any) => item.product.name).join(', ')}</p>
                                                    </td>
                                                    <td className="align-middle text-center text-sm">
                                                        <p className="text-xs font-weight-bold mb-0">${order.cart?.total}</p>
                                                    </td>
                                                    <td className="align-middle">
                                                        <a href={`/admin/order/${order._id}`} className="badge badge-sm bg-gradient-primary text-white font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                            view
                                                        </a>
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
                        <h2 className="font-bold text-lg mb-10">Orders</h2>
                        <table className="w-full">
                            <thead className="text-left">
                                <tr>
                                    <th className="w-1/6 pl-3 pb-10 text-sm font-extrabold tracking-wide">Order Id</th>
                                    <th className="w-1/6 pl-3 pb-10 text-sm font-extrabold tracking-wide">Transaction Id</th>
                                    <th className="w-1/6 pb-10 text-sm font-extrabold tracking-wide">Name</th>
                                    <th className="w-1/6 pb-10 text-sm font-extrabold tracking-wide">Total Paid</th>
                                    <th className="pb-10 text-sm font-extrabold tracking-wide text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-left text-gray-600">
                                {props.orders.map((order: any) => (
                                    <tr className="border-y border-gray-200" key={order._id}>
                                        <th className="mb-4 pl-3 text-xs font-extrabold tracking-wider">{order.id}</th>
                                        <th className="mb-4 pl-3 text-xs font-extrabold tracking-wider">{order.transaction.id}</th>
                                        <th className="my-2 text-xs font-extrabold tracking-wider flex flex-row items-center w-full">
                                            <p className="ml-3 name-1">{order.cart?.items.map((item: any) => item.product.name).join(', ')}</p>
                                        </th>
                                        <th className="mb-4 text-xs font-extrabold tracking-wider ">${order.cart?.total}</th>
                                        <th className="mb-4 text-xs font-extrabold tracking-wider text-right py-1">
                                            <a href={`/admin/order/${order._id}`} className="py-2 rounded-md px-5 bg-primary text-white">View</a>
                                        </th>

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
    const orders = await Order.find();
    return {
        props: {
            orders: JSON.parse(JSON.stringify(orders))
        },
    }
}

export default Orders
