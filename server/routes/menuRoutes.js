// server/routes/menuRoutes.js
import express from "express";
import {
  getMenu,
  searchMenu,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
  toggleAvailability,
} from "../controllers/menuController.js";
import { body } from "express-validator";

const router = express.Router();

const menuItemValidators = [
  body("name").notEmpty().withMessage("Name is required"),
  body("category")
    .isIn(["Appetizer", "Main Course", "Dessert", "Beverage"])
    .withMessage("Invalid category"),
  body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
];

router.get("/", getMenu);
router.get("/search", searchMenu);
router.get("/:id", getMenuById);
router.post("/", menuItemValidators, createMenu);
router.put("/:id", menuItemValidators, updateMenu);
router.delete("/:id", deleteMenu);
router.patch("/:id/availability", toggleAvailability);

export default router;
