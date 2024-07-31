import React from "react";
import "./Hero.css";
import { FaWhatsapp, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
function Hero() {
  return (
    <div className="hero-section  pb-8 ">
      <div className="section-image">
        <img
          className=""
          src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="sideimage"
        />
      </div>

      <div className="hero-text">
        <span className="border-2 border-black rounded-3xl px-6 py-2 text-left">
          Hello, I'm Shamim &#128079;
        </span>
        <h1 className="">
          Software Developer,<br /> SEO Analyst, and Founder
        </h1>
        <p>Wellcome to my blog! explore digital marketing, entrepreneurship and design insights. <br />
          Join me on this journey of knowledge, inspiration and growth, Lets learn and grow together!</p>
        <div className="mt-8 space-x-2">
          <button className="btn btn-sm bg-base-100 hover:bg-green-500 hover:text-white rounded-2xl "><FaWhatsapp /></button>
          <button className="btn btn-sm bg-base-100 hover:bg-blue-500 hover:text-white rounded-2xl "><FaFacebook /></button>
          <button className="btn btn-sm bg-base-100 hover:bg-red-500 hover:text-white rounded-2xl "><FaInstagram /></button>
          <button className="btn btn-sm bg-base-500 hover:bg-black hover:text-white rounded-2xl "><FaTwitter /></button>

        </div>
      </div>

    </div>
  );
}

export default Hero;