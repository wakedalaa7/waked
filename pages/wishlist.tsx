import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'


import { Header } from "../components/Header";

import { useContext, useEffect, useState } from 'react';
import dbConnect from '../lib/dbConnect';
import Product from '../models/Product';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import withAuth from '../middlewares/withAuth';
import axios from '../lib/axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/authContext';

const Wishlist: NextPage = (props: any) => {
  const [hasMounted, setHasMounted] = useState(false);

  const [user, setUser] = useContext(AuthContext);
  useEffect(() => {
    setHasMounted(true);
    console.log(user);
  }, []);



  const removeFromWishList = (product: any) => {
    toast.promise(axios.patch(`/wishlist/${product.id}/remove`, {}).then(({ data }) => {
      setUser(data.user)
    }), {
      pending: 'Loading ...',
      success: `${product.name} removed successfully`,
      error: 'Can not update wishlist'
    })
  }


  const addToCart = (product: any) => {
    toast.promise(axios.post(`/cart/add`, {
      product_id: product.id,
      quantity: 1,
    }).then(({ data }) => {
      setUser(data.user)
    }), {
      pending: 'Loading ...',
      success: 'Product added to cart',
      error: 'Request failed'
    })
  }

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
                <p>Latest &amp; Trendy</p>
                <h1>Wishlist</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end breadcrumb section */}
      {/* cart */}
      <div className="cart-section mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="cart-table-wrap">
                <table className="cart-table">
                  <thead className="cart-table-head">
                    <tr className="table-head-row">
                      <th className="product-image">Product Image</th>
                      <th className="product-name">Name</th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">Add to Cart</th>
                      <th className="product-total">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      user.wishlist.map((product: any) => (
                        <tr className="table-body-row">
                          <td className="product-image">
                            <img src={product.imagePath as any} alt="" />
                          </td>
                          <td className="product-name">{product.name}</td>
                          <td className="product-price">${product.price}</td>
                          <td><button className="btn btn-warning" onClick={() => addToCart(product)}>Add to Cart</button></td>
                          <td><button onClick={() => removeFromWishList(product)} ><i className="fa fa-trash"></i></button></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end cart */}

      {/* <div className="wishlist-page">
        <div className="container-fluid">
          <div className="wishlist-page-inner">
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead className="thead-dark">
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Add to Cart</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody className="align-middle">
                      {
                        user.wishlist.map((product: any) => (
                          <tr>
                            <td>
                              <div className="img">
                                <a href="#"><img src={product.imagePath as any} alt="Image" /></a>
                                <p>{product.name}</p>
                              </div>
                            </td>
                            <td>${product.price}</td>
                            <td><button className="btn-cart" onClick={() => addToCart(product)}>Add to Cart</button></td>
                            <td><button onClick={() => removeFromWishList(product)} ><i className="fa fa-trash"></i></button></td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}


      <Footer></Footer>




    </div>
  )
}

export default Wishlist
