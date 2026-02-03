// server/scripts/seed.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import MenuItem from "../models/MenuItem.js";
import Order from "../models/Order.js";

dotenv.config();

async function run() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    await MenuItem.deleteMany();
    await Order.deleteMany();
    console.log("🧹 Cleared existing data");

    const menu = await MenuItem.insertMany([
      // 1–4: your original items
      {
        name: "Classic Burger",
        description: "Juicy grilled beef burger with cheese",
        category: "Main Course",
        price: 150,
        ingredients: ["Bun", "Beef Patty", "Cheese", "Lettuce"],
        preparationTime: 15,
        imageUrl: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg",
      },
      {
        name: "Creamy Alfredo Pasta",
        description: "Pasta in rich white sauce",
        category: "Main Course",
        price: 220,
        ingredients: ["Pasta", "Cream", "Garlic"],
        preparationTime: 20,
        imageUrl: "https://www.spiceupthecurry.com/wp-content/uploads/2023/02/white-sauce-pasta-2.jpg",
      },
      {
        name: "Hot Brew Coffee",
        description: "Freshly brewed black coffee",
        category: "Beverage",
        price: 80,
        ingredients: ["Coffee beans", "Water"],
        preparationTime: 5,
        imageUrl: "https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg",
      },
      {
        name: "Vanilla Ice Cream",
        description: "Classic vanilla scoop",
        category: "Dessert",
        price: 120,
        ingredients: ["Milk", "Sugar", "Vanilla"],
        preparationTime: 2,
        imageUrl: "https://images.pexels.com/photos/461430/pexels-photo-461430.jpeg",
      },
      // 5–15: extra items
      {
        name: "French Fries",
        description: "Crispy golden fries",
        category: "Appetizer",
        price: 90,
        ingredients: ["Potato", "Salt", "Oil"],
        preparationTime: 10,
        imageUrl: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg",
      },
      {
        name: "Chicken Wings",
        description: "Spicy grilled chicken wings",
        category: "Appetizer",
        price: 180,
        ingredients: ["Chicken", "Spices"],
        preparationTime: 18,
        imageUrl: "https://images.pexels.com/photos/4109138/pexels-photo-4109138.jpeg",
      },
      {
        name: "Margherita Pizza",
        description: "Cheese pizza with tomato and basil",
        category: "Main Course",
        price: 260,
        ingredients: ["Dough", "Tomato", "Cheese", "Basil"],
        preparationTime: 25,
        imageUrl: "https://images.pexels.com/photos/4109080/pexels-photo-4109080.jpeg",
      },
      {
        name: "Grilled Sandwich",
        description: "Toasted sandwich with veggies and cheese",
        category: "Main Course",
        price: 140,
        ingredients: ["Bread", "Cheese", "Vegetables"],
        preparationTime: 12,
        imageUrl: "https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg",
      },
      {
        name: "Lemon Iced Tea",
        description: "Chilled lemon flavored iced tea",
        category: "Beverage",
        price: 70,
        ingredients: ["Tea", "Lemon", "Sugar"],
        preparationTime: 4,
        imageUrl: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg",
      },


      {
        name: "Tomato Soup",
        description: "Creamy tomato soup with croutons",
        category: "Appetizer",
        price: 95,
        ingredients: ["Tomato", "Cream", "Spices"],
        preparationTime: 12,
        imageUrl: "https://d3pc1xvrcw35tl.cloudfront.net/images/685x514/new-project-2025-01-21t111929.011_2025011379974.jpg",
      },
      {
        name: "Caesar Salad",
        description: "Fresh lettuce with dressing and croutons",
        category: "Appetizer",
        price: 150,
        ingredients: ["Lettuce", "Croutons", "Cheese"],
        preparationTime: 10,
        imageUrl: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      },





      {
        name: "Orange Juice",
        description: "Freshly squeezed orange juice",
        category: "Beverage",
        price: 100,
        ingredients: ["Orange"],
        preparationTime: 3,
        imageUrl: "https://st.depositphotos.com/1177973/1916/i/450/depositphotos_19164777-stock-photo-glass-of-orange-juice-with.jpg",
      },
      {
        name: "Chocolate Brownie",
        description: "Warm chocolate brownie with nuts",
        category: "Dessert",
        price: 130,
        ingredients: ["Chocolate", "Flour", "Sugar", "Nuts"],
        preparationTime: 15,
        imageUrl: "https://images.pexels.com/photos/4109998/pexels-photo-4109998.jpeg",
      },
      {
        name: "Gulab Jamun",
        description: "Soft fried dumplings in sugar syrup",
        category: "Dessert",
        price: 110,
        ingredients: ["Milk solids", "Flour", "Sugar syrup"],
        preparationTime: 10,
        imageUrl: "https://cdn.dotpe.in/longtail/store-items/1161396/YnhT6Gpo.webp",
      },
      
      {
        name: "Veg Biryani",
        description: "Aromatic basmati rice with mixed vegetables",
        category: "Main Course",
        price: 230,
        ingredients: ["Rice", "Vegetables", "Spices"],
        preparationTime: 30,
        imageUrl: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg",
      },
    ]);

    console.log("✅ Inserted menu items:", menu.length);

    const orders = [
      {
        orderNumber: "ORD-1001",
        items: [{ menuItem: menu[0]._id, quantity: 2, price: menu[0].price }],
        totalAmount: 2 * menu[0].price,
        customerName: "Anil",
        tableNumber: 3,
        status: "Pending",
      },
      {
        orderNumber: "ORD-1002",
        items: [{ menuItem: menu[1]._id, quantity: 1, price: menu[1].price }],
        totalAmount: 1 * menu[1].price,
        customerName: "Ravi",
        tableNumber: 5,
        status: "Preparing",
      },
      {
        orderNumber: "ORD-1003",
        items: [{ menuItem: menu[2]._id, quantity: 3, price: menu[2].price }],
        totalAmount: 3 * menu[2].price,
        customerName: "Sita",
        tableNumber: 2,
        status: "Ready",
      },
      {
        orderNumber: "ORD-1004",
        items: [{ menuItem: menu[3]._id, quantity: 1, price: menu[3].price }],
        totalAmount: 1 * menu[3].price,
        customerName: "Kiran",
        tableNumber: 1,
        status: "Delivered",
      },
      {
        orderNumber: "ORD-1005",
        items: [{ menuItem: menu[4]._id, quantity: 2, price: menu[4].price }],
        totalAmount: 2 * menu[4].price,
        customerName: "Meena",
        tableNumber: 4,
        status: "Cancelled",
      },
      {
        orderNumber: "ORD-1006",
        items: [{ menuItem: menu[5]._id, quantity: 1, price: menu[5].price }],
        totalAmount: 1 * menu[5].price,
        customerName: "Vijay",
        tableNumber: 6,
        status: "Pending",
      },
      {
        orderNumber: "ORD-1007",
        items: [{ menuItem: menu[6]._id, quantity: 2, price: menu[6].price }],
        totalAmount: 2 * menu[6].price,
        customerName: "Lakshmi",
        tableNumber: 7,
        status: "Preparing",
      },
      {
        orderNumber: "ORD-1008",
        items: [
          { menuItem: menu[7]._id, quantity: 1, price: menu[7].price },
          { menuItem: menu[9]._id, quantity: 2, price: menu[9].price },
        ],
        totalAmount: 1 * menu[7].price + 2 * menu[9].price,
        customerName: "Rahul",
        tableNumber: 8,
        status: "Ready",
      },
      {
        orderNumber: "ORD-1009",
        items: [
          { menuItem: menu[10]._id, quantity: 2, price: menu[10].price },
          { menuItem: menu[3]._id, quantity: 1, price: menu[3].price },
        ],
        totalAmount: 2 * menu[10].price + 1 * menu[3].price,
        customerName: "Priya",
        tableNumber: 9,
        status: "Delivered",
      },
      {
        orderNumber: "ORD-1010",
        items: [
          { menuItem: menu[12]._id, quantity: 1, price: menu[12].price },
          { menuItem: menu[14]._id, quantity: 1, price: menu[14].price },
        ],
        totalAmount: menu[12].price + menu[14].price,
        customerName: "Shyam",
        tableNumber: 10,
        status: "Cancelled",
      },
    ];

    await Order.insertMany(orders);
    console.log("✅ Inserted orders:", orders.length);

    console.log("🌱 Seed data inserted successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
}

run();
