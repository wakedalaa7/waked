import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import dbConnect from '../../../lib/dbConnect';
import Team from '../../../models/Team';
import User from '../../../models/User';
import team from '../../api/team';


const UserDetails: NextPage = (props: any) => {


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
                                    <img src="https://source.unsplash.com/random/?user" alt="profile_image" className="w-100 border-radius-lg shadow-sm" />
                                </div>
                            </div>
                            <div className="col-auto my-auto">
                                <div className="h-100">
                                    <h5 className="mb-1">
                                        {props.user.firstname}
                                    </h5>
                                    <p className="mb-0 font-weight-bold text-sm">
                                        ID: {props.user._id}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 mt-4 container-fluid">
                    <div className="card mb-4">
                        <div className="card-header pb-0 p-3">
                            <h6 className="mb-1">User profile</h6>
                        </div>
                        <div className="card-body p-3">
                            <div className="d-flex flex-column">
                                <span className="mb-2 text-xs">Email: <span className="text-dark font-weight-bold ms-sm-2">{props.user.email}</span></span>
                                <span className="mb-2 text-xs">Phone: <span className="text-dark ms-sm-2 font-weight-bold">{props.user.phone}</span></span>
                                <span className="text-xs">About: <span className="text-dark ms-sm-2 font-weight-bold">{props.user.bio}</span></span>
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
    const user = await User.findById(context.query.id);
    return {
        props: {
            user: JSON.parse(JSON.stringify(user))
        },
    }
}

export default UserDetails
