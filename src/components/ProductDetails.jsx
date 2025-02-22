import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/Context";
import axios from "../axois";

const Product = () => {
  const { id } = useParams();
  const { data } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/product/${id}`);
        setProduct(response.data);

        if (response.data.imageUrl) {
          setImageUrl(response.data.imageName);
        } else {
          setImageUrl(
            `http://localhost:8080/uploads/${response.data.imageUrl}`
          );
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  console.log("URL Parameter ID:", id);

  if (!product) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Loading...
      </h2>
    );
  }

  return (
    <div className="containers">
      <img
        className="left-column-img"
        src={product.imageUrl}
        alt={product.name}
      />
      <div className="right-column">
        <div className="product-description">
          <h1>{product.name}</h1>
          <h5>{product.brand}</h5>
          <h6>{product.category}</h6>
          <p style={{ fontWeight: "900" }}>{product.description}</p>
        </div>

        <div className="product-price">
          <span>{product.price + "₹" + " (Road Price)"}</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
