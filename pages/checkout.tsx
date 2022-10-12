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
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from 'next/router';

const Wishlist: NextPage = (props: any) => {
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();

  const [user, setUser] = useContext(AuthContext);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }




  const saveAddress = (e: any) => {
    e.preventDefault();
    const address = Object.fromEntries(new FormData(e.target));
    const payload = {
      cart_id: user.cart.id,
      address
    }
    localStorage.setItem('checkout', JSON.stringify(payload));
    location.replace('/pay');
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
                <h1>Check Out Product</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end breadcrumb section */}

      {/* check out section */}
      <div className="checkout-section mt-150 mb-150">
        <div className="container">
          <div className="checkout-accordion-wrap">
            <div className="accordion" id="accordionExample">
              <div className="card single-accordion">
                <div className="card-header" id="headingOne">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link"
                    >
                      Billing Address
                    </button>
                  </h5>
                </div>
                <div
                  id="collapseOne"
                  className="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordionExample"
                >
                  <div className="card-body">
                    <div className="billing-address-form">
                      <form onSubmit={saveAddress}>
                        <p>
                          <input type="text" name="firstname" defaultValue={user.firstname} placeholder="First Name" />
                        </p>
                        <p>
                          <input type="text" name="lastname" defaultValue={user.lastname} placeholder="Last Name" />
                        </p>
                        <p>
                          <input type="email" name="email" defaultValue={user.email} placeholder="E-mail" />
                        </p>
                        <p>
                          <input type="text" placeholder="Address" />
                        </p>
                        <p>
                          <input type="tel" name="phone" defaultValue={user.phone} placeholder="Mobile No" />
                        </p>
                        <p>
                          <input type="text" name="address" placeholder="Address" />
                        </p>
                        <p>
                          <select className="custom-select" name="country">
                            <option selected>United States</option>
                            
                            <option>Israel</option>
                          </select>
                        </p>
                        <p>
                          <input  name="city" type="text" placeholder="City" />
                        </p>
                        <p>
                          <input  name="state" type="text" placeholder="State" />
                        </p>
                        <p>
                          <input  name="zip" type="text" placeholder="ZIP Code" />
                        </p>
                        <button className="btn btn-warning mt-3" type="submit">Save address</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end check out section */}

      <Footer></Footer>




    </div >
  )
}

export default Wishlist
