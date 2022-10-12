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

const ProductDetails: NextPage = (props: any) => {

    const [hasMounted, setHasMounted] = useState(false);
    const [user, setUser] = useContext(AuthContext);
    const [rating, setRating] = useState('1');
    const router = useRouter();

    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    const addToWishList = () => {
        toast.promise(axios.patch(`/wishlist/${props.product.id}/add`, {}).then(({ data }) => {
            setUser(data.user)
        }), {
            pending: 'Loading ...',
            success: 'Wishlist updated successfully',
            error: 'Registerating failed'
        })
    }

    const addToCart = () => {
        toast.promise(axios.post(`/cart/add`, {
            product_id: props.product.id,
            quantity,
        }).then(({ data }) => {
            setUser(data.user);
            router.push('/cart');
        }), {
            pending: 'Loading ...',
            success: 'Product added to cart',
            error: 'Request failed'
        })
        return false;
    }

    const getReviews = () => {

    }

    const addReview = (e: any) => {
        e.preventDefault();
        const payload = Object.fromEntries(new FormData(e.target));
        payload['product'] = props.product.id;
        console.log(payload);


        toast.promise(axios.post('/review/add', payload).then(({ data }) => {
            location.reload();
        }), {
            pending: 'Adding review...',
            success: 'Review added',
            error: 'Loggin In failed'
        })
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
                                <p>know more about the product</p>
                                <h1>Product details</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end breadcrumb section */}
            {/* single product */}
            <div className="single-product mt-150 mb-150">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="single-product-img">
                                <img src={props.product.imagePath as any} alt="" />
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="single-product-content">
                                <h3>{props.product.name}</h3>
                                <p className="single-product-pricing">
                                    ${props.product.price}
                                </p>
                                <p>
                                    {props.product.description}
                                </p>
                                <div className="single-product-form">
                                    <div className="qty my-3">
                                        <button className="btn btn-warning btn-minus" onClick={() => setQuantity(quantity - 1)}><i className="fa fa-minus"></i></button>
                                        <input type="text" style={{ textAlign: 'center' }} value={quantity} />
                                        <button className="btn btn-warning btn-plus" onClick={() => setQuantity(quantity + 1)}><i className="fa fa-plus"></i></button>
                                    </div>
                                    <a onClick={addToCart} className="cart-btn">
                                        <i className="fas fa-shopping-cart" /> Add to Cart
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end single product */}

            <div className="more-products mb-150">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="section-title">
                                <h3>
                                    <span className="orange-text">Reviews</span> of {props.product.name}
                                </h3>
                                <p>
                                    For Better Understand your Customers & Improve Customer Service.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div >
                        <form onSubmit={addReview} className="single-product-item p-4">
                            <h3>Add a review</h3>
                            <div className="col-md-12">
                                <label>Review</label>
                                <textarea className="form-control" rows={4} name='text' placeholder="Enter your feedback" ></textarea>
                            </div>
                            <div className="col-md-2">
                                <div className="col-md-12">
                                    <label>Rating <b>{rating}</b></label>
                                    <input className="form-control" type="range" name='rating' placeholder="Rating" value={rating} onChange={e => setRating(e.target.value)} min={1} max={5} />
                                </div>
                            </div>
                            <button className="btn btn-warning ml-3 mt-3" type='submit'>Submit</button>
                        </form>

                        {props.reviews.map((review: any) => (
                            <div key={review.id} className="single-product-item p-4">
                                <h3>{review.user.firstname} ({review.rating})</h3>
                                <p>
                                    {review.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export async function getServerSideProps(context: any) {
    await dbConnect();
    const product = await Product.findById(context.params.id);
    const reviews = await Review.find({ product: context.params.id });
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
            reviews: JSON.parse(JSON.stringify(reviews)),
        },
    }
}


export default ProductDetails
