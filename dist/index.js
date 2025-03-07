"use strict";
const express = require("express");
const app = express();
const port = 3005;
app.get("/", (req, res) => {
    debugger;
    res.send("Hello World!");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
