const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();
require('./Model/db');
const userRoute = require('./router/userRoutes');
const admin=require('./router/adminRoute');
const PORT = process.env.PORT || 8000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/user', userRoute)
app.use('/admin',admin)

app.listen(PORT, () => console.log(`Server is Listening On port ${PORT}`))