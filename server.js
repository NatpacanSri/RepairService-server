const express = require("express");
const app = express();
const mongoose = require('mongoose')
const cors = require("cors");
const cookieparser = require("cookie-parser");
const PORT = 8080

const userRouter = require('./routers/users')
const itemRouter = require('./routers/items')
const reportRouter = require('./routers/reports')

app.use(cookieparser())
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:8080'], // Replace with your client-side URL
    credentials: true, // Enable credentials (cookies)
};
app.use(cors(corsOptions));
mongoose.Promise = global.Promise
const dbUrl = "mongodb+srv://johnny:test1234@cluster0.e9jvqih.mongodb.net/report_repair?retryWrites=true&w=majority"

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connect to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));


app.use('/user', userRouter)
app.use('/item',itemRouter)
app.use('/report',reportRouter)


app.get("/api/home", (req, res) => {
    res.json({ message: "hello" });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});