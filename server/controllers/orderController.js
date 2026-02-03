// server/controllers/orderController.js
import Order from "../models/Order.js";

/* GET /api/orders */
export const getOrders = async (req, res) => {
  try {
    const { status } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const filter = status ? { status } : {};

    const orders = await Order.find(filter)
      .populate("items.menuItem")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Order.countDocuments(filter);

    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

/* GET /api/orders/:id */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.menuItem"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    res.status(400).json({ message: "Failed to fetch order" });
  }
};

/* POST /api/orders */
export const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: "Order creation failed" });
  }
};

/* PATCH /api/orders/:id/status */
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).populate("items.menuItem");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    res.status(400).json({ message: "Status update failed" });
  }
};
