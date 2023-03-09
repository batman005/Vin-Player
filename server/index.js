import express from "express";
import "./utils/db.js";
import "dotenv/config";
import { getBucketList, addNewBucket, addNewCard, updateBucketName, getCardList, deleteCard, updateCard, saveHistory, getHistoryList } from './routes/index.js'

const app = express()
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,  Content-Type",
    )
    if (req.method === "OPTIONS") {
        res.header(
            "Access-Control-Allow-Methods",
            "POST, PUT, PATCH, GET, DELETE"
        )
        return res.status(200).json({})
    }
    next()
})



app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});


app.get("/getBucketList", getBucketList);
app.post("/addNewBucket", addNewBucket);
app.post("/updateBucketName", updateBucketName);


app.post("/addNewCard", addNewCard);
app.post("/getCardList", getCardList);
app.post("/deleteCard", deleteCard);
app.post("/updateCard", updateCard);

app.post("/saveHistory", saveHistory);
app.get("/getHistoryList", getHistoryList);


app.listen(PORT, () => {
    console.log(`We are running on port ${PORT}`);
});