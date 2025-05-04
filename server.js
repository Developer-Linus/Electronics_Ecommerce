// Responsible for launching the express server

import app from "./app.js";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
});
