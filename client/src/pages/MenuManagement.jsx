// client/src/pages/MenuManagement.jsx

import TopSellers from "../components/TopSellers";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { useMenu } from "../context/MenuContext";
import MenuCard from "../components/MenuCard";
import AddMenuItemModal from "../components/AddMenuItemModal";
import api from "../api";
import "./MenuManagement.css";

export default function MenuManagement() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [availability, setAvailability] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const debouncedSearch = useDebounce(search, 300);
  const { menuItems, setMenuItems } = useMenu();

  // allowed characters: letters, numbers, spaces, comma, dot, dash
  const specialCharRegex = /[^a-zA-Z0-9 ,.-]/;

  // initial load
  useEffect(() => {
    fetchMenuItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchMenuItems() {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/menu");
      setMenuItems(res.data);
    } catch {
      setError("Failed to load menu items");
    } finally {
      setLoading(false);
    }
  }

  // search + filters
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, category, availability]);

  async function applyFilters() {
    try {
      setLoading(true);

      // reset error for each new attempt
      setError("");

      const trimmed = debouncedSearch.trim();

      // if search has invalid special characters, show message and DO NOT call API
      if (trimmed && specialCharRegex.test(trimmed)) {
        setError("Please enter a valid search (letters, numbers, spaces only).");
        setMenuItems([]); // optional: clear shown items, or keep existing if you prefer
        setLoading(false);
        return;
      }

      let url = "/menu";

      if (trimmed.length > 0) {
        url = `/menu/search?q=${encodeURIComponent(trimmed)}`;
      } else {
        const params = new URLSearchParams();
        if (category) params.append("category", category);
        if (availability) params.append("availability", availability);
        const query = params.toString();
        if (query) url = `/menu?${query}`;
      }

      const res = await api.get(url);
      setMenuItems(res.data);
    } catch {
      setError("Failed to apply filters");
    } finally {
      setLoading(false);
    }
  }

  // optimistic toggle availability
  async function toggleAvailability(id, current) {
    const backup = [...menuItems];

    setMenuItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, isAvailable: !current } : item
      )
    );

    try {
      await api.patch(`/menu/${id}/availability`);
    } catch {
      alert("Failed to update availability. Reverting changes.");
      setMenuItems(backup);
    }
  }

  // optimistic delete
  async function deleteMenuItem(id) {
    if (!window.confirm("Delete this item?")) return;

    const backup = [...menuItems];
    setMenuItems((prev) => prev.filter((item) => item._id !== id));

    try {
      await api.delete(`/menu/${id}`);
    } catch {
      alert("Delete failed. Reverting changes.");
      setMenuItems(backup);
    }
  }

  // add item
  async function handleAddMenuItem(item) {
    try {
      const res = await api.post("/menu", item);
      const saved = res.data;
      setMenuItems((prev) => [saved, ...prev]);
      setShowModal(false);
    } catch {
      alert("Failed to save item");
    }
  }

  return (
    <div className="menu-page">
      <div className="page-header">
        <h1>Menu Management</h1>
      </div>

      <div className="filter-bar">
        <input
          placeholder="Search by name or ingredients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Main Course">Main Course</option>
          <option value="Dessert">Dessert</option>
          <option value="Beverage">Beverage</option>
        </select>

        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value="">All</option>
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>

        <button className="add-item-btn" onClick={() => setShowModal(true)}>
          + Add Item
        </button>
      </div>

            {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="menu-content-row">
        <div className="menu-grid">
          {menuItems.map((item) => (
            <MenuCard
              key={item._id}
              item={item}
              onToggle={toggleAvailability}
              onDelete={deleteMenuItem}
            />
          ))}
        </div>

        <div className="menu-sidebar">
          <TopSellers />
        </div>
      </div>


      {showModal && (
        <AddMenuItemModal
          onClose={() => setShowModal(false)}
          onSave={handleAddMenuItem}
        />
      )}
    </div>
  );
}
