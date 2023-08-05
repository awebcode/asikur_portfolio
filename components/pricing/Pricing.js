import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import Tilt from "react-parallax-tilt";
const Pricing = () => {
  const [btn, setBtn] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setBtn(true);
    }
  }, [btn]);
  return (
    <>
      {btn ? (
        <div className="pricing">
          <Tilt>
            {" "}
            <motion.h1
              className="main-title"
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              // animate={{ x: 0, opacity: 1 }}
              transition={{
                delay: 0.1,
                opacity: { duration: 1 },
                y: { type: "spring", stiffness: 60 },
                duration: 0.9,
                ease: "easeInOut",
              }}
              whileHover={{ scaleX: 1.2 }}
            >
              <span>Best</span> Packages.
            </motion.h1>{" "}
          </Tilt>
          <div className="container">
            <Tilt>
              <div
                class="wrapper"
                whileHover={{ scale: 1.05, backgroundColor: "#111827" }}
              >
                <p className="name">I will be your Web Designer</p>
                <input type="radio" name="slider" id="tab-1" />
                <input type="radio" name="slider" id="tab-2" checked />
                <input type="radio" name="slider" id="tab-3" />
                <header>
                  <label htmlFor="tab-1" class="tab-1">
                    Basic
                  </label>
                  <label htmlFor="tab-2" class="tab-2 active">
                    Standard
                  </label>
                  <label htmlFor="tab-3" class="tab-3">
                    Premium
                  </label>
                  <div class="slider"></div>
                </header>
                <div class="card-area">
                  <div class="cards">
                    <div class="row row-1">
                      <div class="price-details">
                        <span class="price">49</span>
                        <p>For beginner use.</p>
                      </div>

                      <ul class="features">
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 100% customer
                            satisfaction.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Well formatted code.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 2 pages
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Design customization
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> High-Quality and Perfect
                            Design.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Simple, static web design
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Basic search engine
                            optimization (SEO)
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 2 days Delivery.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 24/7 availability
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div class="row">
                      <div class="price-details">
                        <span class="price">159</span>
                        <p>For professional use</p>
                      </div>
                      <ul class="features">
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 100% customer
                            satisfaction.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design and
                            development.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Well formatted code.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 5 pages
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Design customization
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> High-Quality and Perfect
                            Design.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design and
                            custom web hostion
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Simple, static web design
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Basic search engine
                            optimization (SEO)
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 5 days Delivery.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 24/7 availability
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div class="row">
                      <div class="price-details">
                        <span class="price">449</span>
                        <p>For team collaboration</p>
                      </div>
                      <ul class="features">
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 100% customer
                            satisfaction.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design and
                            fully-functional web development.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Well formatted code.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 10 pages
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Design customization
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> High-Quality and Perfect
                            Design.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design and
                            development
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i>Free custom web hosting
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Basic search engine
                            optimization (SEO)
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 10 days Delivery.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 24/7 availability
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <button>Choose plan</button>
              </div>
            </Tilt>
            {/* 2 */}
            <Tilt>
              <div
                class="wrapper"
                whileHover={{ scale: 1.05, backgroundColor: "#111827" }}
              >
                <p className="name">I will be your nextjs developer</p>
                <input type="radio" name="slider" id="tab-2-1" />
                <input type="radio" name="slider" id="tab-2-2" checked />
                <input type="radio" name="slider" id="tab-2-3" />
                <header>
                  <label htmlFor="tab-2-1" class="tab-1">
                    Basic
                  </label>
                  <label htmlFor="tab-2-2" class="tab-2 active">
                    Standard
                  </label>
                  <label htmlFor="tab-2-3" class="tab-3">
                    Premium
                  </label>
                  <div class="slider"></div>
                </header>
                <div class="card-area">
                  <div class="cards">
                    <div class="row row-2-1">
                      <div class="price-details">
                        <span class="price">49</span>
                        <p>For beginner use</p>
                      </div>
                      <ul class="features">
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 100% customer
                            satisfaction.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Well formatted code.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 2 pages
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Design customization
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> High-Quality and Perfect
                            Design.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Simple, static web design
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Basic search engine
                            optimization (SEO)
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 2 days Delivery.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 24/7 availability
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div class="row">
                      <div class="price-details">
                        <span class="price">159</span>
                        <p>For professional use</p>
                      </div>
                      <ul class="features">
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 100% customer
                            satisfaction.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design and
                            fully-functional web development.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Well formatted code.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 5 pages
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Design customization
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> High-Quality and Perfect
                            Design.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design and
                            development
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i>Free custom web hosting
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Basic search engine
                            optimization (SEO)
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 5 days Delivery.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 24/7 availability
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div class="row">
                      <div class="price-details">
                        <span class="price">449</span>
                        <p>For team collaboration</p>
                      </div>
                      <ul class="features">
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 100% customer
                            satisfaction.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design and
                            fully-functional web development.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Well formatted code.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 10 pages
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Design customization
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> High-Quality and Perfect
                            Design.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design and
                            development
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i>Free custom web hosting
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Basic search engine
                            optimization (SEO)
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 10 days Delivery.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 24/7 availability
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <button>Choose plan</button>
              </div>
            </Tilt>
            {/* 3 */}
            <Tilt>
              <div
                class="wrapper"
                whileHover={{ scale: 1.05, backgroundColor: "#111827" }}
              >
                <p className="name">I will be your mern developer.</p>
                <input type="radio" name="slider" id="tab-3-1" />
                <input type="radio" name="slider" id="tab-3-2" checked />
                <input type="radio" name="slider" id="tab-3-3" />
                <header>
                  <label htmlFor="tab-3-1" class="tab-1">
                    Basic
                  </label>
                  <label htmlFor="tab-3-2" class="tab-2 active">
                    Standard
                  </label>
                  <label htmlFor="tab-3-3" class="tab-3">
                    Premium
                  </label>
                  <div class="slider"></div>
                </header>
                <div class="card-area">
                  <div class="cards">
                    <div class="row row-3-1">
                      <div class="price-details">
                        <span class="price">49</span>
                        <p>For beginner use</p>
                      </div>
                      <ul class="features">
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 100% customer
                            satisfaction.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Well formatted code.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 2 pages
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Design customization
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> High-Quality and Perfect
                            Design.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Simple, static web design
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Basic search engine
                            optimization (SEO)
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 2 days Delivery.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 24/7 availability
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div class="row">
                      <div class="price-details">
                        <span class="price">169</span>
                        <p>For professional use</p>
                      </div>
                      <ul class="features">
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 100% customer
                            satisfaction.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Well formatted code.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 5 pages
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Design customization
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> High-Quality and Perfect
                            Design.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design and
                            development.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Simple, static web design
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Basic search engine
                            optimization (SEO)
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 5 days Delivery.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 24/7 availability
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div class="row">
                      <div class="price-details">
                        <span class="price">449</span>
                        <p>For team collaboration</p>
                      </div>
                      <ul class="features">
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 100% customer
                            satisfaction.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design and
                            fully-functional web development.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Well formatted code.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 10 pages
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Design customization
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> High-Quality and Perfect
                            Design.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design and
                            development
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i>Free custom web hosting
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Basic search engine
                            optimization (SEO)
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 10 days Delivery.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 24/7 availability
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <button>Choose plan</button>
              </div>
            </Tilt>
          </div>
        </div>
      ) : (
        <div className="pricing">
          <Tilt>
            {" "}
            <motion.h1
              className="main-title"
              whileHover={{ scaleX: 1.2 }}
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              // animate={{ x: 0, opacity: 1 }}
              transition={{
                delay: 0.2,
                opacity: { duration: 1 },
                y: { type: "spring", stiffness: 60 },
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              <span>Best</span> Packages.
            </motion.h1>{" "}
          </Tilt>
          <div className="container">
            <Tilt>
              <motion.div
                class="wrapper"
                whileHover={{ scale: 1.05, backgroundColor: "#111827" }}
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                // animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.2,
                  opacity: { duration: 1 },
                  x: { type: "spring", stiffness: 60 },
                  duration: 0.5,
                  ease: "easeIn",
                }}
              >
                <p className="name">I will be your Web Designer</p>
                <input type="radio" name="slider" id="tab-1" />
                <input type="radio" name="slider" id="tab-2" checked />
                <input type="radio" name="slider" id="tab-3" />
                <header>
                  <label htmlFor="tab-1" class="tab-1">
                    Basic
                  </label>
                  <label htmlFor="tab-2" class="tab-2 active">
                    Standard
                  </label>
                  <label htmlFor="tab-3" class="tab-3">
                    Premium
                  </label>
                  <div class="slider"></div>
                </header>
                <div class="card-area">
                  <div class="cards">
                    <div class="row row-1">
                      <div class="price-details">
                        <span class="price">49</span>
                        <p>For beginner use.</p>
                      </div>

                      <ul class="features">
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 100% customer
                            satisfaction.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Well formatted code.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 2 pages
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Design customization
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> High-Quality and Perfect
                            Design.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Simple, static web design
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Basic search engine
                            optimization (SEO)
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 2 days Delivery.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 24/7 availability
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div class="row">
                      <div class="price-details">
                        <span class="price">159</span>
                        <p>For professional use</p>
                      </div>
                      <ul class="features">
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 100% customer
                            satisfaction.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design and
                            development.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Well formatted code.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 5 pages
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Design customization
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> High-Quality and Perfect
                            Design.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design and
                            custom web hostion
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Simple, static web design
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Basic search engine
                            optimization (SEO)
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 5 days Delivery.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 24/7 availability
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div class="row">
                      <div class="price-details">
                        <span class="price">449</span>
                        <p>For team collaboration</p>
                      </div>
                      <ul class="features">
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 100% customer
                            satisfaction.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design and
                            fully-functional web development.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Well formatted code.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 10 pages
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Design customization
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> High-Quality and Perfect
                            Design.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design and
                            development
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i>Free custom web hosting
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Basic search engine
                            optimization (SEO)
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 10 days Delivery.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 24/7 availability
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <button>Choose plan</button>
              </motion.div>
            </Tilt>
            {/* 2 */}
            <Tilt>
              <motion.div
                class="wrapper"
                whileHover={{ scale: 1.05, backgroundColor: "#111827" }}
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                // animate={{ x: 0, opacity: 1 }}

                transition={{
                  delay: 0.2,
                  opacity: { duration: 1 },
                  y: { type: "spring", stiffness: 60 },
                  duration: 0.5,
                  ease: "backIn",
                }}
              >
                <p className="name">I will be your nextjs developer</p>
                <input type="radio" name="slider" id="tab-2-1" />
                <input type="radio" name="slider" id="tab-2-2" checked />
                <input type="radio" name="slider" id="tab-2-3" />
                <header>
                  <label htmlFor="tab-2-1" class="tab-1">
                    Basic
                  </label>
                  <label htmlFor="tab-2-2" class="tab-2 active">
                    Standard
                  </label>
                  <label htmlFor="tab-2-3" class="tab-3">
                    Premium
                  </label>
                  <div class="slider"></div>
                </header>
                <div class="card-area">
                  <div class="cards">
                    <div class="row row-2-1">
                      <div class="price-details">
                        <span class="price">49</span>
                        <p>For beginner use</p>
                      </div>
                      <ul class="features">
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 100% customer
                            satisfaction.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Well formatted code.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 2 pages
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Design customization
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> High-Quality and Perfect
                            Design.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Simple, static web design
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Basic search engine
                            optimization (SEO)
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 2 days Delivery.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 24/7 availability
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div class="row">
                      <div class="price-details">
                        <span class="price">159</span>
                        <p>For professional use</p>
                      </div>
                      <ul class="features">
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 100% customer
                            satisfaction.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design and
                            fully-functional web development.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Well formatted code.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 5 pages
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Design customization
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> High-Quality and Perfect
                            Design.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design and
                            development
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i>Free custom web hosting
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Basic search engine
                            optimization (SEO)
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 5 days Delivery.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 24/7 availability
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div class="row">
                      <div class="price-details">
                        <span class="price">449</span>
                        <p>For team collaboration</p>
                      </div>
                      <ul class="features">
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 100% customer
                            satisfaction.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design and
                            fully-functional web development.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Well formatted code.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 10 pages
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Design customization
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> High-Quality and Perfect
                            Design.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design and
                            development
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i>Free custom web hosting
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Basic search engine
                            optimization (SEO)
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 10 days Delivery.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 24/7 availability
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <button>Choose plan</button>
              </motion.div>
            </Tilt>
            {/* 3 */}
            <Tilt>
              <motion.div
                class="wrapper"
                whileHover={{ scale: 1.05, backgroundColor: "#111827" }}
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                // animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.1,
                  opacity: { duration: 1 },
                  x: { type: "spring", stiffness: 60 },
                  duration: 0.8,
                  ease: "easeIn",
                }}
              >
                <p className="name">I will be your mern developer.</p>
                <input type="radio" name="slider" id="tab-3-1" />
                <input type="radio" name="slider" id="tab-3-2" checked />
                <input type="radio" name="slider" id="tab-3-3" />
                <header>
                  <label htmlFor="tab-3-1" class="tab-1">
                    Basic
                  </label>
                  <label htmlFor="tab-3-2" class="tab-2 active">
                    Standard
                  </label>
                  <label htmlFor="tab-3-3" class="tab-3">
                    Premium
                  </label>
                  <div class="slider"></div>
                </header>
                <div class="card-area">
                  <div class="cards">
                    <div class="row row-3-1">
                      <div class="price-details">
                        <span class="price">49</span>
                        <p>For beginner use</p>
                      </div>
                      <ul class="features">
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 100% customer
                            satisfaction.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Well formatted code.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 2 pages
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Design customization
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> High-Quality and Perfect
                            Design.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Simple, static web design
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Basic search engine
                            optimization (SEO)
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 2 days Delivery.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 24/7 availability
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div class="row">
                      <div class="price-details">
                        <span class="price">169</span>
                        <p>For professional use</p>
                      </div>
                      <ul class="features">
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 100% customer
                            satisfaction.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Well formatted code.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 5 pages
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Design customization
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> High-Quality and Perfect
                            Design.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design and
                            development.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Simple, static web design
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Basic search engine
                            optimization (SEO)
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 5 days Delivery.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 24/7 availability
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div class="row">
                      <div class="price-details">
                        <span class="price">449</span>
                        <p>For team collaboration</p>
                      </div>
                      <ul class="features">
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 100% customer
                            satisfaction.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design and
                            fully-functional web development.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Well formatted code.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 10 pages
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Design customization
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> High-Quality and Perfect
                            Design.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Responsive design and
                            development
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i>Free custom web hosting
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> Basic search engine
                            optimization (SEO)
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 10 days Delivery.
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i class="fa fa-check-square-o"></i> 24/7 availability
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <button>Choose plan</button>
              </motion.div>
            </Tilt>
          </div>
        </div>
      )}
    </>
  );
}

export default Pricing