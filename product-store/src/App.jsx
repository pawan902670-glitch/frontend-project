import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getProductData = async () => {
    try {
      setLoading(true);
      setError("");

      const url = "https://dummyjson.com/products";
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const result = await response.json();

      setData(result.products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <div>
      <h1>Product Data</h1>

      {loading && <h2>Loading...</h2>}

      {error && <h2>{error}</h2>}

      <div className="container">
        {data.map((product) => (
          <div className="data" key={product.id}>
            <img src={product.thumbnail} alt={product.title} />

            <h2>{product.title}</h2>
            <p>Price: ${product.price}</p>
            <p>Rating: ⭐ {product.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}