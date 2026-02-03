// server/controllers/analyticsController.js
import Order from "../models/Order.js";

export const topSellingItems = async (_req, res) => {
  try {
    const result = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.menuItem",
          totalSold: { $sum: "$items.quantity" },
        },
      },
      {
        $lookup: {
          from: "menuitems",
          localField: "_id",
          foreignField: "_id",
          as: "item",
        },
      },
      { $unwind: "$item" },
      {
        $project: {
          name: "$item.name",
          category: "$item.category",
          totalSold: 1,
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Aggregation failed" });
  }
};
