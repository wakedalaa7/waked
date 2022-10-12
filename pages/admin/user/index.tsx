import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';


const Users: NextPage = (props: any) => {
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
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Id</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">First name</th>
                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Last name</th>
                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Email</th>
                                                <th className="text-secondary opacity-7"></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {props.users.map((user: any) => (
                                                <tr>
                                                    <td>
                                                        <div className="d-flex px-2 py-1">
                                                            <div>
                                                                <img src="../assets/img/team-2.jpg" className="avatar avatar-sm me-3" alt="user1" />
                                                            </div>
                                                            <div className="d-flex flex-column justify-content-center">
                                                                <h6 className="mb-0 text-sm">{user._id}</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className="text-xs font-weight-bold mb-0">{user.firstname}</p>
                                                    </td>
                                                    <td className="align-middle text-center text-sm">
                                                        <p className="text-xs font-weight-bold mb-0">{user.lastname}</p>
                                                    </td>
                                                    <td className="align-middle text-center">
                                                        <p className="text-xs font-weight-bold mb-0">{user.email}</p>
                                                    </td>
                                                    <td className="align-middle">
                                                        <a href={`/admin/user/${user._id}`} className="badge badge-sm bg-gradient-primary text-white font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
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
        </AdminLayout>
    );
}

export async function getServerSideProps(context: any) {
    await dbConnect();
    const users = await User.find();
    return {
        props: {
            users: JSON.parse(JSON.stringify(users))
        },
    }
}

export default Users
