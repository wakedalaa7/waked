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
import Cart from '../models/Cart';
import Link from 'next/link';

const Wishlist: NextPage = (props: any) => {
  const [hasMounted, setHasMounted] = useState(false);

  const [user, setUser] = useContext(AuthContext);
  useEffect(() => {
    setHasMounted(true);
    console.log(user);
  }, []);



  const updateCart = (itemId: any, quantity: any) => {
    toast.promise(axios.patch(`/cart/update`, { itemId, quantity }).then(({ data }) => {
      setUser(data.user)
    }), {
      pending: 'Loading ...',
      success: `Cart Updated`,
      error: 'Can not update wishlist'
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
                <h1>Cart</h1>
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
            <div className="col-lg-8 col-md-12">
              <div className="cart-table-wrap">
                <table className="cart-table">
                  <thead className="cart-table-head">
                    <tr className="table-head-row">
                      <th className="product-remove" />
                      <th className="product-image">Product Image</th>
                      <th className="product-name">Name</th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-total">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      user.cart.items.map((item: any) => (
                        <tr className="table-body-row">
                          <td className="product-remove">
                            <button className='btn btn-danger' onClick={() => updateCart(item.id, 0)}>
                              <i className="far fa-window-close" />
                            </button>
                          </td>
                          <td className="product-image">
                            <img src={item.product.imagePath as any} alt="" />
                          </td>
                          <td className="product-name">{item.product.name}</td>
                          <td className="product-price">${item.product.price}</td>
                          <td className="product-quantity">
                            <button className="btn btn-danger btn-minus" onClick={() => updateCart(item.id, item.quantity - 1)}><i className="fa fa-minus"></i></button>
                            <input type="text" value={item.quantity} style={{textAlign: 'center'}} />
                            <button className="btn btn-danger btn-plus" onClick={() => updateCart(item.id, item.quantity + 1)}><i className="fa fa-plus"></i></button>
                          </td>
                          <td className="product-total">${item.sub_total}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="total-section">
                <table className="total-table">
                  <thead className="total-table-head">
                    <tr className="table-total-row">
                      <th>Total</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="total-data">
                      <td>
                        <strong>Total: </strong>
                      </td>
                      <td>${user.cart.total}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="cart-buttons">
                  <Link href={'/checkout'}>
                    <a className="boxed-btn black">
                      Check Out
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end cart */}

      <Footer></Footer>
    </div>
  )
}

export default Wishlist
