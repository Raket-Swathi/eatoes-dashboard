// client/src/components/TopSellers.jsx
import { useEffect, useState } from "react";
import api from "../api";
import "./TopSellers.css";

export default function TopSellers() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTopSellers();
  }, []);

  async function fetchTopSellers() {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/analytics/top-items");
      setItems(res.data);
    } catch {
      setError("Failed to load top selling items");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="top-sellers-card">
      <div className="top-sellers-header">
        <h2>Top 5 Selling Items</h2>
        <button onClick={fetchTopSellers} className="refresh-btn">
          ↻
        </button>
      </div>

      {loading && <p className="top-sellers-status">Loading...</p>}
      {error && <p className="top-sellers-status error">{error}</p>}

      {!loading && !error && items.length === 0 && (
        <p className="top-sellers-status">No data yet.</p>
      )}

      <ul className="top-sellers-list">
        {items.map((item) => (
          <li key={item._id} className="top-seller-row">
            <div>
              <div className="top-seller-name">{item.name}</div>
              <div className="top-seller-category">{item.category}</div>
            </div>
            <div className="top-seller-qty">x {item.totalSold}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
