import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import dbConnect from '../../../lib/dbConnect';
import Order from '../../../models/Order';
import Product from '../../../models/Product';
import User from '../../../models/User';


const OrderDetails: NextPage = (props: any) => {


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
                                    <img src="https://source.unsplash.com/random/?bill" alt="profile_image" className="w-100 border-radius-lg shadow-sm" />
                                </div>
                            </div>
                            <div className="col-auto my-auto">
                                <div className="h-100">
                                    <h5 className="mb-1">
                                        ${props.order.cart.total}
                                    </h5>
                                    <p className="mb-0 font-weight-bold text-sm">
                                        <strong>Transaction ID</strong>: {props.order.transaction.id}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 mt-4 container-fluid">
                    <div className="card mb-4">
                        <div className="card-header pb-0 p-3">
                            <h6 className="mb-1">Address</h6>
                        </div>
                        <div className="card-body p-3">
                            <div className="d-flex flex-column">
                                <span className="mb-2 text-xs">First Name: <span className="text-dark font-weight-bold ms-sm-2">{props.order.address.firstname}</span></span>
                                <span className="mb-2 text-xs">Last Name: <span className="text-dark ms-sm-2 font-weight-bold">{props.order.address.lastname}</span></span>
                                <span className="mb-2 text-xs">Email: <span className="text-dark ms-sm-2 font-weight-bold">{props.order.address.email}</span></span>
                                <span className="mb-2 text-xs">Mobile: <span className="text-dark ms-sm-2 font-weight-bold">{props.order.address.mobile}</span></span>
                                <span className="mb-2 text-xs">Address: <span className="text-dark ms-sm-2 font-weight-bold">{props.order.address.address}</span></span>
                                <span className="mb-2 text-xs">Country: <span className="text-dark ms-sm-2 font-weight-bold">{props.order.address.country}</span></span>
                                <span className="mb-2 text-xs">City: <span className="text-dark ms-sm-2 font-weight-bold">{props.order.address.city}</span></span>
                                <span className="mb-2 text-xs">State: <span className="text-dark ms-sm-2 font-weight-bold">{props.order.address.state}</span></span>
                                <span className="mb-2 text-xs">Zip: <span className="text-dark ms-sm-2 font-weight-bold">{props.order.address.zip}</span></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-4 container-fluid">
                    <div className="card mb-4">
                        <div className="card-header pb-0 p-3">
                            <h6 className="mb-1">Products</h6>
                        </div>
                        <div className="card-body p-3">
                            <table className="table align-items-center mb-0">
                                <thead>
                                    <tr>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Id</th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Name</th>
                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Quantity</th>
                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Price</th>
                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Sub Total</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {props.order.cart.items.map((item: any) => (
                                        <tr>
                                            <td>
                                                <a className='text-blue-800 hover:underline' href={`/admin/user/${props.order.user.id}`}>{props.order.user.firstname}</a>
                                            </td>
                                            <td>
                                                <p className="text-xs font-weight-bold mb-0">${item.product.price}</p>
                                            </td>
                                            <td className="align-middle text-center text-sm">
                                                <p className="text-xs font-weight-bold mb-0">{item.quantity}</p>
                                            </td>
                                            <td className="align-middle text-center text-sm">
                                                <p className="text-xs font-weight-bold mb-0">${item.sub_total}</p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        </AdminLayout>
    );
}

export async function getServerSideProps(context: any) {
    await dbConnect();
    const order = await Order.findById(context.query.id);
    return {
        props: {
            order: JSON.parse(JSON.stringify(order))
        },
    }
}

export default OrderDetails
