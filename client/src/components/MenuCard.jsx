// client/src/components/MenuCard.jsx
import "./MenuCard.css";

export default function MenuCard({ item, onToggle, onDelete }) {
  return (
    <div className={`menu-card ${!item.isAvailable ? "disabled" : ""}`}>
      {item.imageUrl && (
        <img src={item.imageUrl} alt={item.name} />
      )}

      <div className="menu-info">
        <h3>{item.name}</h3>
        <p className="category">{item.category}</p>

        {item.description && (
          <p className="description">
            <span className="description-label">Description: </span>
            {item.description}
          </p>
        )}

        {item.ingredients?.length > 0 && (
          <p className="ingredients">
            <strong>Ingredients:</strong> {item.ingredients.join(", ")}
          </p>
        )}

        {item.preparationTime && (
          <p className="prep-time">
            ⏱ {item.preparationTime} mins
          </p>
        )}

        <p className="price">₹{item.price}</p>

        <div className="menu-actions">
          <button
            className={item.isAvailable ? "available" : "unavailable"}
            onClick={() => onToggle(item._id, item.isAvailable)}
          >
            {item.isAvailable ? "Available" : "Unavailable"}
          </button>

          <button
            className="delete-btn"
            onClick={() => onDelete(item._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
