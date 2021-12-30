const express = require('express');
const cors = require('cors');
const authRoutes = require('./Routes/Auth');
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.get('/', (req,res)=> {
res.send("Messaging App API is working fine, till now!");
});
app.use('/auth', authRoutes);

app.listen(PORT, ()=>{
    console.log("Messaging App is listening at Port", PORT);
})


