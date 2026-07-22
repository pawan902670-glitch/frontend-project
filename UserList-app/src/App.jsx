import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");


  const [loading, setLoading] = useState(false);


  const [error, setError] = useState("");

 
  const getUserData = async () => {
    try {
      setLoading(true);
      setError("");

      const url = "https://jsonplaceholder.typicode.com/users";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch users.");
      }

      const result = await response.json();

      setUsers(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Call API when component loads
  useEffect(() => {
    getUserData();
  }, []);

  // Filter Users
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>User Search App</h1>

      <input
        type="text"
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <h2>Loading...</h2>}

      {error && <p className="error">{error}</p>}

      <div className="users">
        {filteredUsers.map((user) => (
          <div className="card" key={user.id}>
            <h2>{user.name}</h2>

            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <p>
              <strong>Phone:</strong> {user.phone}
            </p>

            <p>
              <strong>Website:</strong> {user.website}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}