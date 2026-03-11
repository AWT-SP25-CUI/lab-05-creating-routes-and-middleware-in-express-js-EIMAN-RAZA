const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

// Logger Middleware
const logger = (req, res, next) => {
    const time = new Date().toISOString();
    const log = `${time} | ${req.method} | ${req.url}\n`;
    fs.appendFile("requests.log", log, (err)=>{
        if(err){
            console.log("Error writing log");
        }
    });
    console.log(log);
    next();
};

app.use(logger);

app.get("/", (req,res)=>{
    res.send("Middleware Logger Running");
});
app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});