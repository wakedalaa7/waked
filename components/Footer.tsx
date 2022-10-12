import person from "./images/person3.png";
import { useState, useEffect, Component } from "react";
import Image from "next/image";


export const Footer = () => {



    return (
        <>
            <div className="footer-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-box about-widget">
                                <h2 className="widget-title">About us</h2>
                                <p>
                                    We are market leaders in smartphones.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-box get-in-touch">
                                <h2 className="widget-title">Get in Touch</h2>
                                <ul>
                                    <li>israel ,nazareeth.</li>
                                    <li>wakedwaked0102@gmail.com</li>
                                    <li>+972549025088</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-box subscribe">
                                <h2 className="widget-title">Subscribe</h2>
                                <p>Subscribe to our mailing list to get the latest updates.</p>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script src="/assets/js/jquery-1.11.3.min.js"></script>
            <script src="/assets/bootstrap/js/bootstrap.min.js"></script>
            <script src="/assets/js/jquery.countdown.js"></script>
            <script src="/assets/js/jquery.isotope-3.0.6.min.js"></script>
            <script src="/assets/js/waypoints.js"></script>
            <script src="/assets/js/owl.carousel.min.js"></script>
            <script src="/assets/js/jquery.magnific-popup.min.js"></script>
            <script src="/assets/js/jquery.meanmenu.min.js"></script>
            <script src="/assets/js/sticker.js"></script>
            <script src="/assets/js/main.js"></script>
        </>
    )
}

