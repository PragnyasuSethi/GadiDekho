import axios from "../axois";
import { useState, useEffect, createContext } from "react";

const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState("");

  const getApiData = async () => {
    try {
      const response = await axios.get("/product");
      setData(response.data);
    } catch (error) {
      setIsError(error.message);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <AppContext.Provider value={{ data, isError }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
