const express = require("express")
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")


// env config
dotenv.config();
// DB Settings
mongoose.set('strictQuery', true);
// mongodbURL
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Entered Warehouse Seccessfully!🔫")) 
.catch((err)=> {
    console.log(err);
});

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running bruh🔥")
})