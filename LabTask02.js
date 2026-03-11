const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json()); // parse JSON body

// Middleware Logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});
// In-Memory Product Data
let products = [
    { id: 1, name: "Laptop", price: 900, category: "electronics", inStock: true },
    { id: 2, name: "Headphones", price: 80, category: "electronics", inStock: true },
    { id: 3, name: "Shoes", price: 120, category: "fashion", inStock: false },
    { id: 4, name: "Book", price: 25, category: "education", inStock: true },
    { id: 5, name: "Smartphone", price: 700, category: "electronics", inStock: false }
];
// GET /products  (with filtering)
app.get("/products", (req, res) => {
    let filteredProducts = [...products];
    const { category, maxPrice, inStock } = req.query;
    if (category) {
        filteredProducts = filteredProducts.filter(
            p => p.category.toLowerCase() === category.toLowerCase()
        );
    }
    if (maxPrice) {
        filteredProducts = filteredProducts.filter(
            p => p.price <= Number(maxPrice)
        );
    }
    if (inStock !== undefined) {
        const stockValue = inStock === "true";
        filteredProducts = filteredProducts.filter(
            p => p.inStock === stockValue
        );
    }
    res.json({
        success: true,
        count: filteredProducts.length,
        data: filteredProducts
    });
});
// GET /products/:id
app.get("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }
    res.json({
        success: true,
        data: product
    });
});
// POST /products  (BONUS)
app.post("/products", (req, res) => {
    const { id, name, price, category, inStock } = req.body;
    // Validation
    if (
        id === undefined ||
        !name ||
        price === undefined ||
        !category ||
        inStock === undefined
    ) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields"
        });
    }
    if (
        typeof id !== "number" ||
        typeof name !== "string" ||
        typeof price !== "number" ||
        typeof category !== "string" ||
        typeof inStock !== "boolean"
    ) {
        return res.status(400).json({
            success: false,
            message: "Invalid data types"
        });
    }
    const newProduct = { id, name, price, category, inStock };
    products.push(newProduct);
    res.status(201).json({
        success: true,
        message: "Product added successfully",
        data: newProduct
    });
});
// Invalid Route Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});