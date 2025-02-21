import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Category.css";

const Category = () => {
  const { category } = useParams();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching category:", category);

    fetch(`http://localhost:8080/product/category/${category}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        if (Array.isArray(data)) {
          setCars(data);
        } else {
          console.error("Unexpected data format:", data);
          setCars([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div className="category-container">
      <h1 className="category-title">
        {category
          ? category.charAt(0).toUpperCase() + category.slice(1)
          : "Cars"}
      </h1>

      {loading && <p className="loading">Loading cars...</p>}
      {error && <p className="error">Error: {error}</p>}

      <ul className="car-list">
        {cars.length > 0
          ? cars.map((car) => (
              <li key={car.id} className="car-item">
                <img src={car.imageUrl} alt={car.name} className="car-image" />
                <p className="car-name">{car.name}</p>
                <p className="car-price">
                  {car.price ? `₹${car.price}` : "Price not available"}
                </p>
              </li>
            ))
          : !loading && !error && <p>No cars found in this category.</p>}
      </ul>
    </div>
  );
};

export default Category;
