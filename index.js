require('dotenv').config();
require('express-async-errors');

const express = require('express');
const server = express();

const fileUpload = require('express-fileupload');
// using cloudinary v2
const cloudinary = require('cloudinary').v2

// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.cloudinary_ApiKey,
    api_secret: process.env.api_secret
})

// db connection
const dbConnect = require('./db/connectDB');

// product router
const productRouter = require('./routes/productRoutes');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// static file hoisting
server.use(express.static('./public'));

// middleware setup for fileupload & json
server.use(express.json());
server.use(fileUpload({ useTempFiles:true }));

// home route setup
server.get('/', (req,res) => {
    res.send('<h2>File Upload App</h2>')
})

// route setup
server.use('/api/v1/products', productRouter);

// using error handler middleware
server.use(notFoundMiddleware);
server.use(errorHandlerMiddleware);

const portNo = process.env.PORT || 4141
const mongoURI = process.env.mongoUrl

const start = async () => {
    try {
        await dbConnect(mongoURI)
        .then(() => console.log('DB Connected'))
        server.listen(portNo, () => {
            console.log(`Server is listening on port ${portNo}...`);
        })
    } catch (error) {
        console.log(error);
    }
};

start();