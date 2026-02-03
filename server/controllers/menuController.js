// server/controllers/menuController.js
import MenuItem from "../models/MenuItem.js";
import { validationResult } from "express-validator";

/* GET /api/menu – all with filters */
export const getMenu = async (req, res) => {
  try {
    const { category, availability, minPrice, maxPrice } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (availability !== undefined && availability !== "") {
      filter.isAvailable = availability === "true";
    }

    if (minPrice || maxPrice) {
      filter.price = {
        ...(minPrice && { $gte: Number(minPrice) }),
        ...(maxPrice && { $lte: Number(maxPrice) }),
      };
    }

    const items = await MenuItem.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch menu items" });
  }
};

/* GET /api/menu/search?q= */
export const searchMenu = async (req, res) => {
  try {
    const { q } = req.query;
    const trimmed = (q || "").trim();

    // Edge case: empty search -> return empty list (frontend already falls back to normal list)
    if (!trimmed) {
      return res.json([]);
    }

    // Escape special characters for regex (fallback if text index not effective)
    const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Try text search first; if no results, fallback to regex on name + ingredients
    let items = await MenuItem.find({
      $text: { $search: trimmed },
    }).sort({ score: { $meta: "textScore" } });

    if (!items.length) {
      items = await MenuItem.find({
        $or: [
          { name: { $regex: escaped, $options: "i" } },
          { ingredients: { $regex: escaped, $options: "i" } },
        ],
      });
    }

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
};

/* GET /api/menu/:id */
export const getMenuById = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Menu item not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
};

/* POST /api/menu */
export const createMenu = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const item = await MenuItem.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: "Menu item creation failed" });
  }
};

/* PUT /api/menu/:id */
export const updateMenu = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) return res.status(404).json({ message: "Menu item not found" });

    res.json(item);
  } catch (err) {
    res.status(400).json({ message: "Menu item update failed" });
  }
};

/* DELETE /api/menu/:id */
export const deleteMenu = async (req, res) => {
  try {
    const deleted = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed" });
  }
};

/* PATCH /api/menu/:id/availability */
export const toggleAvailability = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    item.isAvailable = !item.isAvailable;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: "Failed to toggle availability" });
  }
};
