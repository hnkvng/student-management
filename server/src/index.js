const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

//HTTP logger
app.use(morgan('dev'));

// Sử dụng bodyParser để đọc dữ liệu từ client
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(express.json({ limit: '30mb', extended: true }));
//cho phép client kết nối với server
app.use(cors());

//Router
const route = require('./resource/routes/index.js');
route(app);

//Connected mongodb
const mongoose = require('mongoose');
const CONNECTION_URL = 'mongodb://localhost:27017/NKIT';
const PORT = process.env.PORT || 4000;

mongoose
    .connect(CONNECTION_URL)
    .then(() =>
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`)),
    )
    .catch((error) => console.log(error.message));
