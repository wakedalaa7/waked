import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import dbConnect from '../../../lib/dbConnect';
import News from '../../../models/News';
import Product from '../../../models/Product';
import User from '../../../models/User';


const Newses: NextPage = (props: any) => {
    useEffect(() => {
        console.log(props.newses);
    })
    return (
        <AdminLayout>

            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-12">
                        <div className="card mb-4">
                            <div className="card-header pb-0">
                                <Link href="/admin/news/add" passHref>
                                    <a className="py-2 rounded-md px-5 bg-primary text-white">add news</a>
                                </Link>
                                <h6>Newses</h6>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                                <div className="table-responsive p-0">
                                    <table className="table align-items-center mb-0">
                                        <thead>
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Id</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Title</th>
                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Description</th>
                                                <th className="text-secondary opacity-7"></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {props.newses.map((news: any) => (
                                                <tr>
                                                    <td>
                                                        <div className="d-flex px-2 py-1">
                                                            <div>
                                                                <img src={news.imagePath} className="avatar avatar-sm me-3" alt="user1" />
                                                            </div>
                                                            <div className="d-flex flex-column justify-content-center">
                                                                <h6 className="mb-0 text-sm">{news._id}</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className="text-xs font-weight-bold mb-0">{news.title}</p>
                                                    </td>
                                                    <td className="align-middle text-center text-sm">
                                                        <p className="text-xs font-weight-bold mb-0" style={{ overflow: 'hidden', maxWidth: '70ch'}} >{news.description}</p>
                                                    </td>
                                                    <td className="align-middle">
                                                        <a href={`/admin/news/${news._id}`} className="badge badge-sm bg-gradient-primary text-white font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
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
        </AdminLayout >
    );
}

export async function getServerSideProps(context: any) {
    await dbConnect();
    const newses = await News.find();
    return {
        props: {
            newses: JSON.parse(JSON.stringify(newses))
        },
    }
}

export default Newses
