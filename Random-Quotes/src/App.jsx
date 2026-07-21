import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getQuotes = async () => {
    try {
      setLoading(true);
      setError("");

      const url = "https://dummyjson.com/quotes/random";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch quote.");
      }

      const result = await response.json();

      setData(result);
      console.log(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuotes();
  }, []);

  return (
    <div className="container">
      <div className="Quotes">
        <h1>💬 Random Quote Generator</h1>

        {loading && <h2>Loading...</h2>}

        {error && <p className="error">{error}</p>}

        {!loading && !error && data && (
          <>
            <h2>"{data.quote}"</h2>
            <p>— {data.author}</p>
          </>
        )}

        <button onClick={getQuotes}>New Quote</button>
      </div>
    </div>
  );
}