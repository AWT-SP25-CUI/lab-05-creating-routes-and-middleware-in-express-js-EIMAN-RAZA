const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

// Logger Middleware
const loggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();   
    // current time
    const log = `[${timestamp}] [${req.method}] ${req.url}\n`;
    console.log(log);
    // append log into file
    fs.appendFile("server_logs.txt", log, (err) => {
        if (err) {
            console.error("Error writing log:", err);
        }
    });
    next();
};
// Authentication Middleware
const authMiddleware = (req, res, next) => {
    const isAuthenticated = true;
    if (isAuthenticated) {
        next();
    } 
    else {
        res.status(401).send("Unauthorized");
    }
};
// Use middlewares
app.use(loggerMiddleware);
app.use(authMiddleware);
// Routes
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.get("/about", (req, res) => {
    res.send("About Page");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});