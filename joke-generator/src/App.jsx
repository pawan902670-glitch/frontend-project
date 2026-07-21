import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getUserData = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch joke.");
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>😂 Random Joke Generator</h1>

        {loading && <h2>Loading...</h2>}

        {error && <p className="error">{error}</p>}

        {!loading && !error && data && (
          <>
            <h2>{data.setup}</h2>
            <p>{data.punchline}</p>
          </>
        )}

        <button onClick={getUserData}>New Joke</button>
      </div>
    </div>
  );
}