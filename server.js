const loadEnv = require('./config/env');
const express = require('express');
const connectDB = require('./db/mongodb');
const userRouter = require('./routers/userRoutes.js');
const orderRoutes = require('./routers/orderRoutes');

loadEnv();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
connectDB();
app.use('/users', userRouter);
app.use('/orders', orderRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
