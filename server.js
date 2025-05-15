require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(express.json());
const UserRouter = require('./routes/User_router.js');
const PostRouter = require('./routes/ProductRoute.js');
const MongoURI = process.env.MongoURI;

mongoose.connect(MongoURI).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log(error);
});

app.get("/", (req, res) =>{
    res.send("Hello World");
})
app.use('/user', UserRouter);
app.use('/api', PostRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
