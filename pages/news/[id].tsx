import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'


import { Header } from "../../components/Header";

import { useContext, useEffect, useState } from 'react';
import dbConnect from '../../lib/dbConnect';
import Product from '../../models/Product';
import { Footer } from '../../components/Footer';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/authContext';
import axios from '../../lib/axios';
import Review from '../../models/Review';
import { useRouter } from 'next/router';
import News from '../../models/News';

const NewsDetails: NextPage = (props: any) => {

    const [hasMounted, setHasMounted] = useState(false);
    const router = useRouter();

    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return (
        <div>

            <Header></Header>
            {/* breadcrumb-section */}
            <div className="breadcrumb-section breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <p>know more about the news</p>
                                <h1>News details</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end breadcrumb section */}
            <div className="mt-150 mb-150">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="single-article-section">
                                <div className="single-article-text">
                                    <img src={props.news.imagePath as any} alt="" />
                                    <p className="blog-meta">
                                        <span className="author">
                                            <i className="fas fa-user" /> Admin
                                        </span>
                                        <span className="date">
                                            <i className="fas fa-calendar" /> { props.news.createdAt }
                                        </span>
                                    </p>
                                    <h2>{ props.news.title }</h2>
                                    <p>{ props.news.description }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer></Footer>
        </div>
    )
}

export async function getServerSideProps(context: any) {
    await dbConnect();
    const news = await News.findById(context.params.id);
    console.log(news);
    return {
        props: {
            news: JSON.parse(JSON.stringify(news)),
        },
    }
}


export default NewsDetails
