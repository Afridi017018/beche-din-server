const express = require('express');
const app = express();
const cors =  require('cors');
const morgan = require('morgan');
const userRouter = require('./routers/userRouter');
const productRouter = require('./routers/productRouter')
const bidsRouter = require('./routers/bidsRouter')


app.use(morgan('dev'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/bids',bidsRouter);


module.exports = app;