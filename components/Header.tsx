import person from "./images/person3.png";
import { useState, useEffect, Component, useContext } from "react";
import Image from "next/image";
import Head from 'next/head'
import { AuthContext } from "../context/authContext";
import Link from "next/link";
import { useRouter } from "next/router";


export const Header = () => {

  const router = useRouter();

  const [user, setUser] = useContext(AuthContext);


  const logout = () => {
    setUser(null);
    router.push('/login');
  }

  return (
    <>
      <Head>

        <link rel="shortcut icon" type="image/png" href="assets/img/favicon.png" />
        {/* google font */}
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Poppins:400,700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/assets/css/all.min.css" />
        <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/owl.carousel.css" />
        <link rel="stylesheet" href="/assets/css/magnific-popup.css" />
        <link rel="stylesheet" href="/assets/css/animate.css" />
        <link rel="stylesheet" href="/assets/css/meanmenu.min.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
        <link rel="stylesheet" href="/assets/css/responsive.css" />
      </Head>


      {/* header */}
      <div className="top-header-area" id="sticker">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-sm-12 text-center">
              <div className="main-menu-wrap">
                {/* logo */}
                <div className="site-logo">
                  <Link href="/">
                    <a>
                      <img src="assets/img/logo.png" alt="" />
                    </a>
                  </Link>
                </div>
                {/* logo */}
                {/* menu start */}
                <nav className="main-menu">
                  <ul>
                    <li>
                      <Link href="/">
                        <a><i className="fas fa-home" /> Home</a>
                      </Link>
                    </li>
                    {
                      user && <>
                        <li>
                          <Link href="/cart">
                            <a className="shopping-cart">
                              <i className="fas fa-shopping-cart" /> Cart
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/wishlist">
                            <a className="mobile-hide search-bar-icon">
                              <i className="fas fa-heart" /> Wishlist
                            </a>
                          </Link>
                        </li>
                      </>
                    }

                    <li>
                      <div className="header-icons d-flex">
                        {
                          user ? <>
                            <a className="nav-item nav-link">{user?.firstname || 'User Account'}</a>
                            <button onClick={logout} className="nav-item nav-link text-danger">Logout</button>
                          </> : <>
                            <Link href="/login" >
                              <a className="nav-item nav-link">Login</a>
                            </Link>
                            <Link href="/login" >
                              <a className="nav-item nav-link">Register</a>
                            </Link>
                          </>
                        }
                      </div>
                    </li>
                  </ul>
                </nav>
                <a className="mobile-show search-bar-icon" href="#">
                  <i className="fas  fa-heart" />
                </a>
                <div className="mobile-menu" />
                {/* menu end */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end header */}
      {/* search area */}
      <div className="search-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <span className="close-btn">
                <i className="fas fa-window-close" />
              </span>
              <div className="search-bar">
                <div className="search-bar-tablecell">
                  <h3>Search For:</h3>
                  <input type="text" placeholder="Keywords" />
                  <button type="submit">
                    Search <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end search area */}
    </>
  )
}

