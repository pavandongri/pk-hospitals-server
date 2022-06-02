const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")


const port = process.env.PORT || 5000
const app = express();
app.use(cors());
app.use(express.json());

const DB = "mongodb+srv://dongri:dongri@cluster0.lpuga.mongodb.net/fruitsDB?retryWrites=true&w=majority"
mongoose.connect(DB).then(()=>{
    console.log("mongoose connection success...")
})
.catch((err)=>{
    console.log("mongoose connection failed...")
    console.log(err);
})
const fruitSchema = mongoose.Schema({
    userid: String,
    password: String,
    name : String,
    dob: String,
    ph: Number
})

const fruitCollection = new mongoose.model("Fruit",fruitSchema)

app.get("/", (req, res)=>{
    res.json("ok alright")
})
app.post("/auth", async (req, res) => {
    const {userid, password} = req.body;
    const details = await fruitCollection.findOne({userid :userid});
    if (password === details.password){
        console.log("authenticated");
        res.json({
            authenticated: true,
            name: details.name,
            dob : details.dob,
            ph : details.ph
        });
    }
    else {
        console.log("puck it")
        res.send({authenticated: false});
    }
    
});


app.listen(port, ()=>{
    console.log(`server started on port ${port}`);
})