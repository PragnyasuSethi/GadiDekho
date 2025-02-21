// UpcomingCarsPage.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function UpcomingCarsPage() {
  const [cars, setCars] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/new_cars");
        setCars(response.data);
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
    <div className="content">
      <div className="grid">
        {cars.map((curProduct) => {
          const { id, brand, name, price, productAvailable } = curProduct;
          return (
            <div
              className="card mb-3"
              key={id}
              style={{
                width: "18rem",
                height: "12rem",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 3px",
                backgroundColor: productAvailable ? "#fff" : "#ccc",
              }}>
              <div className="card-body">
                <Link to={`/product/${id}`} style={{ textDecoration: "none" }}>
                  <h5 className="card-title mb-0">{name.toUpperCase()}</h5>
                  <div className="card-description">
                    <i className="card-brand">{"~ " + brand}</i>
                    <h5
                      className="card-text mb-0"
                      style={{ fontWeight: "600" }}>
                      {"$" + price}
                    </h5>
                  </div>
                  <div className="card-button-container">
                    <button className="btn btn-primary">Upcoming Cars</button>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UpcomingCarsPage;
