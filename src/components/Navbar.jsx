import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = async (value) => {
    setInput(value);
    if (value.length >= 1) {
      setShowSearchResults(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/product/search?keyword=${value}`
        );
        setSearchResults(response.data);
        setNoResults(response.data.length === 0);
      } catch (error) {
        console.error("Error searching:", error);
      }
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
      setNoResults(false);
    }
  };

  const categories = ["hatchback", "sedan", "suvs", "coupe"];

  return (
    <header>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container-fluid">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link brand-name" to="/">
                  GadiDekho
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/new_cars">
                  Upcoming Cars
                </Link>
              </li>

              <li
                className="nav-item dropdown"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}>
                <a className="nav-link dropdown-toggle" href="/">
                  Categories
                </a>
                <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                  {categories.map((category) => (
                    <li key={category}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${category}`}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>

          <div className="search-container">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              value={input}
              onChange={(e) => handleChange(e.target.value)}
            />
            {showSearchResults && (
              <ul className="list-group">
                {searchResults.length > 0
                  ? searchResults.map((result) => (
                      <li key={result.id} className="list-group-item">
                        <Link
                          to={`/product/${result.id}`}
                          className="search-result-link">
                          {result.name}
                        </Link>
                      </li>
                    ))
                  : noResults && (
                      <p className="no-results-message">No Product Found</p>
                    )}
              </ul>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
