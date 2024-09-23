const express = require('express');
const app = express();
require('dotenv').config();
require('./models/DB.js'); 
const taskRouter = require('./Routes/taskRouter.js');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 5000;


app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/task', taskRouter);

app.get('/', (req, res) => {
    res.send("Server Started");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
