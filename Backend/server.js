require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/database");
const cors = require("cors");


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

connectDB();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

