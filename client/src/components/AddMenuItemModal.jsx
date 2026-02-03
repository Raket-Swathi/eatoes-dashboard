import { useState } from "react";
import "./AddMenuItemModal.css";

const AddMenuItemModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Main Course",
    price: "",
    ingredients: "",
    preparationTime: "",
    imageUrl: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // basic validation
    if (!formData.name || !formData.price) {
      alert("Name and price are required");
      return;
    }

    onSave({
      ...formData,
      ingredients: formData.ingredients.split(",").map(i => i.trim())
    });

    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h2>Add Menu Item</h2>

        <div className="form-grid">
          <input name="name" placeholder="Item Name" onChange={handleChange} />
          <input name="price" placeholder="Price" onChange={handleChange} />

          <select name="category" onChange={handleChange}>
            <option>Appetizer</option>
            <option>Main Course</option>
            <option>Dessert</option>
            <option>Beverage</option>
          </select>

          <input
            name="preparationTime"
            placeholder="Preparation Time (mins)"
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />

          <input
            name="ingredients"
            placeholder="Ingredients (comma separated)"
            onChange={handleChange}
          />

          <input
            name="imageUrl"
            placeholder="Image URL"
            onChange={handleChange}
          />
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMenuItemModal;