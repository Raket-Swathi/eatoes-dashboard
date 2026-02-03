// client/src/components/OrderCard.jsx
import StatusBadge from "./StatusBadge";
import "./OrderCard.css";

export default function OrderCard({ order, onStatusChange }) {
  const handleChange = (e) => {
    onStatusChange(order._id, e.target.value);
  };

  const total = order.totalAmount;

  return (
    <div className="order-card">
      <div className="order-header">
        <div>
          <h3>Order #{order.orderNumber}</h3>
          <p>
            <b>Customer:</b> {order.customerName} &nbsp;|&nbsp;
            <b>Table:</b> {order.tableNumber}
          </p>
          <p>
            <b>Created:</b>{" "}
            {new Date(order.createdAt).toLocaleString()} &nbsp;|&nbsp;
            <b>Updated:</b>{" "}
            {new Date(order.updatedAt).toLocaleString()}
          </p>
        </div>

        <div className="order-status-block">
          <StatusBadge status={order.status} />
          <select
            className={`status-select ${order.status}`}
            value={order.status}
            onChange={handleChange}
          >
            <option>Pending</option>
            <option>Preparing</option>
            <option>Ready</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      <div className="order-items">
        {order.items.map((i, idx) => (
          <div key={idx} className="order-item">
            <span>
              {i.menuItem ? i.menuItem.name : "Deleted Item"} × {i.quantity}
            </span>
            <span>₹{i.price * i.quantity}</span>
          </div>
        ))}
      </div>

      <div className="order-total">
        ₹{total}
      </div>
    </div>
  );
}
