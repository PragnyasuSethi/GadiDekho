import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // Import only the required module
import "swiper/css";
import "./Home.css"; // Import the CSS file

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(false);

  const imageUrls = [
    "https://stimg.cardekho.com/images/uploadimages/1738418813038/1686x548-(24).jpg",
    "https://stimg.cardekho.com/images/uploadimages/1738232035073/01_Kia-Syros_CD-MasterHead-Desktop_1686x548px.jpg",
    "https://stimg.cardekho.com/images/uploadimages/1738232348852/01_Skoda-Kylaq_CD-MasterHead-Desktop_1686x548px.jpg",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/product");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
      }
    };
    fetchData();
  }, []);

  if (isError) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Something Went Wrong...
      </h2>
    );
  }

  return (
    <div className="home-container">
      {/* Main Container */}
      <div className="main-content">
        {/* Find Your Right Car Form */}
        <div className="car-form-container">
          <h2>Find Your Right Car</h2>
          <div className="form-tabs">
            <button className="tab-button active">New Car</button>
            <button className="tab-button">Used Car</button>
          </div>
          <div className="form-options">
            <label>
              <input type="radio" name="searchType" defaultChecked /> By Budget
            </label>
            <label>
              <input type="radio" name="searchType" /> By Model
            </label>
          </div>
          <select className="dropdown">
            <option>Select Budget</option>
            <option>Under $10,000</option>
            <option>$10,000 - $20,000</option>
            <option>$20,000 - $30,000</option>
          </select>
          <select className="dropdown">
            <option>Select City</option>
            <option>New York</option>
            <option>Los Angeles</option>
            <option>Chicago</option>
          </select>
          <button className="search-button">Search</button>
          <a href="#advanced-search" className="advanced-search-link">
            Advanced Search
          </a>
        </div>

        <div className="image-slider-container">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            className="image-slider">
            {imageUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <img
                  src={url}
                  alt={`Slide ${index}`}
                  className="slider-image"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Product Cards */}
      <div className="content">
        <div className="grid">
          {products.map((curProduct) => {
            const { id, brand, name, price } = curProduct;
            return (
              <div
                className="card mb-3"
                key={id}
                style={{
                  width: "18rem",
                  height: "12rem",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 3px",
                }}>
                <div className="card-body">
                  <Link
                    to={`/product/${id}`}
                    style={{ textDecoration: "none" }}>
                    <h5 className="card-title mb-0">{name.toUpperCase()}</h5>
                    <div className="card-description">
                      <i className="card-brand">{"~ " + brand}</i>
                      <h5
                        className="card-text mb-0"
                        style={{ fontWeight: "600" }}>
                        {"₹" + price}
                      </h5>
                    </div>
                    <div className="card-button-container">
                      <button className="btn btn-primary">Get Details</button>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
