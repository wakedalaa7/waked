import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'


import { Header } from "../components/Header";

import { useContext, useEffect, useState } from 'react';
import dbConnect from '../lib/dbConnect';
import Product from '../models/Product';
import { Footer } from '../components/Footer';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import axios from '../lib/axios';
import jwtDecode from 'jwt-decode';
import { AuthContext } from '../context/authContext';

const Index: NextPage = (props: any) => {

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }


  const router = useRouter();
  const [, setUser] = useContext(AuthContext);

  const register = (e: any) => {
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(e.target));
    console.log(payload);


    toast.promise(axios.post('/auth/register', payload).then(res => {
      console.log(res);
      // router.back();
    }), {
      pending: 'Registering ...',
      success: 'Registered successfully',
      error: 'Registerating failed'
    })
  }


  const login = (e: any) => {
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(e.target));
    console.log(payload);


    toast.promise(axios.post('/auth/login', payload).then(({ data }) => {
      (axios.defaults as any).headers["Authorization"] = "Bearer " + data.access_token;
      localStorage.setItem("access_token", data.access_token);
      setUser(data.user)
      router.push('/');
    }), {
      pending: 'Loggin In ...',
      success: 'Logged In successfully',
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
                <p>Latest &amp; Trendy</p>
                <h1>Login Or Register</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end breadcrumb section */}

      {/* check out section */}
      <div className="checkout-section mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 checkout-accordion-wrap">
              <div className="accordion" id="accordionExample">
                <div className="card single-accordion">
                  <div className="card-header" id="headingOne">
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link"
                      >
                        Login
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
                        <form  onSubmit={login}>
                          <p>
                            <input type="email" name="email"  placeholder="E-mail" />
                          </p>
                          <p>
                            <input type="password" placeholder="Password" name="password"/>
                          </p>
                          <button className="btn btn-warning mt-3" type="submit">Login</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 checkout-accordion-wrap">
              <div className="accordion" >
                <div className="card single-accordion">
                  <div className="card-header" >
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link"
                      >
                        Register
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
                        <form onSubmit={register}>
                          <p>
                            <input type="text" name="firstname" placeholder="First Name" />
                          </p>
                          <p>
                            <input type="text" name="lastname" placeholder="Last Name" />
                          </p>
                          <p>
                            <input type="email" name="email" placeholder="E-mail" />
                          </p>
                          <p>
                            <input type="tel" name="mobile"  placeholder="Mobile No" />
                          </p>
                          <p>
                            <input type="password" name="password"  placeholder="password" />
                          </p>
                          <button className="btn btn-warning mt-3" type="submit">Register</button>
                        </form>
                      </div>
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
    </div>
  )
}

export async function getServerSideProps(context: any) {
  await dbConnect();
  const products = await Product.find();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    },
  }
}


export default Index
