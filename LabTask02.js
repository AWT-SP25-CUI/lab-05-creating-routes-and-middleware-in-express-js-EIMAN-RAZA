const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let products = [
 { id:1, name:"Laptop", price:800 },
 { id:2, name:"Phone", price:500 },
 { id:3, name:"Shoes", price:100 }
];
// GET all products
app.get("/products", (req,res)=>{
    res.json(products);
});
// GET product by id
app.get("/products/:id", (req,res)=>{
    const id = req.params.id;
    const product = products.find(p => p.id == id);
    if(!product){
        return res.send("Product not found");
    }
    res.json(product);
});
// POST new product
app.post("/products", (req,res)=>{
    const newProduct = req.body;
    products.push(newProduct);
    res.send("Product added successfully");
});
app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});