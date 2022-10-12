import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'


import { Header } from "../components/Header";

import { useEffect, useState } from 'react';
import dbConnect from '../lib/dbConnect';
import Product from '../models/Product';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import News from '../models/News';
import Link from 'next/link';

const Index: NextPage = (props: any) => {

  const [hasMounted, setHasMounted] = useState(false);

  const [saleRemaining, setSaleRemaining] = useState({} as any);

  useEffect(() => {

    const countDownDate = new Date("Dec 25, 2022 00:00:00").getTime();

    setInterval(function () {

      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds


      setSaleRemaining({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);


    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (

    <div>

      <Header></Header>



      {/* hero area */}
      <div className="hero-area hero-bg" style={{ height: '100vh' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-9 offset-lg-2 text-center">
              <div className="hero-text">
                <div className="hero-text-tablecell">
                  <p className="subtitle">Latest &amp; Trendy</p>
                  <h1>Let explore a new world.</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end hero area */}
      {/* features list section */}
      <div className="list-section pt-80 pb-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <div className="list-box d-flex align-items-center">
                <div className="list-icon">
                  <i className="fas fa-shipping-fast" />
                </div>
                <div className="content">
                  <h3>Free Shipping</h3>
                  <p>When order over $75</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <div className="list-box d-flex align-items-center">
                <div className="list-icon">
                  <i className="fas fa-phone-volume" />
                </div>
                <div className="content">
                  <h3>24/7 Support</h3>
                  <p>Get support all day</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="list-box d-flex justify-content-start align-items-center">
                <div className="list-icon">
                  <i className="fas fa-sync" />
                </div>
                <div className="content">
                  <h3>Refund</h3>
                  <p>Get refund within 3 days!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end features list section */}
      {/* product section */}
      <div className="product-section mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="section-title">
                <h3>
                  <span className="orange-text">Our</span> Products
                </h3>
                <p>
                  Hand picked smartphones for you
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            {props.products.map((product: any) => (
              <ProductCard product={product} />
            ))}
          </div>
        </div>
      </div>
      {/* end product section */}
      {/* cart banner section */}
      <section className="cart-banner pt-100 pb-100">
        <div className="container">
          <div className="row clearfix">
            {/*Image Column*/}
            <div className="image-column col-lg-6">
              <div className="image">
                <div className="price-box">
                  <div className="inner-price">
                    <span className="price">
                      <strong>30%</strong> <br /> off per kg
                    </span>
                  </div>
                </div>
                <img src="/assets/img/a.jpg" alt="" />
              </div>
            </div>
            {/*Content Column*/}
            <div className="content-column col-lg-6">
              <h3>
                <span className="orange-text">Christmas</span> Sale is about to begin
              </h3>
              <h4>From 25th December</h4>
              <div className="text">
                Christmas Sale 2022 offers you huge discounts on top brands. It is high time to purchase all your favourite products that are there in your wishlist. If you are planning to buy electronic gadgets or devices like laptops, mobiles, smartwatches, and others, wait no longer and purchase
              </div>
              {/*Countdown Timer*/}
              <div className="time-counter">
                <div className="time-countdown clearfix" data-countdown="2020/2/01">
                  <div className="counter-column">
                    <div className="inner">
                      <span className="count">{saleRemaining.days}</span>Days
                    </div>
                  </div>
                  <div className="counter-column">
                    <div className="inner">
                      <span className="count">{saleRemaining.hours}</span>Hours
                    </div>
                  </div>
                  <div className="counter-column">
                    <div className="inner">
                      <span className="count">{saleRemaining.minutes}</span>Mins
                    </div>
                  </div>
                  <div className="counter-column">
                    <div className="inner">
                      <span className="count">{saleRemaining.seconds}</span>Secs
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end cart banner section */}
      {/* advertisement section */}
      <div className="abt-section mb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <iframe width="660" height="400" className='p-4 mt-5' src="https://www.youtube.com/embed/FT3ODSg1GFE" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="abt-text">
                <p className="top-sub">launched on 7th September 2022</p>
                <h2>
                  New <span className="orange-text">iPhone 14</span>
                </h2>
                <p>
                  The phone comes with a 120 Hz refresh rate 6.06-inch touchscreen display offering a resolution of 1170x2532 pixels at a pixel density of 460 pixels per inch (ppi). iPhone 14 is powered by a hexa-core Apple A15 Bionic processor. The iPhone 14 supports wireless charging, as well as proprietary fast charging.
                </p>
                <p>As far as the cameras are concerned, the iPhone 14 on the rear packs a 12-megapixel (f/1.5) primary camera, and a 12-megapixel (f/2.4) camera. It has a single front camera setup for selfies, featuring a 12-megapixel sensor with an f/1.9 aperture.</p>
                <p>iPhone 14 is based on iOS 16 and packs 128GB, 256GB, 512GB of inbuilt storage. The iPhone 14 measures 146.70 x 71.50 x 7.80mm (height x width x thickness) and weighs 172.00 grams. It was launched in Midnight, Purple, Starlight, (PRODUCT)RED, and Blue colours. It features an IP68 rating for dust and water protection.</p>
                <p>Connectivity options on the iPhone 14 include Wi-Fi 802.11 ax, GPS, Bluetooth v5.30, and Lightning. Sensors on the phone include accelerometer, ambient light sensor, barometer, gyroscope, and proximity sensor.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end advertisement section */}
      {/* latest news */}
      <div className="latest-news pt-150 pb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="section-title">
                <h3>
                  <span className="orange-text">Our</span> News
                </h3>
                <p>
                  The news is important because it informs our view of the world,
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            {props.newses.map((news: any) => (
              <Link href={`/news/${news.id}`}>

                <div className="col-lg-4 col-md-6">
                  <div className="single-latest-news">
                    <a href="single-news.html">
                      <img src={news.imagePath} alt="" />
                    </a>
                    <div className="news-text-box">
                      <h3>
                        <a href="single-news.html">
                          {news.title}
                        </a>
                      </h3>
                      <p className="blog-meta">
                        <span className="author">
                          <i className="fas fa-user" /> Admin
                        </span>
                        <span className="date">
                          <i className="fas fa-calendar" /> { news.createdAt }
                        </span>
                      </p>
                      <p className="excerpt">
                        {news.description?.substring(0, 100)}
                      </p>
                      <a href="single-news.html" className="read-more-btn">
                        read more <i className="fas fa-angle-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* end latest news */}




      {/* <div className="featured-product product">
        <div className="container-fluid">
          <div className="section-header">
            <h1>Featured Product</h1>
          </div>
          <div className="row align-items-center product-slider product-slider-4">
            {props.products.map((product: any) => (
              <ProductCard product={product} />
            ))}
          </div>
        </div>
      </div> */}
      <Footer></Footer>
    </div >
  )
}

export async function getServerSideProps(context: any) {
  await dbConnect();
  const products = await Product.find();
  const newses = await News.find();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      newses: JSON.parse(JSON.stringify(newses))
    },
  }
}


export default Index
