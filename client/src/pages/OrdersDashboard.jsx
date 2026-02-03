// client/src/pages/OrdersDashboard.jsx
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import OrderCard from "../components/OrderCard";
import api from "../api";
import "./OrdersDashboard.css";

export default function OrdersDashboard() {
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [url, setUrl] = useState("/orders?page=1");

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    if (status) params.append("status", status);
    setUrl(`/orders?${params.toString()}`);
  }, [status, page]);

  const { data, loading, error, refetch } = useFetch(
    `${api.defaults.baseURL}${url}`
  );

  const updateStatus = async (id, newStatus) => {
    try {
      await api.patch(`/orders/${id}/status`, { status: newStatus });
      refetch();
    } catch {
      alert("Failed to update order status");
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;
  if (!data || !data.orders) return <p>No orders found.</p>;

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>Orders Dashboard</h1>

        <div className="orders-filter-bar">
          <label>
            Status:{" "}
            <select
              value={status}
              onChange={(e) => {
                setPage(1);
                setStatus(e.target.value);
              }}
            >
              <option value="">All</option>
              <option>Pending</option>
              <option>Preparing</option>
              <option>Ready</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </label>
        </div>
      </div>

      <div className="orders-grid">
        {data.orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            onStatusChange={updateStatus}
          />
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>
          Page {data.currentPage} of {data.totalPages}
        </span>
        <button
          onClick={() =>
            setPage((p) =>
              data.totalPages ? Math.min(data.totalPages, p + 1) : p + 1
            )
          }
          disabled={data.totalPages && page >= data.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
