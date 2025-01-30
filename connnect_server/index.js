const express = require('express');
const bodyParser = require('body-parser');
const dbConnect = require("./config/database");
const user = require("./Routes/user_routes");
const cors = require("cors");
const app = express();
const corsOption = {
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOption));
app.use(bodyParser.json());
dbConnect();
app.listen(3000, () => {
    console.log("server started successfully");
})
app.get('/', (req , res) => {
    res.send("Api is working");
});
//mounting the route
app.use('/api/v1', user);